import React from 'react';
import ReactDOM from 'react-dom/client';

import Landingpage from "./landingpage";
import Loginpage from "./loginpage";
import Forgotpassword from './forgotpassword';
import Signup from './signup';
import Home from './home';
import Addbook from './addbook';
import Editbook from './editbook';
import Invoice from './invoice';
import Showbill from './showbill';

import{BrowserRouter as Router,Routes,Route} from "react-router-dom";

export default function RouteApp(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Landingpage/>}></Route>
                <Route path="/login" element={<Loginpage/>}></Route>
                <Route path="/forgotpassword" element={<Forgotpassword/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/addbook" element={<Addbook/>}></Route>
                <Route path="/editbook" element={<Editbook/>}></Route>
                <Route path="/invoice" element={<Invoice/>}></Route>
                <Route path="/showbill" element={<Showbill/>}></Route>
            </Routes>
        </Router>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouteApp/>);