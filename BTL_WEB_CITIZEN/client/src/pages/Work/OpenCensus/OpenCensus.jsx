import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../common/Button/Button';
import Modal from '../../../common/Modal/Modal';
import "./OpenCensus.css";
import { getCodeNameOpenCensus, getCitizenCodename, completeCensus,
    checkTimeCensus, openCensusTime, editCensusTime } from "../../../redux/actions/openCensusAction";
import moment from "moment";
import { urlClient } from '../../../api/urlApi';
import * as ACTIONS from "../../../redux/constants/openCensusContant";

function OpenCensus() {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const dispatch = useDispatch();
    const { auth, openCensus } = useSelector(state => state);
    const [isOpenModalDetail, setIsOpenModalDetail] = useState(false); 
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalComplete, setIsOpenModalComplete] = useState(false);
    const [codeName, setCodeName] = useState();
    const [time, setTime] = useState({ timeOpen: null, timeClose: null });

    const handleShowModal = () => {
        setIsOpenModal(true);
    }

    useEffect(() => {
        if (auth?.user?.typeAccount==="A1") {
            dispatch(getCodeNameOpenCensus("00", auth?.accessToken));
        } else {
            dispatch(getCodeNameOpenCensus(auth?.user?.accountName, auth?.accessToken));
        }
        dispatch(checkTimeCensus(auth?.accessToken));
    }, [])

    // khi người dùng click vào xem địa phương được khai báo 
    const handleChooseCode = (codeId) => {
        dispatch(getCodeNameOpenCensus(codeId, auth?.accessToken));
    }

    // khi người dùng bấm reload lại xem tiến độ khai báo dân số
    const handleReload = () => {
        if (auth?.user?.typeAccount==="A1") {
            dispatch(getCodeNameOpenCensus("00", auth?.accessToken));
        } else {
            dispatch(getCodeNameOpenCensus(auth?.user?.accountName, auth?.accessToken));
        }
    }

    // khi người dùng click xem chi tiết từng vùng
    const handleClickDetail = (codeName, level) => {
        setCodeName(codeName);
        setIsOpenModalDetail(true);
        dispatch(getCitizenCodename(codeName, level, auth?.accessToken));
    }

    // khi người dùng xem 1 citizen
    const handleClickPerson = (id) => {
        window.open(urlClient + `viewpersondetail/${id}`);
    }
    // khi người dùng thay đổi thời gian mở cuộc khảo sát dân số
    const handleChangeTime = (e) => {
        dispatch({type: ACTIONS.CLEAR_MESSAGE});
        setTime({
            ...time,
            [e.target.name]: e.target.value,
        })
    }

    // khi người dùng submit mở cuộc khảo sát dân số
    const handleOpenCensus = () => {
        dispatch(openCensusTime(auth?.user, time, auth?.accessToken));
    }
    // khi người dùng mở modal chỉnh sửa thời gian khảo sát dân số
    const handleOpenModalEditTime = () => {
        dispatch({type: ACTIONS.CLEAR_MESSAGE});
        setIsOpenModalEdit(true);
    }
    // khi người dùng submit chỉnh sửa lại thời gian khảo sát dân số
    const handleEditOpenCensus = () => {
        dispatch(editCensusTime(setIsOpenModalEdit ,time, auth?.accessToken));
    }
    // open modal completeCensus
    const handleOpenModalComplete = () => {
        dispatch({type: ACTIONS.CLEAR_MESSAGE});
        setIsOpenModalComplete(true);
    }
    //khi người dùng hoàn thành cuộc khảo sát dân số
    const handleComleteOpenCensus = () => {
        dispatch(completeCensus(setIsOpenModalComplete, auth?.accessToken));
    }



    return (
        <div className="openCensus">
            <div className="openCensus-top">
                <h3>Cấp quyền khai báo dân số</h3>
                <div className="openCensus-top-container">
                    {!openCensus.statusCensus ?
                        <div className="openCensus-top-content">
                            <div className="openCensus-content-timeOpen">
                                <label>Thời gian mở :</label>
                                <input type="date" name="timeOpen" onChange={handleChangeTime}/>
                            </div>
                            <div className="openCensus-content-timeClose">
                                <label>Thời gian đóng :</label>
                                <input type="date" name="timeClose" onChange={handleChangeTime} />
                            </div>
                            <div className="openCensus-content-buttonText">
                                {openCensus?.error !=="" ?
                                    <p >{openCensus?.error} <b onClick={handleShowModal} >Xem thêm</b></p>
                                    : ""}
                                <div className="openCensus-content-listButton">
                                    <Button 
                                        typeButton="normal" 
                                        width={120} 
                                        height={45} 
                                        text="Xác nhận" 
                                        borderRadius={30}
                                        onClick={handleOpenCensus}
                                    />
                                </div>
                            </div>
                            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
                                <div className="modal-provideCode-text">
                                    <h2>Chi tiết lỗi</h2>
                                    <p>{openCensus?.errorDetail}</p>
                                </div>
                            </Modal>
                        </div> :
                        <div className="openCensus-top-content">
                            <h3>Cuộc khai báo dân số đang diễn ra.</h3>
                            <div className="openCensus-open-timeOpen openCensus-open-time">
                                <label>Thời gian mở : <b>{openCensus?.timeOpen}</b></label>                              
                            </div>
                            <div className="openCensus-open-timeClose openCensus-open-time">
                                <label>Thời gian đóng : <b>{openCensus?.timeClose}</b></label>  
                            </div>
                            <div className="openCensus-open-buttonText">
                                <div className="openCensus-open-itemButton">
                                    <Button 
                                        typeButton="normal" 
                                        width={120} 
                                        height={45} 
                                        text="Chỉnh sửa" 
                                        borderRadius={30}
                                        onClick={handleOpenModalEditTime}
                                    />
                                </div>
                                {auth?.user?.typeAccount !== "A1" && 
                                    <div className="openCensus-open-itemButton">
                                        <Button 
                                            typeButton="normal" 
                                            width={120} 
                                            height={45} 
                                            text="Hoàn thành" 
                                            borderRadius={30}
                                            onClick={handleOpenModalComplete}
                                        />
                                    </div>}
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="openCensus-bottom">
                <h3>Theo dõi tiến độ</h3>
                <div className="openCensus-bottom-button">
                    <Button typeButton="reload" width={120} height={40} text="Tải lại" onClick={handleReload} />
                </div>
                <div className="openCensus-bottom-container">

                    { auth?.user?.typeAccount ==="A1" &&
                        <div className="openCensus-bottom-itemTable">
                            <div className="openCensus-bottom-itemTable-title">
                                <p>Tỉnh (Thành phố)</p>
                            </div>
                            <div className="openCensus-listLocalName">
                                { openCensus?.city.length > 0   && openCensus?.city.map((city, index) => (
                                    <div className="openCensus-itemLocalName" key={index}>
                                        <div 
                                        className="openCensus-itemLocalName-content"
                                        onClick={()=> handleChooseCode(city?.code)} 
                                        >
                                            <b>{index+1}. {city?.name} - {city?.code}</b>
                                            {city?.isComplete && <i className="fas fa-check"></i>}
                                        </div>
                                        <b onClick={()=> handleClickDetail(city?.name, "Tỉnh")}>Chi tiết</b>
                                    </div>
                                )) }                                                                    
                            </div>
                            
                        </div>}

                    { ["A1", "A2"].includes(auth?.user?.typeAccount) &&
                        <div className="openCensus-bottom-itemTable">
                            <div className="openCensus-bottom-itemTable-title">
                                <p>Huyện (Quận)</p>
                            </div>
                            <div className="openCensus-listLocalName">
                                { openCensus?.district.length > 0   ? openCensus?.district.map((district, index) => (
                                    <div className="openCensus-itemLocalName" key={index}>
                                        <div 
                                        className="openCensus-itemLocalName-content"
                                        onClick={()=> handleChooseCode(district?.code)} 
                                        >
                                            <b>{index+1}. {district?.name} - {district?.code}</b>
                                            {district?.isComplete && <i className="fas fa-check"></i>}
                                        </div>
                                        <b onClick={()=> handleClickDetail(district?.name, "Huyện")}>Chi tiết</b>
                                    </div>
                                )) : <p>Không có dữ liệu.</p>}                                   
                            </div>
                            
                        </div>}

                    { ["A1", "A2", "A3"].includes(auth?.user?.typeAccount) &&
                        <div className="openCensus-bottom-itemTable">
                            <div className="openCensus-bottom-itemTable-title">
                                <p>Xã (Phường)</p>
                            </div>
                            <div className="openCensus-listLocalName">
                                { openCensus?.ward.length > 0   ? openCensus?.ward.map((ward, index) => (
                                    <div className="openCensus-itemLocalName" key={index}>
                                        <div 
                                        className="openCensus-itemLocalName-content"
                                        onClick={()=> handleChooseCode(ward?.code)} 
                                        >
                                            <b>{index+1}. {ward?.name} - {ward?.code}</b>
                                            {ward?.isComplete && <i className="fas fa-check"></i>}
                                        </div>
                                        <b onClick={()=> handleClickDetail(ward?.name, "Xã")}>Chi tiết</b>
                                    </div>
                                )) : <p>Không có dữ liệu.</p>} 
                            </div>
                            
                        </div>}

                    { ["A1", "A2", "A3", "B1"].includes(auth?.user?.typeAccount) &&
                        <div className="openCensus-bottom-itemTable">
                            <div className="openCensus-bottom-itemTable-title">
                                <p>Thôn (Bản, Làng)</p>
                            </div>
                            <div className="openCensus-listLocalName">
                                { openCensus?.village.length > 0   ? openCensus?.village.map((village, index) => (
                                    <div className="openCensus-itemLocalName" key={index}>
                                        <div className="openCensus-itemLocalName-content" onClick={()=> handleChooseCode(village?.code)} >
                                            <b>{index+1}. {village?.name} - {village?.code}</b>
                                        </div>
                                        <b onClick={()=> handleClickDetail(village?.name, "Thôn")}>Chi tiết</b>
                                    </div>
                                )) : <p>Không có dữ liệu.</p>} 
                            </div>
                            
                        </div>}

                </div>
            </div>

            <Modal isOpenModal={isOpenModalEdit} setIsOpenModal={setIsOpenModalEdit}>
                <div className="modalEdit-content">
                    <h3>Điều chỉnh thời gian khảo sát</h3>
                    <div className="modalEdit-content-time">
                        <label>Thời gian mở :</label>
                        <input type="date" name="timeOpen" onChange={handleChangeTime}/>
                    </div>
                    <div className="modalEdit-content-time">
                        <label>Thời gian đóng :</label>
                        <input type="date" name="timeClose" onChange={handleChangeTime} />
                    </div>
                    {openCensus?.error !=="" ?
                        <p >{openCensus?.error}</p>
                        : ""}
                    <div className="modalEdit-button">
                        <Button 
                            typeButton="normal" 
                            height={45} 
                            width={130} 
                            text="Xác nhận"
                            onClick={handleEditOpenCensus}
                        />
                    </div>
                </div>
            </Modal>

            <Modal isOpenModal={isOpenModalDetail} setIsOpenModal={setIsOpenModalDetail}>
                <div className="openCensus-modal-content">
                    <h2>Tình hình khảo sát dân số của {codeName}</h2>
                    {openCensus?.listCitizen?.length > 0 ? 
                        <>
                            <div className="openCensus-modal-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên</th>
                                            <th>Ngày sinh</th>
                                            <th>Số CCCD</th>
                                            <th>Quê quán</th>
                                            <th>Ngày khai báo</th>
                                            <th>Xem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {openCensus?.listCitizen && openCensus?.listCitizen.map((citizen, index) => (
                                            <tr key={index}> 
                                                <td>{index + 1}</td>
                                                <td>{citizen?.name}</td>
                                                <td>{moment(citizen?.date).format("DD-MM-YYYY")}</td>
                                                <td>{citizen?.numCCCD}</td>
                                                <td>{citizen?.hometownVillage + ", " + citizen?.hometownWard + ", " + citizen?.hometownDistrict + ", " + citizen?.hometownCity}</td>
                                                <td>{moment(citizen?.createdAt).format("DD-MM-YYYY")}</td>
                                                <td>
                                                    <div onClick={() => handleClickPerson(citizen?._id)} className="iconView" >
                                                        <i className="fas fa-eye"></i>
                                                        <span> Xem</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <span>Tổng cộng có <b>{openCensus?.listCitizen?.length}</b> người dân được khai báo.</span>
                        </>
                        : <p>Không có dữ liệu.</p>}
                    
                </div>
            </Modal>

            <Modal isOpenModal={isOpenModalComplete} setIsOpenModal={setIsOpenModalComplete}>
                <div className="modalComplete-content">
                    <h2>Bạn có chắc muốn hoàn thành không?</h2>
                    <p>Khi bạn ấn <b>Có</b> thì bạn sẽ kết thúc cuộc khảo sát dân số và không thể thay đổi được gì nữa.</p>
                    <span>{openCensus?.messageComplete ? openCensus?.messageComplete : ""}</span>
                    <div className="modalComplete-listButton">
                        <div className="modalComplete-itemButton">
                            <Button 
                            typeButton="normal" 
                            height={45} width={120} text="Có" 
                            onClick={handleComleteOpenCensus}
                            />
                        </div>
                        <div className="modalComplete-itemButton">
                            <Button 
                            typeButton="normal" 
                            height={45} width={120} text="Không" 
                            onClick={()=>setIsOpenModalComplete(false)}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default OpenCensus;
