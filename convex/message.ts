import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});

export const post = mutation({
  args: {
    imageUrl: v.string(),
    text: v.string(),
  },
  handler: async function (ctx, args) {
    await ctx.db.insert("messages", {
      ...args,
    });
  },
});
