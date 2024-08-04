import { v } from "convex/values";
import { query, mutation, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

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

    await ctx.scheduler.runAfter(0, internal.message.sendNotifications, {
      message: args.text,
    });
  },
});

export const sendNotifications = internalAction({
  args: { message: v.string() },
  handler: async (_, args): Promise<void> => {
    try {
      // A fetch request to send data through the discord
      // webhook, and display it as a message in your
      // discord channel
      await fetch(
        process.env.DISCORD_WEBHOOK!,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content:
              "ORCODEO NUOVI MESSAGGI SULLA [CHAT!](https://chat-bolla.vercel.app/chat)",
          }),
        }
      );
    } catch (err: any) {
      // Just in case :)
      console.log(err.message);
    }
  },
});
