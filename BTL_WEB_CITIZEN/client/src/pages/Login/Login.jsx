import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { login } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from 'react-redux';
import Button from "../../common/Button/Button";
import Slider from "react-slick";
import * as ACTIONS from "../../redux/constants/authContant";
import ImgLogin1 from "../../data/images/login_danso_1.jpg";
import ImgLogin2 from "../../data/images/login_danso_2.jpg";
import ImgLogin3 from "../../data/images/login_danso_3.jpg";
import ImgLogin4 from "../../data/images/login_danso_4.jpg";
import ImgLogin5 from "../../data/images/login_danso_5.png";
import NavbarLogin from '../../components/NavbarLogin/NavbarLogin';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(state => state);
    const [state, setState] = useState({ email: '', password: '', position: '' });
    const { email, password, position } = state;

    const settings = {
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({email, password, position}));
        }
    }

    useEffect(() => {
        if (auth.accessToken) {
            navigate("/work");
        }
    }, [auth.accessToken, navigate]);

    setTimeout(() => {
        if (auth.messageLogin) {
            dispatch({type: ACTIONS.CLEAR_MESSAGE});
        }
    }, 3000)

    return (
        <div className="login">
            <div className="login-top">
                <NavbarLogin />
            </div>

            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <h1>Đăng nhập</h1>
                    <p>Hãy đăng nhập vào hệ thống bằng thông tin yêu cầu dưới đây</p>
                    <div className="inputLogin inputEmailLogin">
                        <i className="fas fa-envelope" title="Email"></i>
                        <input 
                            name="email" 
                            onChange={handleChange} 
                            placeholder="Nhập tên tài khoản của bạn" 
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="inputLogin inputPasswordLogin">
                        <i className="fas fa-lock" title="Mật khẩu"></i>
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleChange} 
                            placeholder="Nhập password của bạn" 
                            required
                        />
                    </div>
                    {/* <div className="inputSelectLogin">
                        <label>Đăng nhập với tư cách</label>
                        <select required onChange={handleChange} name="position">
                            <option value=""></option>
                            <option value="admin">Admin</option>
                            <option value="A1">A1 (Tổng cục Dân số thuộc Bộ Y tế)</option>
                            <option value="A2">A2 (Chi cục dân số thuộc Sở Y tế các tỉnh/thành phố)</option>
                            <option value="A3">A3 (Công chức thực hiện công tác dân số tại Phòng Y tế các huyện/quận)</option>
                            <option value="B2">B1 (Viên chức dân số thuộc Trạm Y tế xã/phường)</option>
                            <option value="B3">B2 (Cộng tác viên dân số tại các thôn, bản, tổ dân phố)</option>
                            <option value="citizen">Người dân</option>
                        </select>
                    </div> */}
                    <p 
                        className={!auth.messageLogin ? "loginCorrect" : "loginCorrect loginCorrectShow"}
                    >
                        {auth.messageLogin ? auth.messageLogin : "Email hoặc password bị sai."}
                    </p>
                    <div className="login-button">
                        <Button typeButton="black-white" width={200} height={60} text="Đăng nhập" fontSize={20} />
                    </div>
                    {/* <p>Bạn chưa có tài khoản? Hãy đăng kí 
                        <Link to="/register"><strong>tại đây</strong></Link>
                    </p> */}
                </form>  
                <div className="login-slider-text">
                    {/* <p>Một số thông tin về dân số Việt Nam.</p> */}
                    <div className="login-slider"> 
                        <Slider {...settings}>
                            <div className="login-slider-img">
                                <img src={ImgLogin1} alt="img" />
                            </div>
                            <div className="login-slider-img">
                                <img src={ImgLogin2} alt="img" />
                            </div>
                            <div className="login-slider-img">
                                <img src={ImgLogin3} alt="img" />
                            </div>
                            <div className="login-slider-img">
                                <img src={ImgLogin4} alt="img" />
                            </div>
                            <div className="login-slider-img">
                                <img src={ImgLogin5} alt="img" />
                            </div>
                        </Slider>
                    </div>       
                </div>
            </div>
        </div>
    )
}

export default Login;
