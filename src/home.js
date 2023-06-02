import React from "react";

import './style.css'

import {Link} from "react-router-dom";

function Home()
{
    return(
        <>

        <Link to="/login">
            <div class="logout-button"> LOGOUT </div>
        </Link>
               
        <Link to="/addbook"><div class="add-button">
            Add Book
        </div></Link>
        
        <Link to="/invoice">
            <div class="bill-button"> Generate Invoice </div>
        </Link>

        <div class="viewbook-button"> View Book </div>


        </>
    );
}

export default Home;