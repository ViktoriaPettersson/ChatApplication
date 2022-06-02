import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatInput from "./ChatInput";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [recievedMsg, setRecievedMsg] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    if (currentChat) {
      const fetchCurrentChat = async () => {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      };
      fetchCurrentChat();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    // När meddelandet skickas emittas send-msg med följande data till servern
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setRecievedMsg({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    recievedMsg && setMessages((prev) => [...prev, recievedMsg]);
  }, [recievedMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="d-flex flex-column justify-content-between">
        <div className="chat-messages-box px-2 px-md-4 pt-2 pt-md-4">
          {messages.map((msg) => {
            return (
              <div ref={scrollRef} key={uuidv4()} className="d-flex">
                <div
                  className={`my-3 p-2 message ${
                    msg.fromSelf
                      ? "chat-sended ms-auto me-2"
                      : "chat-recieved order-1 ms-2"
                  }`}
                >
                  {msg.message}
                </div>
                <i
                  className={`chat-user-icon my-3 p-2 fa-regular fa-user ${
                    msg.fromSelf ? "chat-sended-icon" : "chat-recieved-icon"
                  }`}
                ></i>
              </div>
            );
          })}
        </div>

        <div className="chat-input-container">
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      </div>
    </>
  );
}
