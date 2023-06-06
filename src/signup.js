import React, { useState } from "react";
import "./style.css";
import backgr from "./login.jpg";
import axios from "axios";
import { useNavigate ,Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [storeName, setStoreName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const data = {
    email: email,
    name: storeName,
    password: password,
    landmark: landmark,
    address: address
  };

  const newdata = {
    email: email,
    pasword: password
  }

  const handleLoginClick = () => {
    axios.post("http://localhost:8080/api/signup", data);
    axios.post("http://localhost:8080/api/login", newdata);
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email.trim() !== "" &&
      storeName.trim() !== "" &&
      landmark.trim() !== "" &&
      address.trim() !== "" &&
      password.trim() !== ""
    ) {
      console.log("Signup successful!");
      // window.location.href = "/login"; // Remove this line
      handleLoginClick(); // Call the function to send the signup data to the backend
    } else {
      setPasswordError("");
    }
  };

  const validatePassword = (password) => {
    if (password.trim() === "") {
      setPasswordError("");
    } else {
      setPasswordError("");
    }
  };

  return (
    <>
      <div className="background2">
        <img src={backgr} height="700px" width="700px" alt="Background" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="back1">
          <div>
            <h5>REGISTER</h5>
          </div>

          <input
            className="input-field2"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input-field3"
            type="text"
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />

          <input
            className="input-field4"
            type="text"
            placeholder="Landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />

          <textarea
            className="input-field5"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>

          <input
            className="input-field6"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />

          {passwordError && <p className="error">{passwordError}</p>}

          <div>
            <button className="btn4" type="submit">
              Signup
            </button>
          </div>

          <Link to="/login"><div className="h6">
            Already have an account?
          </div></Link>
        </div>
      </form>
    </>
  );
}

export default Signup;