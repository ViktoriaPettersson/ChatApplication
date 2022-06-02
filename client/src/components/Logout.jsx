import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    navigate("./login");
  };

  return (
    <>
      <div className="d-flex justify-content-end logout-btn-container">
        <button onClick={handleLogout}>Logga ut</button>
      </div>
    </>
  );
}

export default Logout;
