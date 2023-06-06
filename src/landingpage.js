import React from "react";

import './style.css';

import logo from "./logo.png";

import lp0 from "./gif1.gif";
import lp1 from "./lp1.jpeg";
import lp2 from "./lp2.jpeg";
import lp3 from "./lp3.jpeg";

import { Link } from "react-router-dom";

function Landingpage() {
  return (
    <div>

      <div className='navbar'>
        
        <img src={logo}/>

        <div class="project-title">BILLANDIA</div>
      </div>

      <div class="booklandia"><marquee direction="right">BILLANDIA</marquee></div>

      <div class="llp0">
          <img src={lp0} height="550px" width="1500px"/>
      </div>

      <div class="llp1">
          <img src={lp1} height="300px" width="500px"/>
      </div>

      <div class="lpp1">
          Say goodbye to manual billing and inventory management with Billandia
      </div>

      <div class="llp2">
          <img src={lp2} height="300px" width="500px"/>
      </div>

      <div class="lpp2">
          With Billandia, you can quickly generate and send invoices to customers. No more manual calculation or paperwork.
      </div>

      <div class="llp3">
          <img src={lp3} height="300px" width="500px"/>
      </div>

      <div class="lpp3">
          Keep track of your books in real-time. Billandia lets you monitor your inventory levels and replenish stocks automatically as books sell out.
      </div>

      <div class="login-box">
        <div class="login-text">Wanna to visit website!</div>

        <div>
            <div id="land-btn1">
                <div class="btn btn1">
                <Link to="/login"><span>LOGIN</span></Link>
                </div>
                <div class="btn btn2">
                <Link to="/signup"> <span>SIGN UP</span></Link>
                </div>
            </div>
        </div>
      </div>

      <div class="navbar1">

      </div>
    
    </div>
  );
}

export default Landingpage;