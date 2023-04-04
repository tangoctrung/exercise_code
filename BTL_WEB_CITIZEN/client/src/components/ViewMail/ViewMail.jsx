import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ViewMail.css';
import { noAvatar } from '../../api/urlApi';
import * as ACTIONS from "../../redux/constants/mailContant";
import moment from "moment";

function ViewMail() {

    const dispatch = useDispatch();
    const { mail } = useSelector(state => state);
    const mailOpen = mail.emailIsOpen;

    const handleBackListMail = () => {
        dispatch({type: ACTIONS.CLEAR_EMAIL_IS_OPEN});
    }

    return (
        <div className="viewMail">
            <div className="viewMail-top">
                <div className="viewMail-top-left">
                    <i 
                        className="fas fa-arrow-left" 
                        title="Quay lại"
                        onClick={handleBackListMail}
                    ></i>
                    <div className="viewMail-avatar">
                        <img src={mailOpen?.sender?.avatar ? mailOpen?.sender?.avatar : noAvatar} alt="avatar" />
                    </div>
                    <div className="viewMail-name">
                        <b>{mailOpen?.sender?.name}</b>
                        <p>{mailOpen?.sender?.accountName}</p>
                    </div>
                </div>
                <div className="viewMail-top-right">
                    <span>{moment(mailOpen?.createdAt).format("DD-MM-YYYY")}</span>
                </div>
            </div>
            <div className="viewMail-bottom">
                <div className="viewMail-title">
                    <h2>{mailOpen?.title}</h2>
                </div>
                <div className="viewMail-body">
                    <p>{mailOpen?.content}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewMail;
