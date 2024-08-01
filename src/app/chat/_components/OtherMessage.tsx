"use client";

import { formatTimeToNow } from "@/lib/utils";
import Image from "next/image";

type UserMessageProps = {
  text: string;
  createdAt: number;
  imageUrl: string;
};

const OtherMessage: React.FC<UserMessageProps> = ({
  text,
  createdAt,
  imageUrl,
}) => {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
      {imageUrl ? (
        <img
          className="flex-shrink-0 h-10 w-10 rounded-full"
          src={imageUrl}
        ></img>
      ) : (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      )}
      <div>
        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p className="text-sm">{text}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">
          {formatTimeToNow(new Date(createdAt))}
        </span>
      </div>
    </div>
  );
};

export default OtherMessage;
