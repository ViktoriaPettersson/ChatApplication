import React, { useState } from "react";
import Picker from "emoji-picker-react";

function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPicker = (e) => {
    e.preventDefault();
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (event, emoji) => {
    let emojiMsg = msg;
    emojiMsg += emoji.emoji;
    setMsg(emojiMsg);
  };
  const sendChatMsg = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      <div className="py-3 py-md-4 ps-0 pe-2 ps-md-2 pe-md-3">
        <form
          className="d-flex align-items-center chat-input-form"
          onSubmit={(e) => sendChatMsg(e)}
        >
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}

          <button className="chat-emoji-btn" onClick={handleEmojiPicker}>
            <i className="fa-regular fa-face-smile-beam"></i>
          </button>

          <div className="input-group">
            <input
              className="chat-input form-control"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Skriv något..."
            ></input>
            <button className="chat-send-btn btn">
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChatInput;
