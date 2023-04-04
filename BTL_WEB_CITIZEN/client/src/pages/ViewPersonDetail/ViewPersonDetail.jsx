import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router";
import './ViewPersonDetail.css';
import { getDataAPI } from "../../api/api";
import { noAvatar } from "../../api/urlApi";
import moment from "moment";

function ViewPersonDetail() {

    const { auth } = useSelector(state => state);
    const location = useLocation();
    const [citizenId, setCitizenId] = useState(location.pathname.split("/")[2]);
    const [citizen, setCitizen] = useState();

    useEffect( async ()=> {
        const res = await getDataAPI(`getcitizenid/${citizenId}`, auth?.accessToken);
        if (res.data.status) {
            setCitizen(res.data.data);
        }
    }, [citizenId])
    console.log();
    

    return (
        <div className="viewPersonDetail">
            <div className="viewPersonDetail-content">
                <div className="viewPersonDetail-info">
                    <div className="viewPersonDetail-img">
                        <img src={ citizen?.avatar ? citizen?.avatar : noAvatar} alt="avatar" />
                    </div>
                    <div className="viewPersonDetail-infoBasic">
                        <b>{citizen?.name}</b>
                        <p><b>Ngày sinh:</b> {moment(citizen?.date).format("DD-MM-YYYY")}</p>
                        <p><b>Giới tính: </b>{citizen?.gender}</p>
                        <p><b>Dân tộc: </b>{citizen?.nation}</p>
                        <p><b>Tôn giáo: </b>{citizen?.religion}</p>
                        <p><b>Học vấn: </b>{citizen?.education}</p>
                        <p><b>Số điện thoại: </b>{citizen?.phone || "Không có"}</p>
                        <p><b>Số CCCD: </b>{citizen?.numCCCD || "Không có"}</p>
                        <p><b>Email: </b>{citizen?.email || "Không có"}</p>
                        <p><b>Ngành nghề: </b>{citizen?.job || "Không có"}</p>
                        <p><b>Quê quán: </b>{citizen?.hometownVillage + ", " + citizen?.hometownWard + ", " + citizen?.hometownDistrict + ", " + citizen?.hometownCity}</p>
                        <p><b>Nơi ở hiện tại: </b>{citizen?.addressVillage + ", " + citizen?.addressWard + ", " + citizen?.addressDistrict + ", " + citizen?.addressCity}</p>
                    </div>
                </div>
                <div className="viewPersonDetail-infoDetail">
                    <h3>Thông tin chi tiết hơn</h3>
                    <div className="viewPersonDetail-infoDetailPerson">
                        <p>{citizen?.infoDetail || "Không có"}</p>
                    </div>
                </div>
                <div className="viewPersonDetail-infoFamily">
                    <h3>Thông tin về gia đình</h3>
                    <div className="viewPersonDetail-infoFamilyDetail">
                        <p>{citizen?.infoFamily || "Không có"}</p>
                    </div>
                </div>
                <p>--Hết--</p>
            </div>
        </div>
    )
}

export default ViewPersonDetail;
