import React, { useEffect, useState } from 'react';
import './SendMail.css';
import Button from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTIONS from "../../redux/constants/mailContant";
import { sendMail, getMail, getAllUser } from "../../redux/actions/mailAction";

function SendMail() {


    const dispatch = useDispatch();
    const { auth, mail, socket } = useSelector(state => state);
    const [state, setState] = useState({title: "", content: '', sender: `${auth?.user?._id}`, receiver: []})
    const handleCloseSendMail = () => {
        dispatch({type: ACTIONS.CLOSE_SEND_MAIL});
    }
    useEffect(() => {
        socket?.socket?.emit("addUser", {
            userId: auth?.user?._id, 
            typeAccount: auth?.user?.typeAccount, 
            accountName: auth?.user?.accountName
        });
        socket?.socket?.on("getUser", (users) => {
            console.log(users);
        });
    }, [auth?.user?._id])
    // khi người dùng nhập mail
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    // khi người dùng chọn người nhận
    const handleChangeId = (e) => {
        let id = [];
        id.push(e.target.value);
        setState({
            ...state,
            receiver: [...id],
        })
    }
    //khi người dùng gửi mail
    const handleClickSendMail = (e) => {
        e.preventDefault();
        dispatch(sendMail(state, socket?.socket, auth?.accessToken));
    }

    // nhận mail
    useEffect(() => {
        dispatch(getMail(socket?.socket));
        dispatch(getAllUser(auth?.accessToken));
    }, [])


    return (
        <form className="sendMail" onSubmit={handleClickSendMail}>
            <div className="sendMail-top">
                <b>Soạn thư mới</b>
                <i className="fas fa-times" onClick={handleCloseSendMail}></i>
            </div>
            <div className="sendMail-receiver">
                <div className="sendMail-sendOne">
                    <input 
                        type="email" list="listUser" 
                        placeholder="Nhập accountName của người nhận" 
                        onChange={handleChangeId}
                        required multiple 
                    />
                    <datalist id="listUser">
                        {mail?.users && mail?.users.map((user)=> (
                            <option value={user?._id}>{user?.name || "Anonymous"} - {user?.accountName} - {user?.position}</option>
                        ))}
                    </datalist>
                </div>
            </div>
            <div className="sendMail-body">
                <div className="sendMail-title">
                    <input type="text" placeholder="Nhập tiêu đề của thư" name="title" onChange={handleChange} />
                </div>
                <div className="sendMail-content">
                    <textarea placeholder="Nhập nội dung thư" required name="content" onChange={handleChange} />

                </div>
            </div>
            <div className="sendMail-buttonSend">
                <Button typeButton="upload" width={100} height={40} text="Gửi" onClick={handleClickSendMail} />
            </div>
        </form>
    )
}

export default SendMail;
