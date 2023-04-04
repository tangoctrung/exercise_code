import React from 'react';
import './CardPerson.css';
import { noAvatar } from '../../api/urlApi';
import moment from 'moment';

function CardPerson({citizen}) {
    return (
        <div className="cardPerson">
            <div className="cardPerson-img">
                <img src={ citizen?.avatar ? citizen?.avatar : noAvatar} alt="avatar" />
            </div>
            <div className="cardPerson-info">
                <h4>{citizen?.name}</h4>
                <p><b>Ngày sinh:</b> {moment(citizen?.date).format("DD-MM-YYYY")}</p>
                <p><b>Quê quán:</b> {citizen?.hometownVillage + ", " + citizen?.hometownWard + ", " + citizen?.hometownDistrict + ", " + citizen?.hometownCity}</p>
                <p><b>Ngày khai báo:</b> {moment(citizen?.createdAt).format("DD-MM-YYYY")}</p>
            </div>
        </div>
    )
}

export default CardPerson;
