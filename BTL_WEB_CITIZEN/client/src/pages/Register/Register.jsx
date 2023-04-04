import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import NavbarLogin from '../../components/NavbarLogin/NavbarLogin';
import { register } from '../../redux/actions/authAction';
import * as ACTIONS from "../../redux/constants/authContant";
import "./Register.css";

function Register() {
    const dispatch = useDispatch();

    const { auth } = useSelector(state => state);

    const [state, setState] = useState({
        lastName: '', bufferName: '', firstName: '', 
        date: null, gender: '', numCCCD: '', phone: '', email: '', password: '',
    });

    // const {lastName, bufferName, firstName, date, gender, numCCCD, phone, email, password} = state;

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(state));
    }

    setTimeout(() => {
        if (auth.messageRegister) {
            dispatch({type: ACTIONS.CLEAR_MESSAGE});
        }
    }, 3000);

    return (
        <div className="register">
            <div className="register-top">
                <NavbarLogin />
            </div>
            <div className="register-bottom">
                <form className="register-form" onSubmit={handleRegister}>
                    <h1>Đăng kí</h1>
                    <p>Hãy đăng kí tài khoản để giúp việc thống kê dân số trở lên dễ dàng hơn</p>
                    
                    <div className="inputRegister inputNameRegister">
                        <p>Họ và tên: </p>
                        <div className="inputNameContentRegister">
                            <input 
                                type="text" 
                                name="lastName" 
                                onChange={handleChange} 
                                placeholder="Họ" 
                                required
                                autoComplete="off"
                            />
                            <input 
                                type="text" 
                                name="bufferName" 
                                onChange={handleChange} 
                                placeholder="Tên đệm" 
                                required
                                autoComplete="off"
                            />
                            <input 
                                type="text" 
                                name="firstName" 
                                onChange={handleChange} 
                                placeholder="Tên" 
                                required
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="inputRegister inputDateRegister">
                        <p>Ngày sinh: </p>
                        <input 
                            type="date" 
                            name="date" 
                            onChange={handleChange} 
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="inputRegister inputGenderRegister">
                        <p>Giới tính: </p>
                        <input 
                            type="radio" 
                            name="gender" 
                            value="Nam"
                            onChange={handleChange} 
                            required
                            autoComplete="off"
                        /> <span>Nam</span>
                        <input 
                            type="radio" 
                            name="gender" 
                            value="Nữ"
                            onChange={handleChange} 
                            required
                            autoComplete="off"
                        /> <span>Nữ</span>
                        <input 
                            type="radio" 
                            name="gender" 
                            value="other"
                            onChange={handleChange} 
                            required
                            autoComplete="off"
                        /> <span>Khác</span>
                    </div>
                    <div className="inputRegister inputnumCCCDRegister">
                        <p>Số CCCD/CMND: </p>
                        <input 
                            type="text" 
                            name="numCCCD" 
                            onChange={handleChange} 
                            placeholder="Ví dụ: 032485720913" 
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="inputRegister inputPhoneRegister">
                        <p>Số điện thoại: </p>
                        <input 
                            type="text" 
                            name="phone" 
                            onChange={handleChange} 
                            placeholder="Ví dụ: 0345986832" 
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="inputRegister inputEmailRegister">
                        <p>Email: </p>
                        <input 
                            type="email" 
                            name="email" 
                            onChange={handleChange} 
                            placeholder="ví dụ: abc@gmail.com" 
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="inputRegister inputPasswordRegister">
                        <p>Mật khẩu: </p>
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleChange} 
                            placeholder="Nhập password của bạn" 
                            required
                        />
                    </div>
                    <div className="register-form-text">
                        <p className={auth.messageRegister ? "showError" : "hideError"}>
                            {auth.messageRegister ? auth.messageRegister : "Lỗi thông tin"}
                        </p>
                    </div>
                    <div className="register-form-button">
                        <Button typeButton="black-white" width={200} height={60} text="Đăng ký" fontSize={20} />
                    </div>
                    <div className="register-form-text">
                        <p>Bạn đã có tài khoản? Hãy đăng nhập  
                            <Link to="/login" className="register-form-login" >tại đây</Link>
                        </p>
                    </div>
                </form>
                <div className="register-bottom-info">
                    <h2>Một vài lưu ý khi đăng ký, sử dụng hệ thống:</h2>
                    <ol>
                        <li>Hãy điền đầy đủ thông tin mà hệ thống yêu cầu khi đăng ký tài khoản.</li>
                        <li>Nếu bạn là cán bộ thì khi đăng ký tài khoản xong, đăng nhập vào hệ thống và gửi mail cho admin để yêu cầu cấp quyền tương ứng với chức vụ của bạn.</li>
                        <li>Hệ thống được tạo ra nhằm mục đích điều tra, thống kê và phân tích dân số của Việt Nam, ngoài ra không phục vụ bất kỳ điều gì khác, nếu bạn có những hành động không thuộc quy định của hệ thống (như quảng cáo trái phép, đánh cắp dữ liệu, ..) thì bạn sẽ hoàn toàn chịu trách nhiệm trước pháp luật.</li>
                        <li>Hãy thực hiện nghiêm chỉnh các qui định của hệ thống, trung thực kê khai thông tin của bản thân.</li>
                        <li>Mọi dữ liệu của bạn trong hệ thống đều được bảo mật tuyệt đối nên bạn hãy yên tâm về điều này.</li>
                    </ol>
                    <b>Xin chân thành cảm ơn!!!</b>
                </div>
            </div>
        </div>
    )
}

export default Register;
