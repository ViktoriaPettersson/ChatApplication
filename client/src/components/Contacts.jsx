import React, { useState, useEffect } from "react";
import Logout from "../components/Logout";

function Contacts({ contacts, currentUser, handleChatChange }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  };

  return (
    <>
      <div className="contacts-container">
        <div className="contacts-current-user-box d-flex justify-content-between align-items-center p-3">
          <h2 className="m-0 p-0 text-white">{currentUserName}</h2>
          <Logout></Logout>
        </div>

        <div className="contacts-users-list-box p-3 p-md-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className={`contact-user ${
                index === currentSelected ? "contact-user-selected" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div>{contact.username}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Contacts;
