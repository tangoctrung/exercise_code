import React from 'react';
import "./PageNotFound.css";
import pageNotFound from '../../data/images/pageNotFound.gif';
import { Link } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';

function PageNotFound() {
    return (
        <div className="pageNotFound">
            <div className="pageNotFound-top">
                <Topbar />
            </div>
            <div className="pageNotFound-content">
                <h1>Rất tiếc, trang WEB không tồn tại...</h1>
                <img src={pageNotFound} alt="notFound" />
                <p>Bạn hãy bấm vào đây để quay về </p>
                <Link to="/" className="pageNotFound-home">trang chủ.</Link>
            </div>
        </div>
    )
}

export default PageNotFound;
