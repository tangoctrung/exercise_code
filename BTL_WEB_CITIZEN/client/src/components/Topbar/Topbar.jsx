import React from 'react';
import './Topbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { Link } from 'react-router-dom';
import { noAvatar } from '../../api/urlApi';

function Topbar() {

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="topbar">
            <div className="topbar-left">
                <Link to="/" className="">
                    <div className="topbar-left-text">
                        <h1 title="CitizenV">CV</h1>
                    </div>
                </Link>
            </div>
            <div className="topbar-center">
                {auth?.accessToken && 
                    <div className="topbar-center-input">
                        {/* <div className="topbar-center-inputSearch">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm kiếm bài báo..." />
                        </div> */}
                        <Link to={`/profile/${auth?.user?._id}`} className="topbar-center-item topbar-center-profile">
                                <i className="fas fa-id-card-alt" title="Trang cá nhân"></i>
                        </Link>
                        {!auth?.user?.isAdmin && 
                            <Link to="/writepost" className="topbar-center-item topbar-center-blog">
                                <i className="fas fa-marker" title="Viết báo"></i>
                            </Link>}
                        <Link to="/postsaved"className="topbar-center-item topbar-center-saved">
                            <i className="fas fa-save" title="Bài viết của bạn"></i>
                        </Link>
                        <Link to="/work" className="topbar-center-item topbar-center-worker">
                            <i className="fas fa-th-list" title="Công việc"></i>
                        </Link>
                    </div>}
            </div>
            <div className="topbar-right">

                { auth.accessToken ?
                    <div className="topbar-right-info">
                        <div className="topbar-right-img">
                            <img src={auth?.user?.avatar ? auth?.user?.avatar : noAvatar} alt="avatar" />
                        </div>
                        <div className="topbar-menu">
                            <Link to={`/profile/${auth?.user?._id}`} className="topbar-item topbar-profile">
                                <i className="fas fa-id-card-alt"></i>
                                <span>Thông tin cá nhân</span>
                            </Link>
                            {!auth?.user?.isAdmin && 
                                <Link to="/writepost" className="topbar-item topbar-blog">
                                    <i className="fas fa-marker"></i>
                                    <span>Viết báo</span>
                                </Link>}
                            <Link to="/postsaved"className="topbar-item topbar-saved">
                                <i className="fas fa-save"></i>
                                <span>Bài viết của bạn</span>
                            </Link>
                            <Link to="/work" className="topbar-item topbar-worker">
                                <i className="fas fa-th-list"></i>
                                <span>Công việc</span>
                            </Link>
                            <div className="topbar-item topbar-logout" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Đăng xuất</span>
                            </div>
                        </div>
                    </div> :
                    <div className="topbar-login">
                        <Link to="/login" className="topbar-login-link" >
                            <i className="fas fa-sign-in-alt" title="Đăng nhập"></i>
                        </Link>
                    </div>
                }

            </div>
        </div>
    )
}

export default Topbar;
