import React, { useEffect, useRef, useState } from 'react';
import "./ProvideCode.css";
import dataLocal from '../../../data/dataDemo/local.json';
import dataLocal1 from '../../../data/dataDemo/local1.json'; 
// import Button from '../../../common/Button/Button';
import Modal from '../../../common/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { provideCode, getCode } from '../../../redux/actions/addCodeAction';
import * as ACTIONS from "../../../redux/constants/addCodeContant";
import moment from "moment";
import Button from '../../../common/Button/Button';

function ProvideCode() {

    const { auth, addCode } = useSelector(state => state);
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const nameRef = useRef();
    const codeRef = useRef();
    const [listName, setListName] = useState([]);
    const [state, setState] = useState({
        code: '', name: '', 
        provider: auth?.user?._id, // người cấp
        level: '', 
        codeLength: 0,
        accountNameProvider: "",
    });

    useEffect(() => {
        switch (auth?.user?.typeAccount){
            case "A1":
                setState({
                    ...state,
                    level: "Tỉnh",
                    codeLength: 2,
                    accountNameProvider: "A1",
                });
                break;
            case "A2":
                setState({
                    ...state,
                    level: "Huyện",
                    codeLength: 4,
                    accountNameProvider: auth?.user?.accountName,
                });
                break;
            case "A3":
                setState({
                    ...state,
                    level: "Xã",
                    codeLength: 6,
                    accountNameProvider: auth?.user?.accountName,
                });
                break;
            case "B1":
                setState({
                    ...state,
                    level: "Thôn",
                    codeLength: 8,
                    accountNameProvider: auth?.user?.accountName,
                });
                break;

                
            default:
                break;
        }
        if (auth?.user?.typeAccount !== "A1"){
            const nameArea = auth?.user?.position.split("tế ")[1];
            dataLocal1.forEach((code) => {
                if (code.Name === nameArea) {
                    setListName(code.Data);
                }
            })
        } else {
            let names = [];
            dataLocal.forEach((code) => {
                names.push(code.Name);
            })
            setListName([...names]);
        }
    }, []);

    useEffect(() => {
        if (auth?.user?.typeAccount==="A1") {
            dispatch(getCode("00", auth?.accessToken));
        } else {
            dispatch(getCode(auth?.user?.accountName, auth?.accessToken));
        }
    }, [])

    // khi người dùng bấm reload lại các vùng được cấp mã 
    const handleReloadProvideCode = () => {
        if (auth?.user?.typeAccount==="A1") {
            dispatch(getCode("00", auth?.accessToken));
        } else {
            dispatch(getCode(auth?.user?.accountName, auth?.accessToken));
        }
    }

    const handleShowModal = () => {
        setIsOpenModal(true);
    }

    // khi người dùng nhập tên địa phương hoặc mã
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value,
        });
    }

    // khi người dùng focus input thì clear message lỗi
    const handleFocus = (e) => {
        dispatch({type: ACTIONS.CLEAR_MESSAGE})
    }

    // khi người dùng cấp mã
    const handleProvideCode = (e) => {
        e.preventDefault();
        // console.log(auth?.user?.accessToken);
        dispatch(provideCode(state, auth?.accessToken));
    }

    // khi người dùng click vào xem địa phương được khai báo 
    const handleChooseCode = (codeId) => {
        dispatch(getCode(codeId, auth?.accessToken));
    }

    return (
        <div className="provideCode">
            <div className="provideCode-top">
                { auth?.user?.typeAccount ==="A1" &&  <h3>Khai báo cấp mã cho tỉnh/thành phố</h3>}
                { auth?.user?.typeAccount ==="A2" &&  <h3>Khai báo cấp mã cho huyện/ quận</h3>}
                { auth?.user?.typeAccount ==="A3" &&  <h3>Khai báo cấp mã cho xã/phường</h3>}
                { auth?.user?.typeAccount ==="B1" &&  <h3>Khai báo cấp mã cho thôn/phố/bản</h3>}
                <div className="provideCode-top-container">
                    <form className="provideCode-top-content">
                        <div className="provideCode-top-content-left">
                            { auth?.user?.typeAccount ==="A1" &&  <p>Tên tỉnh/thành phố</p>}
                            { auth?.user?.typeAccount ==="A2" &&  <p>Tên huyện/ quận</p>}
                            { auth?.user?.typeAccount ==="A3" &&  <p>Tên xã/phường</p>}
                            { auth?.user?.typeAccount ==="B1" &&  <p>Tên thôn/phố/bản</p>}
                            <input 
                                list="dataList" 
                                type="email"
                                placeholder="Chọn tên địa phương ở đây" 
                                name="name"
                                ref={nameRef}
                                onChange={handleChange}
                                onFocus={handleFocus}
                             />
                            <datalist id="dataList">
                                { listName.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </datalist>
                        </div>
                        <div className="provideCode-top-content-right">
                            <p>Cấp mã</p>
                            <div className="provideCode-top-content-right-info">
                                <input 
                                    type="text" 
                                    placeholder="Nhập mã ở đây" 
                                    name="code" 
                                    ref={codeRef}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                />
                                {/* <Button typeButton="default" width={50} height={50} title="Hệ thống sẽ tự động cấp một mã cho tỉnh/thành phố này" /> */}
                            </div>
                        </div>
                        <div className="provideCode-top-content-button">
                            {addCode?.error && <p>{addCode?.error}<b onClick={handleShowModal}> Xem thêm</b></p>}
                            {addCode?.success && <p style={{color: "green"}}>{addCode?.success}</p>}
                            <button onClick={handleProvideCode}>Khai báo</button>
                        </div>
                        <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} >
                            <div className="modal-provideCode-text">
                                <h2>Chi tiết lỗi</h2>
                                <p>{addCode?.errorDetail}</p>
                            </div>
                        </Modal>
                    </form>
                </div>
            </div>

            <div className="provideCode-bottom">
                <h3>Những tỉnh thành, địa phương đã được khai báo</h3>
                <div className="provideCode-bottom-button">
                    <Button typeButton="reload" width={120} height={40} text="Tải lại" onClick={handleReloadProvideCode} />
                </div>

                <div className="provideCode-bottom-listLocal">
                    { auth?.user?.typeAccount==="A1" && 
                        <div className="provideCode-bottom-itemLocal">
                            <p>Tỉnh (Thành phố)</p>
                            <div className="listLocalName">
                                { addCode?.city.length > 0   && addCode?.city.map((city, index) => (
                                    <div className="itemLocalName" key={index} onClick={()=> handleChooseCode(city?.code)} >
                                        <b>{index+1}. {city?.name} - <b>{city?.code}</b></b>
                                        <address>Thời gian khai báo: {moment(city?.createdAt).format("DD-MM-YYYY")}</address>
                                    </div>
                                )) }                              
                            </div>
                            <div className="listLocalName-bottom">
                                <span>Có <b>{addCode?.city?.length} tỉnh(thành phố)</b> được khai báo</span>
                            </div>
                        </div>}
                    { ["A1", "A2"].includes(auth?.user?.typeAccount) &&
                        <div className="provideCode-bottom-itemLocal">
                            <p>Huyện (Quận)</p>
                            <div className="listLocalName">
                                { addCode?.district.length > 0  
                                    ? addCode?.district.map((district, index) => (
                                        <div className="itemLocalName" key={index} onClick={()=> handleChooseCode(district?.code)} >
                                            <b>{index+1}. {district?.name} - <b>{district?.code}</b></b>
                                            <address>Thời gian khai báo: {moment(district?.createdAt).format("DD-MM-YYYY")}</address>
                                        </div>
                                    ))
                                    : <span>Không có dữ liệu.</span>
                                }
                            </div>
                            <div className="listLocalName-bottom">
                                {addCode?.district?.length > 0 ? <span>Có <b>{addCode?.district?.length} huyện(quận)</b> được khai báo</span> : <span>Không có dữ liệu.</span>}
                            </div>
                        </div>}
                    { ["A1", "A2", "A3"].includes(auth?.user?.typeAccount) &&
                        <div className="provideCode-bottom-itemLocal">
                            <p>Xã (Phường)</p>
                            <div className="listLocalName">
                                { addCode?.ward.length > 0  
                                    ? addCode?.ward.map((ward, index) => (
                                        <div className="itemLocalName" key={index} onClick={()=> handleChooseCode(ward?.code)} >
                                            <b>{index+1}. {ward?.name} - <b>{ward?.code}</b></b>
                                            <address>Thời gian khai báo: {moment(ward?.createdAt).format("DD-MM-YYYY")}</address>
                                        </div>
                                    ))
                                    : <span>Không có dữ liệu.</span>
                                }
                            </div>
                            <div className="listLocalName-bottom">
                                {addCode?.ward?.length > 0 ? <span>Có <b>{addCode?.ward?.length} xã(phường)</b> được khai báo</span> : <span>Không có dữ liệu.</span>}
                            </div>
                        </div>}

                    { ["A1", "A2", "A3", "B1"].includes(auth?.user?.typeAccount) &&
                        <div className="provideCode-bottom-itemLocal">
                            <p>Thôn (Tổ,Bản,Làng)</p>
                            <div className="listLocalName">
                                { addCode?.village.length > 0  
                                    ? addCode?.village.map((village, index) => (
                                        <div className="itemLocalName" key={index} onClick={()=> handleChooseCode(village?.code)} >
                                            <b>{index+1}. {village?.name} - <b>{village?.code}</b></b>
                                            <address>Thời gian khai báo: {moment(village?.createdAt).format("DD-MM-YYYY")}</address>
                                        </div>
                                    ))
                                    : <span>Không có dữ liệu.</span>
                                }
                            </div>
                            <div className="listLocalName-bottom">
                                {addCode?.village?.length > 0 ? <span>Có <b>{addCode?.village?.length} thôn(phố, bản, làng)</b> được khai báo</span> : <span>Không có dữ liệu.</span>}
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default ProvideCode;
