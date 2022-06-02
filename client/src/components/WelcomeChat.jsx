import React, { useState, useEffect } from "react";

export default function WelcomeChat({ currentUser }) {
  const [welcomeUser, setWelcomeUser] = useState();

  useEffect(() => {
    if (currentUser) {
      setWelcomeUser(currentUser.username);
    }
  }, [currentUser]);
  return (
    <div className="welecome-chat-message d-flex flex-column justify-content-center algin-items-center text-center">
      <div>
        <div className="welcome-chat-message-heading global-green-dark">
          {" "}
          Välkommen till chatten {welcomeUser}!
        </div>
        <div className="global-green-dark">
          Välj en kontakt i listan för att börja chatta
        </div>
        <i className="fa-solid fa-comments fa-3x pt-3 global-orange"></i>
      </div>
    </div>
  );
}
