import React, { useEffect, useState } from 'react';
import ListMail from '../../../components/ListMail/ListMail';
import ViewMail from '../../../components/ViewMail/ViewMail';
import "./Mail.css";
import { dataMail } from '../../../data/dataDemo/dataMail';
import { useDispatch, useSelector } from 'react-redux';
import SendMail from '../../../components/SendMail/SendMail';
import * as ACTIONS from "../../../redux/constants/mailContant";
import { getAllMail } from "../../../redux/actions/mailAction";

function Mail() {

    const dispatch = useDispatch();
    const { auth, mail } = useSelector(state => state);

    const handleOpenSendMail = () => {
        dispatch({type: ACTIONS.OPEN_SEND_MAIL});
    }

    useEffect(() => {
        dispatch(getAllMail(auth?.accessToken));
        console.log(mail);
    }, [])

    const setIsMode = (s) => {
        if (s==="1") {
            dispatch({type: ACTIONS.VIEW_MAIL_SEND});
        } else {
            dispatch({type: ACTIONS.VIEW_MAIL_RECEIVE});
        }
    }

    return (
        <div className="mail">       
            <div className="mail-mode">
                <div className="mail-itemMode" onClick={() => setIsMode("1")}>
                    <p className={mail?.modeMail==="2" ? "" : "isActiveItemMode"}>Thư đã nhận</p>
                </div>
                <div className="mail-itemMode" onClick={() => setIsMode("2")}>
                    <p className={mail?.modeMail==="1" ? "" : "isActiveItemMode"}>Thư đã gửi</p>
                </div>
            </div> 
            {mail?.modeMail==="1" && 
                <div className="mail-content">
                    { !mail.emailIsOpen && 
                        <div className="mail-content-left">
                            {mail?.mailReceive?.length > 0 
                                ? <ListMail data={mail.mailReceive} />
                                :   <div className="mail-content-text">
                                        <p>Bạn không có thư nào.</p>
                                    </div>
                            }
                        </div>}
                    { mail.emailIsOpen && 
                        <div className="mail-content-right">
                            <ViewMail mail = {mail.emailIsOpen} />
                        </div>
                    }
                </div>}

            {mail?.modeMail==="2" && 
                <div className="mail-content">
                    { !mail.emailIsOpen && 
                        <div className="mail-content-left">
                            {mail?.mailSend?.length > 0 
                                ? <ListMail data={mail.mailSend} />
                                :   <div className="mail-content-text">
                                        <p>Bạn không có thư nào.</p>
                                    </div>
                            }
                        </div>}
                    { mail.emailIsOpen && 
                        <div className="mail-content-right">
                            <ViewMail mail = {mail.emailIsOpen} />
                        </div>
                    }
                </div>}

            <div className="iconSendMail">
                <div className="iconSendMail-content" onClick={handleOpenSendMail}>
                    <i className="fas fa-plus"></i>
                    <span>Soạn thư</span>
                </div>
                {mail.isOpenSendMail && 
                    <div className="iconSendMail-sendMail">
                        <SendMail />
                    </div>}
            </div>
        </div>
    )
}

export default Mail;
