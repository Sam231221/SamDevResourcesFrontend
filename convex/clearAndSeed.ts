import { mutation } from "./_generated/server";

// This mutation clears all data and reseeds the database
export const clearAndSeedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Step 1: Delete all data (in correct order due to foreign keys)
    // Delete resources (references resourceTypes)
    const resources = await ctx.db.query("resources").collect();
    for (const item of resources) {
      await ctx.db.delete(item._id);
    }

    // Delete main tables
    const resourceTypes = await ctx.db.query("resourceTypes").collect();
    for (const item of resourceTypes) {
      await ctx.db.delete(item._id);
    }

    const sources = await ctx.db.query("sources").collect();
    for (const item of sources) {
      await ctx.db.delete(item._id);
    }

    const categories = await ctx.db.query("categories").collect();
    for (const item of categories) {
      await ctx.db.delete(item._id);
    }

    // Step 2: Create Categories (3 instances)
    await ctx.db.insert("categories", {
      title: "Frontend Development",
    });

    await ctx.db.insert("categories", {
      title: "Backend Development",
    });

    await ctx.db.insert("categories", {
      title: "Database & Storage",
    });

    // Step 3: Create Sources (3 instances)
    await ctx.db.insert("sources", {
      name: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      description: "Comprehensive web development documentation",
    });

    await ctx.db.insert("sources", {
      name: "GitHub",
      url: "https://github.com",
      description: "Code hosting and version control platform",
    });

    await ctx.db.insert("sources", {
      name: "Stack Overflow",
      url: "https://stackoverflow.com",
      description: "Q&A platform for developers",
    });

    // Step 4: Create Resource Types (3 instances)
    const reactTypeId = await ctx.db.insert("resourceTypes", {
      name: "React",
      thumbnailUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    });

    const nodeTypeId = await ctx.db.insert("resourceTypes", {
      name: "Node.js",
      thumbnailUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    });

    const postgresTypeId = await ctx.db.insert("resourceTypes", {
      name: "PostgreSQL",
      thumbnailUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    });

    // Step 5: Create Resources (7 instances - 2-3 per type)

    // React Resources (3)
    await ctx.db.insert("resources", {
      name: "React Hooks Guide",
      resourceTypeId: reactTypeId,
    });

    await ctx.db.insert("resources", {
      name: "React Components Best Practices",
      resourceTypeId: reactTypeId,
    });

    await ctx.db.insert("resources", {
      name: "State Management Patterns",
      resourceTypeId: reactTypeId,
    });

    // Node.js Resources (2)
    await ctx.db.insert("resources", {
      name: "Express.js Tutorial",
      resourceTypeId: nodeTypeId,
    });

    await ctx.db.insert("resources", {
      name: "RESTful API Design",
      resourceTypeId: nodeTypeId,
    });

    // PostgreSQL Resources (2)
    await ctx.db.insert("resources", {
      name: "Advanced SQL Queries",
      resourceTypeId: postgresTypeId,
    });

    await ctx.db.insert("resources", {
      name: "Database Indexing Strategies",
      resourceTypeId: postgresTypeId,
    });

    return {
      success: true,
      message: "Database cleared and seeded successfully!",
      counts: {
        categories: 3,
        sources: 3,
        resourceTypes: 3,
        resources: 7,
      },
    };
  },
});
