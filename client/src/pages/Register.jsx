import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import illustration from "../assets/illustration.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import swal from "sweetalert";

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
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
      console.log("in validation", registerRoute);
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastStyling);
      }
      if (data.status === true) {
        swal(
          `Välkommen till chatten ${username}!`,
          "Du kan nu börja chatta med dina vänner",
          "success",
          {
            button: "Stäng",
          }
        );
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { username, email, password } = values;
    if (username.length < 4) {
      toast.error(
        "Användarnamnet måste bestå av minst 4 bokstäver",
        toastStyling
      );
      return false;
    } else if (password.length < 4) {
      toast.error("Lösenordet måste bestå av minst 4 tecken", toastStyling);
      return false;
    } else if (email === "") {
      toast.error("Du måste skriva in en giltig email", toastStyling);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className=" pt-0 pt-md-5">
        <div className="d-flex justify-content-center align-items-center pt-0 pt-md-5">
          <div className="register-container d-flex justify-content-center align-items-center flex-column flex-column-reverse flex-md-row p-3 p-md-5 row m-0">
            <div className="register-form-container col-12 col-md-6">
              <div className="register-heading mt-5 mt-md-0">
                Skapa ditt konto här
              </div>
              <form
                className="d-flex flex-column"
                onSubmit={(event) => handleSubmit(event)}
              >
                <input
                  type="text"
                  placeholder="Användarnamn"
                  name="username"
                  onChange={(e) => handleChange(e)}
                ></input>
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
                <button type="submit">Registrera konto</button>
                <div className="navigate-message">
                  Har du redan ett konto?{" "}
                  <Link className="navigate-link" to="/login">
                    Klicka här för att logga in
                  </Link>
                </div>
              </form>
            </div>
            <div className="register-img-container col-12 col-md-6 d-flex justify-content-center">
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

export default Register;
