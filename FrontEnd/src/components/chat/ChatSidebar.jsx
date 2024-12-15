import { useState, useEffect } from "react";
import useHttp from "../../hooks/useHTTP";

const ChatSidebar = ({ onChatSelect, activeChat, id, type }) => {
  const [chats, setChats] = useState([]);
  const { get } = useHttp("http://localhost:3000");

  const fetchChats = async () => {
    try {
      const response = await get(`subscriptions/${type}/conversations/${id}`);
      if (response.data && response.data.convos) {
        setChats(response.data.convos);
      } else {
        setChats([]);
      }
    } catch (err) {
      console.error(err);
      setChats([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchChats();
    };
    fetchData();
  }, [id]);

  return (
    <div className="h-full overflow-y-auto bg-primary">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat.user_id}
            onClick={() => onChatSelect(chat)}
            className={`p-4 hover:bg-secondary transition-all cursor-pointer bg-accent
              ${activeChat?.id === chat.user_id ? "bg-secondary" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                {chat.photo || "👤"}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">
                  {chat.first_name + " " + chat.last_name}
                </h3>
                <p className="text-sm font-semibold text-gray-500">
                  {chat.packages.map((pack) => (
                    <span key={pack.package_id} className="block">
                      {pack.name} -
                      {type === "Trainer"
                        ? pack.type === "Gym"
                          ? "Gym Client"
                          : "Nutrition Client"
                        : pack.type === "Nutrition"
                        ? "Nutritionist"
                        : "Coach"}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-between">
                  <span className="w-3 h-3 bg-secondary rounded-full mr-2 mt-1"></span>
                  {chat.last_message}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="p-4 text-gray-500">No active chats</p>
      )}
    </div>
  );
};

export default ChatSidebar;
