import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate=useNavigate( );

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear email error when the field is modified
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Clear password error when the field is modified
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(""); // Clear confirm password error when the field is modified
  };

  const loginpassworddata = {
    email: email,
    pasword: confirmPassword,
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email not filled");
      return;
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid email");
      return;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password not filled");
      return;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password not filled");
      return;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");

    console.log(`Email: ${email},  Confirm Password: ${confirmPassword}`);
    e.preventDefault();

    axios.put(`http://localhost:8080/api/forgotpassword/login/${email}`, loginpassworddata)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="back2">
      <div className="forgotpassword-head">
        Forgot Password
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="input-field7"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p className="error error-message">{emailError}</p>}
          </div>
          <div>
            <input
              className="input-field8"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p className="error error-message1">{passwordError}</p>}
          </div>
          <div>
            <input
              className="input-field9"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && <p className="error error-message2">{confirmPasswordError}</p>}
          </div>
          <button
            className="forgotpassword-button"
            type="submit" 
            disabled={!!emailError || !!passwordError || !!confirmPasswordError}
            onClick={handleSubmit}>
            Reset Password
          </button>
        </form>
        <Link to="/login">
          <div className="go-back-login">Go back to Login</div>
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;