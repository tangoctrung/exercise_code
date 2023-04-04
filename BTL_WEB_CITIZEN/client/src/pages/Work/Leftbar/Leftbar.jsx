import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTIONS from "../../../redux/constants/userContant";
import "./Leftbar.css";
import { noAvatar } from "../../../api/urlApi";

function Leftbar() {

    const dispatch = useDispatch();
    const { auth, user } = useSelector(state => state);
    const handleChangeWorkingMode = (s) => {
        dispatch({type: ACTIONS.WORKING_MODE, payload: {
            workingMode: s,
        }})
    }

    return (
        <div className="leftbar">
            <Link to={`/profile/${auth?.user?._id}`} className="leftbar-user">
                <img src={auth?.user?.avatar ? auth?.user?.avatar : noAvatar } alt="avatar" />
                <div className="leftbar-infoUser">
                    <span>{ auth?.user?.name }</span>
                    <p>{ auth?.user?.typeAccount === "A1" ? auth?.user?.position : "Công tác tại " + auth?.user?.position.split("tế ")[1]}</p>
                </div>
            </Link>
            <div className="leftbar-listMenu">
                { auth?.user?.typeAccount==="admin" &&
                    <>
                        <div 
                            className={`leftbar-item ${user.workingMode==='1' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope"></i>
                            <span>Hòm thư</span>
                        </div>
                    </>
                }

                { auth?.user?.typeAccount==="A1" &&
                    <>
                        <div 
                            className={`leftbar-item ${user.workingMode==='1' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope"></i>
                            <span>Hòm thư</span>
                        </div>
                        <div 
                            className={`leftbar-item ${user.workingMode==='2' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('2')}
                        >
                            <i className="fas fa-city" ></i>
                            <span>Khai báo, cấp mã</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='3' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('3')}
                        >
                            <i className="fas fa-user-plus"></i>
                            <span>Cấp tài khoản</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='4' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('4')}
                        >
                            <i className="fas fa-users"></i>
                            <span>Mở cuộc điều tra dân số</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='5' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('5')}
                        >
                            <i className="fas fa-chart-bar"></i>
                            <span>Xem tổng quan dân số</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='6' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('6')}
                        >
                            <i className="fas fa-user-tie"></i>
                            <span>Xem thông tin cá nhân</span>
                        </div>
                    
                    </>
                }

                { auth?.user?.typeAccount==="A2" &&
                    <>
                        <div 
                            className={`leftbar-item ${user.workingMode==='1' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope"></i>
                            <span>Hòm thư</span>
                        </div>
                        <div 
                            className={`leftbar-item ${user.workingMode==='2' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('2')}
                        >
                            <i className="fas fa-city" ></i>
                            <span>Khai báo, cấp mã</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='3' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('3')}
                        >
                            <i className="fas fa-user-plus"></i>
                            <span>Cấp tài khoản</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='4' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('4')}
                        >
                            <i className="fas fa-users"></i>
                            <span>Mở cuộc điều tra dân số</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='5' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('5')}
                        >
                            <i className="fas fa-chart-bar"></i>
                            <span>Xem tổng quan dân số</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='6' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('6')}
                        >
                            <i className="fas fa-user-tie"></i>
                            <span>Xem thông tin cá nhân</span>
                        </div>        
                    </>
                }

                { auth?.user?.typeAccount==="A3" &&
                    <>
                        <div 
                            className={`leftbar-item ${user.workingMode==='1' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope"></i>
                            <span>Hòm thư</span>
                        </div>
                        <div 
                            className={`leftbar-item ${user.workingMode==='2' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('2')}
                        >
                            <i className="fas fa-city" ></i>
                            <span>Khai báo, cấp mã</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='3' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('3')}
                        >
                            <i className="fas fa-user-plus"></i>
                            <span>Cấp tài khoản</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='4' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('4')}
                        >
                            <i className="fas fa-users"></i>
                            <span>Mở cuộc điều tra dân số</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='5' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('5')}
                        >
                            <i className="fas fa-chart-bar"></i>
                            <span>Xem tổng quan dân số</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='6' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('6')}
                        >
                            <i className="fas fa-user-tie"></i>
                            <span>Xem thông tin cá nhân</span>
                        </div>
                    
                    </>
                }

                { auth?.user?.typeAccount==="B1" &&
                    <>
                        <div 
                            className={`leftbar-item ${user.workingMode==='1' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope"></i>
                            <span>Hòm thư</span>
                        </div>
                        <div 
                            className={`leftbar-item ${user.workingMode==='2' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('2')}
                        >
                            <i className="fas fa-city" ></i>
                            <span>Khai báo, cấp mã</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='3' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('3')}
                        >
                            <i className="fas fa-user-plus"></i>
                            <span>Cấp tài khoản</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='4' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('4')}
                        >
                            <i className="fas fa-users"></i>
                            <span>Mở cuộc điều tra dân số</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='5' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('5')}
                        >
                            <i className="fas fa-chart-bar"></i>
                            <span>Xem tổng quan dân số</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='6' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('6')}
                        >
                            <i className="fas fa-user-tie"></i>
                            <span>Xem thông tin cá nhân</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='7' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('7')}
                            >
                            <i className="fas fa-print"></i>
                            <span>In phiếu</span>
                        </div>
                    
                    </>
                }

                { auth?.user?.typeAccount==="B2" && 
                    <>
                        <div 
                            className={`leftbar-item ${user.workingMode==='1' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope"></i>
                            <span>Hòm thư</span>
                        </div>                

                        <div 
                            className={`leftbar-item ${user.workingMode==='5' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('5')}
                        >
                            <i className="fas fa-chart-bar"></i>
                            <span>Xem tổng quan dân số</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='6' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('6')}
                        >
                            <i className="fas fa-user-tie"></i>
                            <span>Xem thông tin cá nhân</span>
                        </div>

                        <div 
                            className={`leftbar-item ${user.workingMode==='8' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('8')}
                        >
                            <i className="fas fa-file-import"></i>
                            <span>Nhập dữ liệu</span>
                        </div>
                    </>
                }          
                
            </div>
        </div>
    )
}

export default Leftbar;
