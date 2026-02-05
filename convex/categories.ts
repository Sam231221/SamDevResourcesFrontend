import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

export const createCategory = mutation({
  args: { title: v.string() },
  handler: async (ctx, { title }) => {
    return await ctx.db.insert("categories", { title });
  },
});

export const updateCategory = mutation({
  args: {
    id: v.id("categories"),
    title: v.string(),
  },
  handler: async (ctx, { id, title }) => {
    await ctx.db.patch(id, { title });
    return id;
  },
});

export const deleteCategory = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return id;
  },
});
