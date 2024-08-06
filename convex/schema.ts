import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    imageUrl: v.string(),
    text: v.string(),
    authorName: v.optional(v.string()),
  }),
  users: defineTable({
    imageUrl: v.string(),
    discordId: v.string(),
    name: v.string(),
  }),
});
