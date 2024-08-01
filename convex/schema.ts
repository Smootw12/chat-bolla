import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    imageUrl: v.string(),
    text: v.string(),
  }),
});
