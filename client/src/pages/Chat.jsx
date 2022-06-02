import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import WelcomeChat from "../components/WelcomeChat";
import ChatContainer from "../components/ChatContainer";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChange] = useState(undefined);

  useEffect(() => {
    async function checkUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    checkUser();
  }, []);

  // -------------SOCKET-----------------------
  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5000");
      // emittar och skickar med currentUser._id till backend
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  // -------------SOCKET-----------------------

  useEffect(() => {
    const getContacts = async () => {
      if (currentUser) {
        const res = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(res.data);
      }
    };
    getContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChange(chat);
  };

  return (
    <>
      <div className="vh-100 pt-0 pt-md-5">
        <div className="d-flex justify-content-center align-items-center pt-0 pt-md-5">
          <div className="chat-box-container gx-0 row m-0">
            <div className="col-12 col-md-4">
              <div className="chat-user-container me-0 me-md-3">
                <Contacts
                  contacts={contacts}
                  currentUser={currentUser}
                  handleChatChange={handleChatChange}
                ></Contacts>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <div className="chat-messages-container">
                {currentChat === undefined ? (
                  <WelcomeChat currentUser={currentUser}></WelcomeChat>
                ) : (
                  <ChatContainer
                    currentChat={currentChat}
                    currentUser={currentUser}
                    socket={socket}
                  ></ChatContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
