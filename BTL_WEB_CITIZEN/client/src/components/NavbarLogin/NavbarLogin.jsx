import React from 'react';
import "./NavbarLogin.css";
import Logo from "../../data/images/logo_login.png";
import { Link } from 'react-router-dom';


function NavbarLogin() {
    return (
        <div className="navbarLogin">
            <Link to="/" className="navbarLogin-info-img">
                    <img src={Logo} alt="logo" />
            </Link>
            <div className="navbarLogin-title">
                <h1>CitizenV</h1>
                <p>Dự án điều tra, thống kê và phân tích dân số Việt Nam</p>
            </div>
        </div>
    )
}

export default NavbarLogin;
