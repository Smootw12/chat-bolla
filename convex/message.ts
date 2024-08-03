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

    const subscriptions = await ctx.db.query("subscriptions").collect();

    const notificationPayload = {
      title: "CHAT BOLLA",
      body: args.text,
      icon: args.imageUrl,
      data: {
        url: "https://chat-bolla.vercel.app",
      },
    };

    for (let subscription of subscriptions) {
      if (subscription.accountId !== args.imageUrl) {
        let payload = {
          subscription: subscription.subscription,
          notificationPayload,
        };

        await fetch("https://chat-bolla.vercel.app/api/sendNotification", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
    }
  },
});
