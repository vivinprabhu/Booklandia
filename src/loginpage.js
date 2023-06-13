import React, { useState } from "react";
import "./style.css";
import backgr from "./login.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Loginpage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const HandleLogout = () => {
    sessionStorage.removeItem('email');
    localStorage.removeItem('email');
  };

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      navigate('/home');
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  
    let isValid = true;
  
    if (!email) {
      setemailError("The Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setemailError("Invalid Email address");
      isValid = false;
    } else {
      setemailError("");
    }
  
    if (!password) {
      setPasswordError("The Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }
  
    if (!isValid) {
      return;
    }
  
    axios
      .post("http://localhost:8080/api/login/auth", { email, password })
      .then((response) => {
        if (response.data === "Login Successful") {
          sessionStorage.setItem("email", email);
          localStorage.setItem("email", email);
          navigate("/home");
        } else {
          alert("Invalid Username or Password");
        }
      })
      .catch((error) => {
        alert(error);
      });
  
    setEmail("");
    setPassword("");
  }

  function validateEmail(email) {
    var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    return re.test(email);  
  }

  return (
    <>
      <div className="background2">
        <img src={backgr} height="700px" width="700px" alt="Background" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="back">

          <div onClick={HandleLogout}>
            <h3>LOGIN</h3>
          </div>

          <input
            className="input-field" type="email" placeholder="Enter Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
          
          <div className="alertemail">
            {emailError && <div style={{ color: "red" }}>{emailError}</div>}
          </div>

          <input className="input-field1" type={passwordShown ? "text" : "password"} placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
          <div className="alertPass">
            {passwordError && (
              <div style={{ color: "red" }}>{passwordError}</div>
            )}
          </div>

          <div className="showpassword">
            <input type="checkbox" onClick={togglePassword} />
            Show Password
          </div>

          <div>
            <button className="btn3" type="submit"> Proceed </button>
          </div>

          <Link to="/forgotpassword">
            <div className="fp">
              <p>Forgot password</p>
            </div>
          </Link>

          <div className="h4">
            <Link to="/signup"> Don't have an account? </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Loginpage;