import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listSources = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sources").collect();
  },
});

export const createSource = mutation({
  args: {
    name: v.string(),
    url: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, { name, url, description }) => {
    return await ctx.db.insert("sources", { name, url, description });
  },
});

export const updateSource = mutation({
  args: {
    id: v.id("sources"),
    name: v.string(),
    url: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, { id, name, url, description }) => {
    await ctx.db.patch(id, { name, url, description });
    return id;
  },
});

export const deleteSource = mutation({
  args: { id: v.id("sources") },
  handler: async (ctx, { id }) => {
    // Clear this source from any resources that reference it
    const resources = await ctx.db.query("resources").collect();
    for (const resource of resources) {
      if (resource.sourceIds?.includes(id)) {
        const next = (resource.sourceIds ?? []).filter((sid) => sid !== id);
        await ctx.db.patch(resource._id, { sourceIds: next });
      }
    }
    await ctx.db.delete(id);
    return id;
  },
});
