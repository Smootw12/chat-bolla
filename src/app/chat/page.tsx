"use client";

import { UserButton, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import UserMessage from "./_components/UserMessage";
import OtherMessage from "./_components/OtherMessage";
import { useState } from "react";

export default function Home() {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const messages = useQuery(api.message.get);
  const postMessage = useMutation(api.message.post);

  return (
    <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        {messages?.map((message) => {
          if (message.imageUrl === user?.imageUrl) {
            return (
              <UserMessage
                text={message.text}
                createdAt={message._creationTime}
                imageUrl={message.imageUrl}
              />
            );
          }
          return (
            <OtherMessage
              createdAt={message._creationTime}
              imageUrl={message.imageUrl}
              text={message.text}
            />
          );
        })}
      </div>

      <div className="bg-gray-300 p-4">
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 flex items-center justify-center">
            <UserButton></UserButton>
          </div>
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Type your message…"
          />
          <button
            onClick={() => {
              if (input !== "") {
                postMessage({ imageUrl: user?.imageUrl || "", text: input });
              }

              setInput("");
            }}
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-blue-700 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-send text-white"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}