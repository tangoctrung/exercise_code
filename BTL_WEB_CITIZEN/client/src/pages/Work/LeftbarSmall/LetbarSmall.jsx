import React from 'react';
import './LeftbarSmall.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTIONS from "../../../redux/constants/userContant";
import { noAvatar } from "../../../api/urlApi";

function LetbarSmall() {

    const dispatch = useDispatch();
    const { auth, user } = useSelector(state => state);
    const handleChangeWorkingMode = (s) => {
        dispatch({type: ACTIONS.WORKING_MODE, payload: {
            workingMode: s,
        }})
    }

    return (
        <div className="leftbarSmall">
            <Link to={`/profile/${auth?.user?._id}`} className="leftbarSmall-user">
                <img src={auth?.user?.avatar ? auth?.user?.avatar : noAvatar} alt="avatar" />
            </Link>
            <div className="leftbarSmall-listMenu">
                { auth?.user?.typeAccount==="admin" &&
                    <>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='1' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope" title="Hòm thư"></i>
                        </div>
                    </>
                }

                { auth?.user?.typeAccount==="A1" &&
                    <>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='1' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope" title="Hòm thư"></i>
                        </div>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='2' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('2')}
                        >
                            <i className="fas fa-city" title="Khai báo, cấp mã" ></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='3' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('3')}
                        >
                            <i className="fas fa-user-plus" title="Cấp tài khoản"></i>
                        </div>

                        <div 
                        className={`leftbarSmall-item ${user.workingMode==='4' ? 'leftbarSmall-item-isActive' : ''}`}
                        onClick={() => handleChangeWorkingMode('4')}
                        >
                            <i className="fas fa-users" title="Mở cuộc điều tra dân số"></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='5' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('5')}
                        >
                            <i className="fas fa-chart-bar" title="Xem tổng quan dân số"></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='6' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('6')}
                        >
                            <i className="fas fa-user-tie" title="Xem thông tin cá nhân"></i>
                        </div>
                    
                    </>
                }

                { auth?.user?.typeAccount==="A2" &&
                    <>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='1' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope" title="Hòm thư"></i>
                        </div>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='2' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('2')}
                        >
                            <i className="fas fa-city" title="Khai báo, cấp mã" ></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='3' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('3')}
                        >
                            <i className="fas fa-user-plus" title="Cấp tài khoản"></i>
                        </div>

                        <div 
                        className={`leftbarSmall-item ${user.workingMode==='4' ? 'leftbarSmall-item-isActive' : ''}`}
                        onClick={() => handleChangeWorkingMode('4')}
                        >
                            <i className="fas fa-users" title="Mở cuộc điều tra dân số"></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='5' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('5')}
                        >
                            <i className="fas fa-chart-bar" title="Xem tổng quan dân số"></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='6' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('6')}
                        >
                            <i className="fas fa-user-tie" title="Xem thông tin cá nhân"></i>
                        </div>
                    
                    </>
                }

                { auth?.user?.typeAccount==="A3" &&
                    <>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='1' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope" title="Hòm thư"></i>
                        </div>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='2' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('2')}
                        >
                            <i className="fas fa-city" title="Khai báo, cấp mã" ></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='3' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('3')}
                        >
                            <i className="fas fa-user-plus" title="Cấp tài khoản"></i>
                        </div>

                        <div 
                        className={`leftbarSmall-item ${user.workingMode==='4' ? 'leftbarSmall-item-isActive' : ''}`}
                        onClick={() => handleChangeWorkingMode('4')}
                        >
                            <i className="fas fa-users" title="Mở cuộc điều tra dân số"></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='5' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('5')}
                        >
                            <i className="fas fa-chart-bar" title="Xem tổng quan dân số"></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='6' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('6')}
                        >
                            <i className="fas fa-user-tie" title="Xem thông tin cá nhân"></i>
                        </div>
                    
                    </>
                }

                { auth?.user?.typeAccount==="B1" &&
                    <>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='1' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope" title="Hòm thư"></i>
                        </div>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='2' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('2')}
                        >
                            <i className="fas fa-city" title="Khai báo, cấp mã" ></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='3' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('3')}
                        >
                            <i className="fas fa-user-plus" title="Cấp tài khoản"></i>
                        </div>

                        <div 
                        className={`leftbarSmall-item ${user.workingMode==='4' ? 'leftbarSmall-item-isActive' : ''}`}
                        onClick={() => handleChangeWorkingMode('4')}
                        >
                            <i className="fas fa-users" title="Mở cuộc điều tra dân số"></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='5' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('5')}
                        >
                            <i className="fas fa-chart-bar" title="Xem tổng quan dân số"></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='6' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('6')}
                        >
                            <i className="fas fa-user-tie" title="Xem thông tin cá nhân"></i>
                        </div>

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='7' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('7')}
                            >
                            <i className="fas fa-print" title="In phiếu khai báo dân số"></i>
                        </div>
                    
                    </>
                }

                { auth?.user?.typeAccount==="B2" && 
                    <>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='1' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('1')}
                        >
                            <i className="fas fa-envelope" title="Hòm thư"></i>
                        </div>                

                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='5' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('5')}
                        >
                            <i className="fas fa-chart-bar" title="Xem tổng quan dân số"></i>
                        </div>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='6' ? 'leftbarSmall-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('6')}
                        >
                            <i className="fas fa-user-tie" title="Xem thông tin cá nhân"></i>
                        </div>
                        <div 
                            className={`leftbarSmall-item ${user.workingMode==='8' ? 'leftbar-item-isActive' : ''}`}
                            onClick={() => handleChangeWorkingMode('8')}
                        >
                            <i className="fas fa-file-import"></i>
                        </div>
                    </>
                }                               
            </div>
        </div>
    )
}

export default LetbarSmall;
