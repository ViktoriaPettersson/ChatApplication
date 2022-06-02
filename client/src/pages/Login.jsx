import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import illustration from "../assets/illustration.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastStyling = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    icon: "",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("in validation", loginRoute);
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastStyling);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Du behöver en giltig mailaddress", toastStyling);
      return false;
    } else if (password === "") {
      toast.error("Du behöver ett giltigt lösenord", toastStyling);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="  pt-0 pt-md-5">
        <div className="d-flex justify-content-center align-items-center pt-0 pt-md-5">
          <div className="login-container d-flex justify-content-center align-items-center flex-column-reverse flex-md-row p-3 p-md-5 row m-0">
            <div className="login-form-container col-12 col-md-6">
              <div className="login-heading mt-5 mt-md-0">
                Logga in på ditt konto
              </div>
              <form
                className="d-flex flex-column"
                onSubmit={(event) => handleSubmit(event)}
              >
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                ></input>
                <input
                  type="password"
                  placeholder="Lösenord"
                  name="password"
                  onChange={(e) => handleChange(e)}
                ></input>
                <button type="submit">Logga in</button>
                <div className="navigate-message">
                  Har du inte ett konto än?{" "}
                  <Link className="navigate-link" to="/register">
                    Klicka här för att skapa ett
                  </Link>
                </div>
              </form>
            </div>
            <div className="login-img-container col-md-6 d-flex justify-content-center">
              <img
                src={illustration}
                className="illustration-img img-fluid"
              ></img>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Login;
