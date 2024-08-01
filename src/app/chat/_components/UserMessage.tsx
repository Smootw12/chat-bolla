"use client";

import { formatTimeToNow } from "@/lib/utils";
import Image from "next/image";

type UserMessageProps = {
  text: string;
  createdAt: number;
  imageUrl: string;
};

const UserMessage: React.FC<UserMessageProps> = ({
  text,
  createdAt,
  imageUrl,
}) => {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm">{text}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">
          {formatTimeToNow(new Date(createdAt))}
        </span>
      </div>
      {imageUrl ? (
        <Image
          className="flex-shrink-0 h-10 w-10 rounded-full"
          src={imageUrl}
          alt="Author pp"
        />
      ) : (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      )}
    </div>
  );
};
export default UserMessage;
