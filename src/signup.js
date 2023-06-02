import React, { useState } from "react";
import './style.css';
import backgr from "./login.jpg";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [storeName, setStoreName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() !== "" && storeName.trim() !== "" && landmark.trim() !== "" && address.trim() !== "") {
      // Perform signup logic here
      console.log("Signup successful!");

      // Navigate to the login page programmatically
      window.location.href = "/login";
    }
  };

  return (
    <>
      <div className="background2">
        <img src={backgr} height="700px" width="700px" alt="Background" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className='back'>
            
          <div>
            <h5>REGISTER</h5>
          </div>

          <input className='input-field2'type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <input className='input-field3' type="text" placeholder="Store Name" value={storeName} onChange={(e) => setStoreName(e.target.value)}/>

          <input className='input-field4' type="text" placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)}/>

          <textarea className="input-field5" placeholder="Address"value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

          <div>
            <input className='btn4' type='submit' value='Signup' />
          </div>

          <div className="h6">
            <Link to="/login">Already have an account?</Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;