import React from 'react';
import './ListMail.css';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTIONS from "../../redux/constants/mailContant";
import moment from "moment";
import { updateWatchedMail, deleteMail } from "../../redux/actions/mailAction";

function ListMail({data}) {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleOpenMail = (mail, index) => {
        dispatch(updateWatchedMail({userId: auth?.user?._id, mailId: mail?._id}, index, auth?.accessToken));
        dispatch({type: ACTIONS.EMAIL_IS_OPEN, payload: {
            mail: mail,
        }});
    }

    // khi người dùng delete mail
    const handleDeleteMail = (mail) => {
        dispatch(deleteMail({userId: auth?.user?._id, mailId: mail?._id}, auth?.accessToken));
    }

    return (
        <div className="listMail">
            {data.map((mail, index) => (
                <div key={index} className={mail?.watched?.includes(auth?.user?._id) ? "itemMail" : "itemMail isActiveItemMail"} >
                    <div className="itemMail-content" onClick={() => handleOpenMail(mail, index)}>
                        <div className="itemMail-sender">
                            <b>{mail?.sender?.name}</b>
                            <span>{mail?.sender?.accountName}</span>
                        </div>
                        <div className="itemMail-content">              
                            <span>
                                {mail?.content?.length > 100 ? mail?.content?.slice(0, 100) + '...' : mail?.content}
                            </span>
                        </div>
                        <div className="itemMail-time">              
                            <b>{moment(mail?.createdAt).format("DD-MM-YYYY")}</b>
                        </div>
                    </div>
                    <div className="itemMail-delete">
                        <i className="fas fa-trash" title="Xóa thư này" onClick={() => handleDeleteMail(mail)}></i>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListMail;
