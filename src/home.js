import React from "react";
import "./style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import homeimg from "./bookstore.jpg";


function Home() {
  const navigate=useNavigate();
  const HandleLogout = () =>{
    localStorage.removeItem('email');
  }

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login'); 
    } else {
      
    }
  }, [navigate]);

  return (
    <>
        <div class="homeimg">
          <img src={homeimg} height="713px" width="1558px"/>
        </div>

    <div className="container">
      <Link to="/login">
        <div className="logout-button" onClick={HandleLogout}>LOGOUT</div>
      </Link>

      <Link to="/addbook">
        <div className="add-button">Add Book</div>
      </Link>

      <Link to="/editbook">
      <div className="editbook-button">Edit Book</div>
      </Link>

      <Link to="/invoice">
        <div className="bill-button">Generate Invoice</div>
      </Link>
      </div>
    </>
  );
}

export default Home;
