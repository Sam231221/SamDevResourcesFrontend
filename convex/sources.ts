import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import sourceSeedsData from "../sourceseeds.json";

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
    await ctx.db.delete(id);
    return id;
  },
});

export const loadAllSources = mutation({
  args: {},
  handler: async (ctx) => {
    // First, clear all existing sources
    const existingSources = await ctx.db.query("sources").collect();
    for (const source of existingSources) {
      await ctx.db.delete(source._id);
    }

    let loadedCount = 0;

    // Bulk load all sources from seed file with original Sanity IDs
    for (const source of sourceSeedsData.result) {
      await ctx.db.insert("sources", {
        sanityId: source._id, // Store original Sanity _id
        name: source.name,
        url: source.url || undefined,
        description: undefined,
      });
      loadedCount++;
    }

    return {
      message: `Cleared existing sources and loaded ${loadedCount} sources with original IDs`,
      total: sourceSeedsData.result.length,
      loaded: loadedCount,
    };
  },
});
