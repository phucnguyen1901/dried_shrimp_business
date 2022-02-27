
import { Link } from 'react-router-dom';
import React, { useState } from 'react';


const Header = () => {

    const [show,setShow] = useState(false);


    return ( 
      
        <div className="navbar">
            <div className="logo">
                My Logo
            </div>
            <div className={ show ? "links active" : "links" }>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>





     );
}
 
export default Header;