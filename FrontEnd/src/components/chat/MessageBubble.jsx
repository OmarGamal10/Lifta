const MessageBubble = ({ message, isOwn }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`flex mb-3 ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`flex flex-col max-w-[70%]`}>
        <div
          className={`p-2.5 rounded-lg break-words overflow-hidden ${
            isOwn
              ? "bg-accent rounded-tr-none"
              : "bg-secondary text-gray-800 rounded-tl-none"
          }`}
        >
          <p className="text-md font-semibold leading-normal whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
        <span
          className={`text-xs text-gray-500 mt-1 ${
            isOwn ? "text-right" : "text-left"
          }`}
        >
          {formatTime(message.time)}
          {isOwn && <span className="ml-1">✓✓</span>}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
