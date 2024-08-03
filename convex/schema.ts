import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    imageUrl: v.string(),
    text: v.string(),
  }),
  subscriptions: defineTable({
    subscription: v.string(),
    accountId: v.string(),
    browserId: v.string(),
  }).index("by_image_url", ["accountId"]),
});
