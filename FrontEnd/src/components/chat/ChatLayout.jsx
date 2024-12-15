/* eslint-disable no-unused-vars */
import { useState, useEffect, act } from "react";
import socket from "../../Socket instance/socketSingleton";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import useHttp from "../../hooks/useHTTP";

const ChatLayout = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});

  const { get, post, loading, error, data } = useHttp("http://localhost:3000");

  // Extract user ID from JWT stored in cookies
  const getTokenFromCookies = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="));
    return cookie ? cookie.split("=")[1] : null;
  };

  const token = getTokenFromCookies();
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.user_id : null;
  const type = decodedToken ? decodedToken.type : null;

  useEffect(() => {
    socket.emit("join", userId);
    // Listen for incoming messages
    socket.on("receive_message", (message) => {
      console.log("Received message:", message);
      console.log(message.sender_id, message.receiver_id);
      setMessages((prevMessages) => {
        console.log(activeChat);
        if (activeChat) {
          activeChat.last_message = message.content;
        }
        const chatId =
          message.sender_id === userId
            ? message.receiver_id
            : message.sender_id;
        return {
          ...prevMessages,
          [chatId]: [...(prevMessages[chatId] || []), message],
        };
      });
    });

    return () => {
      socket.off("receive_message");
    };
  }, [userId]);

  useEffect(() => {
    if (activeChat) {
      // Fetch messages when a chat is selected
      const fetchMessages = async () => {
        try {
          const response = await get(
            `/messages/${userId}/${activeChat.user_id}/${activeChat.subscription_id}`
          );
          const messages = response.data.messages;
          console.log("Fetched messages:", messages);

          console.log("Active chat:", activeChat);
          setMessages((prevMessages) => ({
            ...prevMessages,
            [activeChat.user_id]: messages,
          }));
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [activeChat]);

  const sendMessage = async (to, content) => {
    const message = {
      sender_id: userId,
      receiver_id: to,
      content,
      time: new Date(),
      subscription_id: activeChat.subscription_id,
    };
    console.log("Sending message:", message);
    // Emit the message to the server

    socket.emit("private_message", { to, message });
    activeChat.last_message = content;
    console.log("Active chat:", activeChat);
    // Update the local state with the new message
    console.log(to);
    setMessages((prevMessages) => ({
      ...prevMessages,
      [to]: [...(prevMessages[to] || []), message],
    }));

    try {
      await axios.post("http://localhost:3000/messages", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50">
      <div className="fixed bottom-0 right-0 transition-transform duration-300 translate-x-0 rounded-lg">
        <div className="flex h-[600px] bg-white shadow-xl border border-gray-200 rounded-lg">
          <div className="w-80 border-r border-gray-200 h-full">
            <ChatSidebar
              onChatSelect={setActiveChat}
              activeChat={activeChat}
              id={userId}
              type={type}
            />
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeChat ? "w-96 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <div className="w-96 h-full bg-white">
              <ChatWindow
                chat={activeChat}
                messages={messages[activeChat?.user_id] || []}
                onSendMessage={sendMessage}
                currentId={userId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
