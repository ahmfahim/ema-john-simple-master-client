import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import {Link} from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <span className="profile">
                    <button onClick={() => setLoggedInUser({})} className="sign-out-btn" >Sign Out</button>
                    <img src={loggedInUser.photo} alt="" />
                </span>
            </nav>
        </div>
    );
};

export default Header;