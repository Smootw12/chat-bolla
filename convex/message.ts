import { v } from "convex/values";
import {
  query,
  mutation,
  internalAction,
  internalQuery,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { discordWebhook } from "./globals";

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
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("imageUrl"), args.imageUrl))
      .first();

    await ctx.db.insert("messages", {
      ...args,
      authorName: user?.name,
    });

    await ctx.scheduler.runAfter(0, internal.message.sendNotifications, {
      ...args,
    });
  },
});

export const getUsers = internalQuery({
  async handler(ctx) {
    return await ctx.db.query("users").collect();
  },
});

export const sendNotifications = internalAction({
  args: {
    imageUrl: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args): Promise<void> => {
    const users = await ctx.runQuery(internal.message.getUsers);

    let usersToNotify = users.filter((user) => user.imageUrl !== args.imageUrl);

    let message = "";

    usersToNotify.map((user) => (message += user.discordId + " "));

    message += "[**NOVITA NELLA CHAT!**](https://chat-bolla.vercel.app/chat)";

    try {
      // A fetch request to send data through the discord
      // webhook, and display it as a message in your
      // discord channel
      await fetch(discordWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
        }),
      });
    } catch (err: any) {
      // Just in case :)
      console.log(err.message);
    }
  },
});
