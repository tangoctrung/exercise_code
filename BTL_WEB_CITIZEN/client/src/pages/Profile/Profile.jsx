import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import Modal from '../../common/Modal/Modal';
import Topbar from '../../components/Topbar/Topbar';
import { dataNation } from '../../data/dataDemo/dataNation';
import { dataReligion } from '../../data/dataDemo/dataReligion';
import { updateUser } from "../../redux/actions/authAction";
import { changePassword } from "../../redux/actions/userAction";
import {storage} from '../../firebase';
import "./Profile.css";
import { noAvatar, urlApi } from "../../api/urlApi";
import moment from 'moment';
import { useLocation } from 'react-router';
import axios from 'axios';

function Profile() {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalPassword, setIsOpenModalPassword] = useState(false);
    const { auth, user } = useSelector(state => state);
    const location = useLocation();
    const [userId, setUserId] = useState(location?.pathname?.split("/")[2]);
    const [dataUser, setDataUser] = useState();
    const dispatch = useDispatch();
    const [state, setState] = useState({name: auth?.user?.name ? auth?.user?.name : '', phone: auth?.user?.phone ? auth?.user?.phone : '', 
        avatar: auth?.user?.avatar ? auth?.user?.avatar : noAvatar, date: auth?.user?.date ? moment(auth?.user?.date).format("YYYY-MM-DD") : '', 
        nation: auth?.user?.nation ? auth?.user?.nation : '', religion: auth?.user?.religion ? auth?.user?.religion : '', 
        gender: auth?.user?.gender ? auth?.user?.gender : '', address: auth?.user?.address ? auth?.user?.address : '', 
        hometown: auth?.user?.hometown ? auth?.user?.hometown : '', infoOther: auth?.user?.infoOther ? auth?.user?.infoOther : ''}); 
    const [file, setFile] = useState();
    const [statePass, setStatePass] = useState({
        password: '', oldPassword: '', confirmPassword: '',
        userId: auth?.user?._id,
    });
    
    useEffect(() =>{
        setState({name: auth?.user?.name ? auth?.user?.name : '', phone: auth?.user?.phone ? auth?.user?.phone : '', 
        avatar: auth?.user?.avatar ? auth?.user?.avatar : noAvatar, date: auth?.user?.date ? moment(auth?.user?.date).format("YYYY-MM-DD") : '', 
        nation: auth?.user?.nation ? auth?.user?.nation : '', religion: auth?.user?.religion ? auth?.user?.religion : '', 
        gender: auth?.user?.gender ? auth?.user?.gender : '', address: auth?.user?.address ? auth?.user?.address : '', 
        hometown: auth?.user?.hometown ? auth?.user?.hometown : '', infoOther: auth?.user?.infoOther ? auth?.user?.infoOther : ''});
    }, [ auth?.user])

    // lấy info user từ userId
    useEffect(() => {
        if (auth?.user?._id === userId) {
            setDataUser(auth?.user);
        } else {
            const fetchUser = async () => {
                const res = await axios.get(urlApi + `/getauser/${userId}`, {
                    headers: {
                        Authorization: 'Bearer ' + auth?.accessToken
                    }
                })
                if (res.data.status) {
                    setDataUser(res.data.user);
                }
            }
            fetchUser();
        }
    }, [userId, location]);

    // khi người dùng chọn avatar
    const handleChooseAvatar = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file) {
            const uploadTask = storage.ref(`avatar/${auth?.user?._id}/${file.name}`).put(file);
            console.log("loading");
            uploadTask.on('state_changed', 
                (snapshot) => {}, 
                (error) => { alert(error)}, 
                () => {
                    // complete function ....
                    storage.ref(`avatar/${auth?.user?._id}`).child(file.name).getDownloadURL().then(url => {
                        console.log(url);
                        setState({
                            ...state,
                            avatar: url,
                        });
                    })
                });
        }
    }

    // khi người dùng thay đổi thông tin 
    const handleChangeInfo = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    // khi người dùng submit
    const handleUpdateInfo = (e) => {
        e.preventDefault();
        dispatch(updateUser(state, auth?.user?._id, auth.accessToken));
    }

    // khi người dùng thay đổi mật khẩu 
    const handleChange = (e) => {
        setStatePass({
            ...statePass,
            [e.target.name]: e.target.value,
        })
    }

    // khi người dùng xác nhận thay đổi password
    const handleClickChangePassword = (e) => {
        e.preventDefault();
        dispatch(changePassword(statePass, auth?.accessToken));
    }
    
    return (
        <div className="profile">
            <div className="profile-top">
                <Topbar />
            </div>
            <div className="profile-bottom">
                <div className="profile-content">
                    <h1>Thông tin cá nhân</h1>
                    {auth?.user?._id === userId && 
                        <div className="profile-optionEdit">
                            <i className="fas fa-cog" title="Chỉnh sửa"></i>
                            <div className="profile-optionList">
                                <div className="profile-optionItem" onClick={()=> setIsOpenModalPassword(true)}>
                                    <i className="fas fa-key" 
                                    ></i>
                                    <span> Thay đổi mật khẩu</span>
                                </div>
                                <div className="profile-optionItem" onClick={()=> setIsOpenModal(true)}>
                                    <i 
                                        className="fas fa-user-edit"                            
                                    ></i>
                                    <span> Sửa thông tin</span>
                                </div>
                            </div>
                        </div>}
                    <div className="profile-infoBasic">
                        <h3>Thông tin cơ bản</h3>
                        <div className="profile-infoBasic-content">
                            <div className="profile-infoBasic-img">
                                <img src={dataUser?.avatar ? dataUser?.avatar : noAvatar} alt="avatar" />
                            </div>
                            <div className="profile-infoBasic-listInfo">
                                <p><b>Họ và tên: </b> {dataUser?.name ? dataUser?.name : "Anonymous"}</p>
                                <p><b>Chức vụ: </b> {dataUser?.position ? dataUser?.position : "Anonymous"}</p>
                                <p><b>Ngày sinh: </b> {dataUser?.date ? moment(dataUser?.date).format("DD-MM-YYYY") : "Anonymous"}</p>
                                <p><b>Giới tính: </b> {dataUser?.gender ? dataUser?.gender : "Anonymous"}</p>
                                <p><b>Dân tộc: </b> {dataUser?.nation ? dataUser?.nation : "Anonymous"}</p>
                                <p><b>Tôn giáo: </b> {dataUser?.religion ? dataUser?.religion : "Anonymous"}</p>
                                <p><b>SĐT: </b> {dataUser?.phone ? dataUser?.phone : "Anonymous"}</p>
                                <p><b>Nơi ở: </b>{dataUser?.address ? dataUser?.address : "Anonymous"}</p>
                                <p><b>Quên quán: </b>{dataUser?.hometown ? dataUser?.hometown : "Anonymous"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-infoOther">
                        <h3>Thông tin khác</h3>
                        <div className="profile-infoOther-content">
                            <p>{dataUser?.infoOther ? dataUser?.infoOther : "Anonymous"}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
                <form className="modal-profile" onSubmit={handleUpdateInfo}>
                    <h2>Chỉnh sửa thông tin</h2>
                    <div className="modal-profile-content">
                        <div className="modal-profile-infoBasic">
                            <label htmlFor="chooseAvatar" className="modal-profile-img">
                                {/* <img src={noAvatar} alt="avatar" /> */}
                                {auth?.user?.avatar && <img src={state.avatar ? state.avatar : (auth?.user?.avatar)} alt="avatar" title="Bấm vào đây để thay đổi avatar"/>}
                                {!auth?.user?.avatar && <img src={state.avatar ? state.avatar : noAvatar} alt="avatar" title="Bấm vào đây để thay đổi avatar"/>}
                                <input type="file" hidden id="chooseAvatar" onChange={handleChooseAvatar} />
                            </label>
                            <div className="modal-profile-info">
                                <p><b>Họ và tên:</b><input type="text" name="name" value={state.name} onChange={handleChangeInfo} /></p>
                                <p><b>Ngày sinh:</b><input type="date" name="date" value={state.date} onChange={handleChangeInfo} /></p>
                                <p>
                                    <b>Giới tính: </b>
                                    <input type="text" list="gioitinh" name="gender" value={state.gender} onChange={handleChangeInfo} />
                                    <datalist id="gioitinh">
                                        <option key={1} value="Nam"></option>
                                        <option key={2} value="Nữ"></option>
                                        <option key={3} value="Khác"></option>
                                    </datalist>
                                </p>
                                <p>
                                    <b>Dân tộc: </b>
                                    <input type="text" list="dantoc" name="nation" value={state.nation} onChange={handleChangeInfo} />
                                    <datalist id="dantoc">
                                        {dataNation.map((item, index) => (
                                            <option key={index} value={item.name}></option>
                                        ))}
                                    </datalist>
                                </p>
                                <p>
                                    <b>Tôn giáo: </b>
                                    <input type="text" list="tongiao" name="religion" value={state.religion} onChange={handleChangeInfo} />
                                    <datalist id="tongiao">
                                        {dataReligion.map((item, index) => (
                                            <option key={index} value={item.name}></option>
                                        ))}
                                    </datalist>
                                </p>
                                <p><b>SĐT:</b><input type="text" name="phone" value={state.phone} onChange={handleChangeInfo} /></p>
                                <p><b>Nơi ở:</b><input type="text" name="address" value={state.address} onChange={handleChangeInfo} /></p>
                                <p><b>Quê quán:</b><input type="text" name="hometown" value={state.hometown} onChange={handleChangeInfo} /></p>
                            </div>
                        </div>
                        <div className="modal-profile-infoOther">
                            <p>
                                <b>Thông tin khác</b>
                                <textarea name="infoOther" value={state.infoOther} onChange={handleChangeInfo} ></textarea>
                            </p>
                        </div>
                    </div>
                    <div className="modal-profile-button">
                        <Button 
                            typeButton="normal" 
                            height={45} width={130} 
                            text="Xác nhận" 
                            onClick={handleUpdateInfo} 
                        />
                    </div>
                </form>
            </Modal>

            <Modal isOpenModal={isOpenModalPassword} setIsOpenModal={setIsOpenModalPassword}>
                <div className="profile-modalPassword">
                    <h3>Thay đổi mật khẩu</h3>
                    <input 
                        type="password" 
                        placeholder="Mật khẩu cũ" 
                        autoComplete="off" 
                        name="oldPassword" 
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        placeholder="Mật khẩu mới" 
                        autoComplete="off" 
                        name="password" 
                        onChange={handleChange}
                        />
                    <input 
                        type="password" 
                        placeholder="Nhập lại mật khẩu mới" 
                        autoComplete="off" 
                        name="confirmPassword" 
                        onChange={handleChange}
                        />
                    <p>{user?.messageError ? user.messageError : ""}</p>
                    <div className="profile-modalButton">
                        <Button typeButton="normal" width={120} height={45} text="Xác nhận" onClick={handleClickChangePassword} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Profile;
