import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import resourceSeedsData from "../resourceseed.json";
import resourceTypeSeedsData from "../resourcetypeseed.json";
import sourceSeedsData from "../sourceseeds.json";

export const listResources = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("resources").collect();
  },
});

export const listResourcesByResourceType = query({
  args: { resourceTypeId: v.id("resourceTypes") },
  handler: async (ctx, { resourceTypeId }) => {
    return await ctx.db
      .query("resources")
      .withIndex("byResourceType", (q) =>
        q.eq("resourceTypeId", resourceTypeId),
      )
      .collect();
  },
});

export const getResourceTypeWithResourcesAndSources = query({
  args: {},
  handler: async (ctx) => {
    const resourceTypes = await ctx.db.query("resourceTypes").collect();

    const result = await Promise.all(
      resourceTypes.map(async (rt) => {
        const resources = await ctx.db
          .query("resources")
          .withIndex("byResourceType", (q) => q.eq("resourceTypeId", rt._id))
          .collect();

        // Fetch sources for each resource
        const resourcesWithSources = await Promise.all(
          resources.map(async (resource) => {
            const sources = resource.sourceIds
              ? await Promise.all(
                  resource.sourceIds.map((sourceId) => ctx.db.get(sourceId)),
                )
              : [];
            return {
              ...resource,
              sources: sources.filter(Boolean),
            };
          }),
        );

        return {
          ...rt,
          resources: resourcesWithSources,
        };
      }),
    );

    return result;
  },
});

export const createResource = mutation({
  args: {
    name: v.string(),
    resourceTypeId: v.id("resourceTypes"),
    sourceIds: v.optional(v.array(v.id("sources"))),
  },
  handler: async (ctx, { name, resourceTypeId, sourceIds }) => {
    return await ctx.db.insert("resources", {
      name,
      resourceTypeId,
      sourceIds: sourceIds || [],
    });
  },
});

export const updateResource = mutation({
  args: {
    id: v.id("resources"),
    name: v.string(),
    resourceTypeId: v.id("resourceTypes"),
    sourceIds: v.optional(v.array(v.id("sources"))),
  },
  handler: async (ctx, { id, name, resourceTypeId, sourceIds }) => {
    await ctx.db.patch(id, {
      name,
      resourceTypeId,
      sourceIds: sourceIds || [],
    });
    return id;
  },
});

export const deleteResource = mutation({
  args: { id: v.id("resources") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return id;
  },
});

export const clearAllResources = mutation({
  args: {},
  handler: async (ctx) => {
    const existingResources = await ctx.db.query("resources").collect();
    for (const resource of existingResources) {
      await ctx.db.delete(resource._id);
    }
    return {
      message: `Cleared ${existingResources.length} resources`,
      cleared: existingResources.length,
    };
  },
});

export const loadAllResources = mutation({
  args: {},
  handler: async (ctx) => {
    // Step 1: Clear existing resources and resourceTypes
    const existingResources = await ctx.db.query("resources").collect();
    for (const resource of existingResources) {
      await ctx.db.delete(resource._id);
    }

    const existingResourceTypes = await ctx.db.query("resourceTypes").collect();
    for (const rt of existingResourceTypes) {
      await ctx.db.delete(rt._id);
    }

    // Step 2: Build a map of sanityId -> convex source _id
    const allSources = await ctx.db.query("sources").collect();
    const sanityIdToSourceId = new Map();
    for (const source of allSources) {
      if (source.sanityId) {
        sanityIdToSourceId.set(source.sanityId, source._id);
      }
    }

    // Step 3: Create resourceTypes first and build sanityId -> convex resourceType _id map
    const sanityIdToResourceTypeId = new Map();
    for (const rt of resourceTypeSeedsData.result) {
      const resourceTypeId = await ctx.db.insert("resourceTypes", {
        name: rt.name,
        thumbnailUrl: rt.thumbnailUrl || undefined,
      });
      sanityIdToResourceTypeId.set(rt._id, resourceTypeId);
    }

    // Step 4: Build a map of resource sanityId -> resourceType sanityId
    const resourceSanityIdToResourceTypeSanityId = new Map();
    for (const rt of resourceTypeSeedsData.result) {
      if (rt.resources && Array.isArray(rt.resources)) {
        for (const resourceRef of rt.resources) {
          resourceSanityIdToResourceTypeSanityId.set(resourceRef._ref, rt._id);
        }
      }
    }

    let loadedCount = 0;
    let skippedCount = 0;

    // Step 5: Load all resources from seed file
    for (const resource of resourceSeedsData.result) {
      // Find the resourceType for this resource
      const resourceTypeSanityId = resourceSanityIdToResourceTypeSanityId.get(
        resource._id,
      );
      if (!resourceTypeSanityId) {
        skippedCount++;
        continue; // Skip resources without a resourceType
      }

      const resourceTypeId = sanityIdToResourceTypeId.get(resourceTypeSanityId);
      if (!resourceTypeId) {
        skippedCount++;
        continue;
      }

      // Map source references to actual Convex source IDs
      const sourceIds = [];
      if (resource.sources && Array.isArray(resource.sources)) {
        for (const sourceRef of resource.sources) {
          const convexSourceId = sanityIdToSourceId.get(sourceRef._ref);
          if (convexSourceId) {
            sourceIds.push(convexSourceId);
          }
        }
      }

      // Insert the resource
      await ctx.db.insert("resources", {
        sanityId: resource._id,
        name: resource.name,
        resourceTypeId,
        sourceIds: sourceIds.length > 0 ? sourceIds : undefined,
      });
      loadedCount++;
    }

    return {
      message: `Cleared ${existingResources.length} resources and ${existingResourceTypes.length} resourceTypes. Loaded ${resourceTypeSeedsData.result.length} resourceTypes and ${loadedCount} resources (skipped ${skippedCount}).`,
      resourcesCleared: existingResources.length,
      resourceTypesCleared: existingResourceTypes.length,
      resourceTypesLoaded: resourceTypeSeedsData.result.length,
      resourcesLoaded: loadedCount,
      resourcesSkipped: skippedCount,
    };
  },
});

const buildResourceTypeResourceMap = () => {
  const map = new Map<string, string>();
  for (const rt of resourceTypeSeedsData.result) {
    if (rt.resources && Array.isArray(rt.resources)) {
      for (const resourceRef of rt.resources) {
        map.set(resourceRef._ref, rt._id);
      }
    }
  }
  return map;
};

export const seedResourcesFromJson = mutation({
  args: {
    clearExisting: v.optional(v.boolean()),
  },
  handler: async (ctx, { clearExisting }) => {
    const shouldClear = clearExisting !== false;

    if (shouldClear) {
      const existingResources = await ctx.db.query("resources").collect();
      for (const resource of existingResources) {
        await ctx.db.delete(resource._id);
      }
    }

    // Ensure resource types exist (match by name).
    const existingResourceTypes = await ctx.db.query("resourceTypes").collect();
    const resourceTypeNameToId = new Map(
      existingResourceTypes.map((rt) => [rt.name, rt._id]),
    );
    const resourceTypeSanityIdToId = new Map<string, string>();

    for (const rt of resourceTypeSeedsData.result) {
      let resourceTypeId = resourceTypeNameToId.get(rt.name);
      if (!resourceTypeId) {
        resourceTypeId = await ctx.db.insert("resourceTypes", {
          name: rt.name,
          thumbnailUrl: rt.thumbnailUrl || undefined,
        });
        resourceTypeNameToId.set(rt.name, resourceTypeId);
      }
      resourceTypeSanityIdToId.set(rt._id, resourceTypeId);
    }

    // Build source maps (sanityId -> id, name -> id).
    const existingSources = await ctx.db.query("sources").collect();
    const sourceSanityIdToId = new Map<string, string>();
    const sourceNameToId = new Map<string, string>();

    for (const source of existingSources) {
      if (source.sanityId) {
        sourceSanityIdToId.set(source.sanityId, source._id);
      }
      sourceNameToId.set(source.name, source._id);
    }

    const seedSourceNameBySanityId = new Map<string, string>();
    for (const seedSource of sourceSeedsData.result) {
      seedSourceNameBySanityId.set(seedSource._id, seedSource.name);

      if (sourceSanityIdToId.has(seedSource._id)) {
        continue;
      }

      const existingByName = sourceNameToId.get(seedSource.name);
      if (existingByName) {
        sourceSanityIdToId.set(seedSource._id, existingByName);
        continue;
      }

      const sourceId = await ctx.db.insert("sources", {
        sanityId: seedSource._id,
        name: seedSource.name,
        url: seedSource.url || undefined,
        description: seedSource.description || undefined,
      });
      sourceSanityIdToId.set(seedSource._id, sourceId);
      sourceNameToId.set(seedSource.name, sourceId);
    }

    const resourceToTypeMap = buildResourceTypeResourceMap();
    let loadedCount = 0;
    let skippedCount = 0;

    for (const resource of resourceSeedsData.result) {
      const resourceTypeSanityId = resourceToTypeMap.get(resource._id);
      if (!resourceTypeSanityId) {
        skippedCount++;
        continue;
      }

      const resourceTypeId = resourceTypeSanityIdToId.get(resourceTypeSanityId);
      if (!resourceTypeId) {
        skippedCount++;
        continue;
      }

      const sourceIds = [];
      if (resource.sources && Array.isArray(resource.sources)) {
        for (const sourceRef of resource.sources) {
          const directMatch = sourceSanityIdToId.get(sourceRef._ref);
          if (directMatch) {
            sourceIds.push(directMatch);
            continue;
          }

          const sourceName = seedSourceNameBySanityId.get(sourceRef._ref);
          if (!sourceName) {
            continue;
          }

          const nameMatch = sourceNameToId.get(sourceName);
          if (nameMatch) {
            sourceIds.push(nameMatch);
            sourceSanityIdToId.set(sourceRef._ref, nameMatch);
          }
        }
      }

      await ctx.db.insert("resources", {
        sanityId: resource._id,
        name: resource.name,
        resourceTypeId,
        sourceIds: sourceIds.length > 0 ? sourceIds : undefined,
      });
      loadedCount++;
    }

    return {
      message: `Seeded ${loadedCount} resources (skipped ${skippedCount}).`,
      resourcesSeeded: loadedCount,
      resourcesSkipped: skippedCount,
      resourceTypesTotal: resourceTypeSanityIdToId.size,
      sourcesTotal: sourceSanityIdToId.size,
      clearedExisting: shouldClear,
    };
  },
});
