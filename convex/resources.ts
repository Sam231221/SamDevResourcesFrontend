import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

// Store empty array for "no sources" so readers always get an array.
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
      sourceIds: sourceIds ?? [],
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
      sourceIds: sourceIds ?? [],
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
