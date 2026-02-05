import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listResourceTypes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("resourceTypes").collect();
  },
});

export const listResourceTypesWithCategories = query({
  args: {},
  handler: async (ctx) => {
    const resourceTypes = await ctx.db.query("resourceTypes").collect();
    return resourceTypes;
  },
});

export const createResourceType = mutation({
  args: {
    name: v.string(),
    thumbnailUrl: v.optional(v.string()),
  },
  handler: async (ctx, { name, thumbnailUrl }) => {
    return await ctx.db.insert("resourceTypes", { name, thumbnailUrl });
  },
});

export const updateResourceType = mutation({
  args: {
    id: v.id("resourceTypes"),
    name: v.string(),
    thumbnailUrl: v.optional(v.string()),
  },
  handler: async (ctx, { id, name, thumbnailUrl }) => {
    await ctx.db.patch(id, { name, thumbnailUrl });
    return id;
  },
});

export const deleteResourceType = mutation({
  args: { id: v.id("resourceTypes") },
  handler: async (ctx, { id }) => {
    // Delete all resources under this type
    const resources = await ctx.db
      .query("resources")
      .withIndex("byResourceType", (q) => q.eq("resourceTypeId", id))
      .collect();
    for (const r of resources) {
      await ctx.db.delete(r._id);
    }
    await ctx.db.delete(id);
    return id;
  },
});
