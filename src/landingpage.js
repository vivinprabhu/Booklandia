import React from "react";

import './style.css';

import logo from "./logo.png";

import lp0 from "./gif.gif";
import lp1 from "./lp1.jpeg";
import lp2 from "./lp2.jpeg";
import lp3 from "./lp3.jpeg";

import twitter from "./twitter.png";
import insta from "./insta.png";
import linkedin from "./linkedin.png";

import { Link } from "react-router-dom";

function Landingpage() {
  return (
    <div>

    <div className='navbar'>

      <Link to='/login'><p>Login</p></Link>

      <p>Contact Us</p>

      <Link to="/aboutus"> <p>About Us</p> </Link>

      <img src={logo}/>

    </div>

    <div class="llp0">
        <img src={lp0} height="550px" width="1500px"/>
    </div>

    <div class="llp1">
        <img src={lp1} height="300px" width="500px"/>
    </div>

    <div class="lpp1">
    Say goodbye to manual billing and inventory management with Booklandia
    </div>

    <div class="llp2">
        <img src={lp2} height="300px" width="500px"/>
    </div>

    <div class="lpp2">
    With Booklandia, you can quickly generate and send invoices to customers. No more manual calculation or paperwork.
    </div>

    <div class="llp3">
        <img src={lp3} height="300px" width="500px"/>
    </div>

    <div class="lpp3">
    Keep track of your books in real-time. Booklandia lets you monitor your inventory levels and replenish stocks automatically as books sell out.
    </div>

    <div class="contact">
        <div class="h101">GET IN TOUCH !</div>  
    </div>

    <div class="twitter">
        <img src={twitter} height="75px" width="85px"/>
      </div>

      <div class="insta">
        <img src={insta} height="100px" width="105px"/>
      </div>

      <div class="linkedin">
        <img src={linkedin} height="75px" width="80px"/>
      </div>
    
    </div>
  );
}

export default Landingpage;