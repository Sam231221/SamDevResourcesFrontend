import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  categories: defineTable({
    title: v.string(),
  }).index("byTitle", ["title"]),

  sources: defineTable({
    sanityId: v.optional(v.string()), // Original Sanity _id
    name: v.string(),
    url: v.optional(v.string()),
    description: v.optional(v.string()),
  })
    .index("byName", ["name"])
    .index("bySanityId", ["sanityId"]),

  resourceTypes: defineTable({
    name: v.string(),
    thumbnailUrl: v.optional(v.string()),
  }).index("byName", ["name"]),

  resources: defineTable({
    sanityId: v.optional(v.string()), // Original Sanity _id
    name: v.string(),
    resourceTypeId: v.id("resourceTypes"),
    sourceIds: v.optional(v.array(v.id("sources"))),
  })
    .index("byResourceType", ["resourceTypeId"])
    .index("byResourceTypeAndName", ["resourceTypeId", "name"])
    .index("bySanityId", ["sanityId"]),
});

export default schema;
