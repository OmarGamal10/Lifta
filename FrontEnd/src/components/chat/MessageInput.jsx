// filepath: /d:/Lifta/FrontEnd/src/components/chat/MessageInput.jsx
import { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-primary text-white font-bold px-4 rounded-lg hover:bg-accent transition-all"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
