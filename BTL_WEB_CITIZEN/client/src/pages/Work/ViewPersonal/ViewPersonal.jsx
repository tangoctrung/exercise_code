import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./ViewPersonal.css";
import dataLocal from '../../../data/dataDemo/local.json';
import dataLocal1 from '../../../data/dataDemo/local1.json';
import Button from '../../../common/Button/Button';
import CardPerson from '../../../components/CardPerson/CardPerson';
import * as ACTIONS from '../../../redux/constants/viewPersonContant';
import * as ACTION from '../../../redux/constants/userContant';
import { urlClient } from '../../../api/urlApi';
import Modal from '../../../common/Modal/Modal';
import EditCitizen from '../../../components/EditCitizen/EditCitizen';
import { getAllCitizenCodename, deleteCitizen, getCitizenNumCCCD, getAllCitizen, getAllCitizenCodenameDefault } from '../../../redux/actions/userAction';
import moment from 'moment';

function ViewPersonal() {

    const dispatch = useDispatch();
    const { viewPerson, auth, user } = useSelector(state => state);
    const [isOpenModalEditCitizen, setIsOpenModalEditCitizen ] = useState(false);
    const [isOpenModalDeleteCitizen, setIsOpenModalDeleteCitizen ] = useState(false);
    const [citizenCurrent, setCitizenCurrent] = useState();
    const [indexCitizen, setIndexCitizen] = useState();
    const [citizenId, setCitizenId] = useState();
    const [numCCCD, setNumCCCD] = useState();
    const [state, setState] = useState({ nameCity: '', nameDistrict: '', nameWard: '', nameVillage: ''});
    const [data, setData] = useState({ huyen: [], xa: [], thon: [] });

    useEffect(()=> {
        if (auth?.user?.typeAccount !== "A1") {
            let codeName = auth?.user?.position.split("tế ")[1];
            let level = codeName.split(" ")[0];
            dispatch(getAllCitizenCodenameDefault({codeName, level}, auth?.accessToken));
        } else {
            dispatch(getAllCitizen(auth?.accessToken));
        }
        
    }, [])

    useEffect(() => {
        const nameArea = auth?.user?.position.split("tế ")[1];
        if (nameArea.includes("Tỉnh")) {
            dataLocal1.map((d) => {
                if (d.Name === nameArea) {
                    setData({
                        ...data,
                        huyen: [...d.Data, nameArea],
                    })
                }
            })
        } else if (nameArea.includes("Huyện")) {
            dataLocal1.map((d) => {
                if (d.Name === nameArea) {
                    setData({
                        ...data,
                        xa: [...d.Data, nameArea],
                    })
                }
            })
        } else if (nameArea.includes("Xã")) {
            dataLocal1.map((d) => {
                if (d.Name === nameArea) {
                    setData({
                        ...data,
                        thon: [...d.Data, nameArea],
                    })
                }
            })
        }
    }, [])

    const handleChangeModeView = (s) => {
        if (s === 'table') {
            dispatch({type: ACTIONS.MODE_VIEW_TABLE});
        } else {
            dispatch({type: ACTIONS.MODE_VIEW_CARD});
        }
    }

    // khi người dùng xem 1 citizen
    const handleClickPerson = (id) => {
        window.open(urlClient + `viewpersondetail/${id}`);
    }

    // khi người dùng xóa 1 citizen
    const handleDeleteCitizen = () => {
        dispatch(deleteCitizen(citizenId, setIsOpenModalDeleteCitizen, auth?.accessToken ));
    }

    // khi người dùng nhập numCCCD citizen 
    const handleTypeNumCCCD = (e) => {
        setNumCCCD(e.target.value);
    }
    // khi người dùng tìm kiếm citizen theo numCCCD
    const handleSearchCitizenNumCCCD = (e) => {
        e.preventDefault();
        if (numCCCD !== "" && numCCCD !== undefined) {
            dispatch(getCitizenNumCCCD(numCCCD, auth?.accessToken));
        }
    }

    // khi người dùng nhập tên vùng để tìm kiếm citizen 
    const handleChange = (e) => {
        if (e.target.value.includes("Tỉnh")) {
            dataLocal1.map((d) => {
                if (d.Name === e.target.value) {
                    setData({
                        ...data,
                        huyen: d.Data,
                    })
                }
            })
        } else if (e.target.value.includes("Huyện")) {
            dataLocal1.map((d) => {
                if (d.Name === e.target.value) {
                    setData({
                        ...data,
                        xa: d.Data,
                    })
                }
            })
        } else if (e.target.value.includes("Xã")) {
            dataLocal1.map((d) => {
                if (d.Name === e.target.value) {
                    setData({
                        ...data,
                        thon: d.Data,
                    })
                }
            })
        }
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    // khi người dùng bấm tìm kiếm citizen theo vùng
    const handleSubmitSearchCitizen = (e) => {
        e.preventDefault();
        dispatch(getAllCitizenCodename(state, auth?.accessToken));
    }
    // khi người dùng sua du lieu cua citizen
    const handleEditCitizen = (citizen, index) => {
        dispatch({type: ACTION.CLEAR_MESSAGE_CITIZEN});
        setIsOpenModalEditCitizen(true); 
        setCitizenCurrent(citizen); 
        setIndexCitizen(index)
    }
    // khi người dùng xoa du lieu citizen
    const handleOpenModalDeleteCitizen = (citizen, index) => {
       dispatch({type: ACTION.CLEAR_MESSAGE_CITIZEN});
       setIsOpenModalDeleteCitizen(true); 
       setCitizenId(citizen?._id); 
       setIndexCitizen(index)
    }

    return (
        <div className="viewPersonal">
            <div className="viewPersonal-top">
                { ["A1", "A2", "A3", "B1"].includes(auth?.user?.typeAccount) &&
                    <>
                        <h3>Bộ lọc</h3>
                        <div className="viewPersonal-top-content">

                            { auth?.user?.typeAccount==="A1" &&
                                <div className="viewPersonal-top-content-item">
                                    <p>Tên tỉnh(thành phố)</p>
                                    <input type="email" list="dataCity" name="nameCity" onChange={handleChange} multiple />
                                    <datalist id="dataCity">
                                        { dataLocal.map((city, index) => (
                                            <option key={index} value={city.Name}>{city.Name}</option>
                                        ))}
                                    </datalist>
                                </div>}

                            { ["A1", "A2"].includes(auth?.user?.typeAccount) &&
                                <div className="viewPersonal-top-content-item">
                                    <p>Tên huyện(quận)</p>
                                    <input type="email" list="dataDistrict" name="nameDistrict" onChange={handleChange} multiple />
                                    <datalist id="dataDistrict">
                                        { data?.huyen?.map((city, index) => (
                                            <option key={index} value={city}></option>
                                        ))}
                                    </datalist>
                                </div>}

                            { ["A1", "A2", "A3"].includes(auth?.user?.typeAccount) &&
                                <div className="viewPersonal-top-content-item">
                                    <p>Tên xã(phường)</p>
                                    <input type="email" list="dataWard" name="nameWard" onChange={handleChange} multiple/>
                                    <datalist id="dataWard">
                                        { data?.xa?.map((city, index) => (
                                            <option key={index} value={city}></option>
                                        ))}
                                    </datalist>
                                </div>}

                            { ["A1", "A2", "A3", "B1"].includes(auth?.user?.typeAccount) &&
                                <div className="viewPersonal-top-content-item">
                                    <p>Tên thôn(phố, bản, làng)</p>
                                    <input type="email" list="dataVillage" name="nameVillage" onChange={handleChange} multiple  />
                                    <datalist id="dataVillage">
                                        { data?.thon?.map((city, index) => (
                                            <option key={index} value={city}></option>
                                        ))}
                                    </datalist>
                                </div>}

                            <div className="viewPersonal-top-content-button">
                                <div className="viewPersonal-top-content-button-content">
                                    <Button
                                        typeButton="search" 
                                        width={100} 
                                        height={40} 
                                        fontSize={17} 
                                        text="Duyệt" 
                                        onClick={handleSubmitSearchCitizen}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                }
                <h3>Tìm kiếm theo điều kiện</h3>
                <div className="viewPersonal-top-search">
                    <form className="viewPersonal-top-input" onSubmit={handleSearchCitizenNumCCCD}>
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm theo số CCCD,..." onChange={handleTypeNumCCCD} />
                    </form>
                </div>
            </div>
            <div className="viewPersonal-bottom">
                <div className="viewPersonal-bottom-text">
                    <h3>Danh sách kết quả</h3>
                    <b>{user?.listCitizen?.length || 0} kết quả</b>
                </div>
                <div className="viewPersonal-modeView">
                    <p>Chế độ xem</p>
                    <div className="viewPersonal-listModeView">
                        <div 
                            className={`viewPersonal-modeItem ${viewPerson.modeView === 'table' && 'viewPersonal-modeItem-isActive'}`} 
                            onClick={()=>handleChangeModeView("table")}
                        >
                            <i className="fas fa-table"></i>
                            <span>Dạng bảng</span>
                        </div>
                        <div 
                            className={`viewPersonal-modeItem ${viewPerson.modeView === 'card' && 'viewPersonal-modeItem-isActive'}`}  
                            onClick={()=>handleChangeModeView("card")}
                        >
                            <i className="fas fa-address-card"></i>
                            <span>Dạng thẻ</span>
                        </div>
                    </div>
                </div>
                <div className="viewPersonal-bottom-container">

                    {(viewPerson.modeView === 'table' && user?.listCitizen?.length > 0) && 
                        <div className="viewPersonal-bottom-listPersonTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Ngày sinh</th>
                                        <th>SĐT</th>
                                        <th>Số CCCD</th>
                                        <th>Quê quán</th>
                                        <th>Ngày khai báo</th>
                                        <th>Xem</th>
                                        <th>Sửa</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user?.listCitizen && user?.listCitizen.map((citizen, index) => (
                                        <tr key={index}> 
                                            <td>{index + 1}</td>
                                            <td>{citizen?.name}</td>
                                            <td>{moment(citizen?.date).format("DD-MM-YYYY")}</td>
                                            <td>{citizen?.phone}</td>
                                            <td>{citizen?.numCCCD}</td>
                                            <td>{citizen?.hometownVillage + ", " + citizen?.hometownWard + ", " + citizen?.hometownDistrict + ", " + citizen?.hometownCity}</td>
                                            <td>{moment(citizen?.createdAt).format("DD-MM-YYYY")}</td>
                                            <td>
                                                <div onClick={() => handleClickPerson(citizen?._id)}>
                                                    <i className="fas fa-eye"></i>
                                                    <span> Xem</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div onClick={() => handleEditCitizen(citizen, index)}>
                                                    <i className="fas fa-edit"></i>
                                                    <span> Sửa</span>                                                  
                                                </div>
                                            </td>
                                            <td>
                                                <div onClick={() => handleOpenModalDeleteCitizen(citizen, index)}>
                                                    <i className="fas fa-trash"></i>
                                                    <span> Xóa</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }

                    {(viewPerson.modeView === 'card' && user?.listCitizen?.length > 0) &&
                        <div className="viewPersonal-bottom-listPerson">
                            {user?.listCitizen && user?.listCitizen.map((citizen, index) => (
                                <div className="viewPersonal-bottom-itemPerson" onClick={() => handleClickPerson(citizen?._id)} key={index}>
                                    <CardPerson citizen={citizen} />    
                                </div>  
                            ))}
                        </div>
                    }

                    {(user?.listCitizen?.length === 0 || !user?.listCitizen) && 
                        <div className="viewPersonal-bottom-notFound">
                            <p>Không có dữ liệu.</p>
                        </div>}


                </div>
            </div>

            <Modal isOpenModal={isOpenModalEditCitizen} setIsOpenModal={setIsOpenModalEditCitizen}>
                <div className="modal-viewPersonal-edit">
                        <EditCitizen citizen={citizenCurrent} index={indexCitizen} setIsOpenModal={setIsOpenModalEditCitizen} />
                </div>
            </Modal> 

            <Modal isOpenModal={isOpenModalDeleteCitizen} setIsOpenModal={setIsOpenModalDeleteCitizen}>
                    <div className="modal-viewPersonal-delete">
                        <div className="modal-delete-content">
                            <p>Bạn có chắc chắn muốn xóa không?</p>

                            <span style={{color: 'red', display: 'inline-block', width: '100%', textAlign: 'center', marginTop: '10px'}}>
                                {user?.messageCitizenDelete ? user?.messageCitizenDelete : ''}
                            </span>
                            <div className="modal-delete-listButton">
                                <button onClick={handleDeleteCitizen} >Muốn xóa</button>
                                <button onClick={()=> setIsOpenModalDeleteCitizen(false)}>Hủy xóa</button>
                            </div>
                        </div>
                    </div>
            </Modal>

        </div>
    )
}

export default ViewPersonal;
