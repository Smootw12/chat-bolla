import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const subscribe = mutation({
  args: {
    subscription: v.string(),
    accountId: v.string(), // (image url)
    browserId: v.string(),
  },
  handler: async (ctx, args) => {
    const accountExists = await ctx.db
      .query("subscriptions")
      .withIndex("by_image_url")
      .filter((q) =>
        q.and(
          q.eq(q.field("accountId"), args.accountId),
          q.eq(q.field("browserId"), args.browserId)
        )
      )
      .first();

    if (accountExists) {
      if (accountExists.subscription === args.subscription) return;

      return await ctx.db.patch(accountExists._id, {
        subscription: args.subscription,
      });
    }

    return await ctx.db.insert("subscriptions", {
      ...args,
    });
  },
});
