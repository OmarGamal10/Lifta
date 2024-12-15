/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow = ({ chat, messages, onSendMessage, currentId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (chat) {
      setIsVisible(true);
    }
  }, [chat]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!chat) {
    return null;
  }

  return (
    <div
      className={`h-full overflow-hidden transition-all duration-300 ease-in-out ${
        isVisible ? "w-96" : "w-0"
      }`}
    >
      <div
        className={`h-full w-96 bg-primary border-l flex flex-col transform transition-all duration-300 ease-in-out ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="p-4 border-b bg-accent flex items-center justify-between">
          <h3 className="font-bold text-lg">
            {chat?.first_name + " " + chat?.last_name}
          </h3>
          <span className="bg-secondary rounded-full font-semibold px-2 py-1 text-sm ml-16 mt-0.5 ">
            {chat.status === "Active" ? "Active" : "Expired"}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.time}
              message={message}
              isOwn={message.sender_id === currentId}
            />
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="border-t">
          <MessageInput
            onSend={(content) => {
              onSendMessage(chat.user_id, content);
              if (messageEndRef.current) {
                messageEndRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
            chat={chat}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
