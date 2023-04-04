import React, { useState } from 'react';
import "./EditCitizen.css";
import Button from '../../common/Button/Button';
import { dataNation } from "../../data/dataDemo/dataNation";
import { dataReligion } from "../../data/dataDemo/dataReligion";
import { dataEducation } from '../../data/dataDemo/dataEducation';
import { dataJob } from '../../data/dataDemo/dataJob';
import dataLocal from "../../data/dataDemo/local.json";
import { noAvatar } from "../../api/urlApi";
import moment from "moment";
import { updateCitizen } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

function EditCitizen({citizen, index, setIsOpenModal}) {

    const { auth, user } = useSelector(state => state);
    const dispatch = useDispatch();
    const [file, setFile] = useState();
    const [state, setState] = useState({
        _id: citizen._id, createdAt: citizen?.createdAt, updatedAt: citizen?.updatedAt,
        name: citizen?.name, date: moment(citizen?.date).format('YYYY-MM-DD'), gender: citizen?.gender, avatar: citizen?.avatar,
        nation: citizen?.nation, religion: citizen?.religion, education: citizen?.education, phone: citizen?.phone, email: citizen?.email,
        numCCCD: citizen?.numCCCD, hometownVillage: citizen?.hometownVillage, hometownWard: citizen?.hometownWard, hometownDistrict: citizen?.hometownDistrict,
        hometownCity: citizen?.hometownCity, addressVillage: citizen?.addressVillage, addressCity: citizen?.addressCity, addressWard: citizen?.addressWard,
        addressDistrict: citizen?.addressDistrict, infoDetail: citizen?.infoDetail, infoFamily: citizen?.infoFamily, job: citizen?.job,
        timeAdd: Date.now(),
        typeAccount: auth?.user?.typeAccount,
        codeArea: auth?.user?.accountName.slice(0, auth?.user?.accountName.length - 2),
    });

    // khi người dùng thay đổi dữ liệu của citizen
    const handleChangeInfo  = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value,
        })
    }

    // khi người dùng submit thay đổi
    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        // console.log(state);
        dispatch(updateCitizen( index, state, citizen?._id, setIsOpenModal, auth?.accessToken));
        
    }

    return (
        <div className="editCitizen-content">
            <h1>Chỉnh sửa thông tin</h1>
            <div className="editCitizen-info">
                <div className="editCitizen-img">
                    <label htmlFor="choooseImage" title="Bấm vào để chọn ảnh" >
                        <input type="file" id="choooseImage" hidden />
                        <img src={state?.avatar ? state.avatar : noAvatar} alt="avatar" />
                    </label>
                </div>
                <div className="editCitizen-infoBasic">
                    <p><b>Họ và tên:</b><input type="text" value={state?.name} name="name" onChange={handleChangeInfo} /></p>
                    <p><b>Ngày sinh:</b><input type="date" value={state?.date} name="date" onChange={handleChangeInfo} /></p>
                    <p>
                        <b>Giới tính: </b>
                        <input type="text" list="gioitinh" value={state?.gender} name="gender"onChange={handleChangeInfo} />
                        <datalist id="gioitinh">
                            <option key={1} value="Nam"></option>
                            <option key={2} value="Nữ"></option>
                            <option key={3} value="Khác"></option>
                        </datalist>
                    </p>
                    <p>
                        <b>Dân tộc: </b>
                        <input type="text" list="dantoc" value={state?.nation} name="nation" onChange={handleChangeInfo} />
                        <datalist id="dantoc">
                            {dataNation.map((item, index) => (
                                <option key={index} value={item.name}></option>
                            ))}
                        </datalist>
                    </p>
                    <p>
                        <b>Tôn giáo: </b>
                        <input type="text" list="tongiao" value={state?.religion} name="religion" onChange={handleChangeInfo} />
                        <datalist id="tongiao">
                            {dataReligion.map((item, index) => (
                                <option key={index} value={item.name}></option>
                            ))}
                        </datalist>
                    </p>
                    <p>
                        <b>Học vấn: </b>
                        <input type="text" list="hocvan" value={state?.education} name="education" onChange={handleChangeInfo} />
                        <datalist id="hocvan">
                            {dataEducation.map((item, index) => (
                                <option key={index} value={item.name} ></option>
                            ))}
                        </datalist>
                    </p>
                    <p><b>SĐT: </b><input type="text" value={state?.phone} name="phone" onChange={handleChangeInfo} /></p>
                    <p><b>Số CCCD: </b><input type="text" value={state?.numCCCD} name="numCCCD" onChange={handleChangeInfo} /></p>
                    <p><b>Email: </b><input type="text" value={state?.email} name="email" onChange={handleChangeInfo} /></p>
                    <p>
                        <b>Học vấn: </b>
                        <input type="text" list="congviec" value={state?.job} name="job" onChange={handleChangeInfo} />
                        <datalist id="congviec">
                            {dataJob.map((item, index) => (
                                <option key={index} value={item.value} >{item.name}</option>
                            ))}
                        </datalist>
                    </p>                          
                </div>
            </div>

            <p>Nơi ở hiện tại</p>
            <div className="editCitizen-address">
                <div className="editCitizen-address-city">
                    <input 
                        type="text" 
                        list="addresscity" 
                        placeholder="Tỉnh/Thành phố" 
                        value={state?.addressCity} 
                        name="addressCity"
                        onChange={handleChangeInfo} 
                    />
                    <datalist id="addresscity" >
                        { dataLocal.map((city, index) => (
                            <option key={index} value={city.Name}>{city.Name}</option>
                        ))}
                    </datalist>
                </div>  
                <div className="editCitizen-address-city">
                    <input 
                        type="text" 
                        list="addresshuyen" 
                        placeholder="Huyện/Quận" 
                        value={state?.addressDistrict} 
                        name="addressDistrict"
                        onChange={handleChangeInfo} 
                    />
                    <datalist id="addresshuyen" >

                    </datalist>
                </div>
                <div className="editCitizen-address-city">
                    <input 
                        type="text" 
                        list="addressxa" 
                        placeholder="Xã/Phường" 
                        value={state?.addressWard} 
                        name="addressWard"
                        onChange={handleChangeInfo} 
                    />
                    <datalist id="addressxa" >

                    </datalist>
                </div>     
                <div className="editCitizen-address-city">
                    <input 
                        type="text" 
                        list="addressxa" 
                        placeholder="Thôn/Phố/Bản" 
                        value={state?.addressVillage} 
                        name="addressVillage"
                        onChange={handleChangeInfo} 
                    />
                    <datalist id="addressxa" >

                    </datalist>
                </div>
            </div>

            <p>Quê quán</p>
            <div className="editCitizen-hometown">
                <div className="editCitizen-hometown-city">
                    <input 
                        type="text" 
                        list="hometowncity" 
                        placeholder="Tỉnh/Thành phố" 
                        value={state?.hometownCity} 
                        name="hometownCity"
                        onChange={handleChangeInfo} 
                    />
                    <datalist id="hometowncity" >
                        { dataLocal.map((city, index) => (
                            <option key={index} value={city.Name}>{city.Name}</option>
                        ))}
                    </datalist>
                </div>  
                <div className="editCitizen-hometown-city">
                    <input 
                        type="text" list="hometownhuyen" 
                        placeholder="Huyện/Quận" 
                        value={state?.hometownDistrict} 
                        name="hometownDistrict"
                        onChange={handleChangeInfo} 
                    />
                    <datalist id="hometownhuyen" >

                    </datalist>
                </div>
                <div className="editCitizen-hometown-city">
                    <input 
                        type="text" list="hometownxa"  
                        placeholder="Xã/Phường" 
                        value={state?.hometownWard} 
                        name="hometownWard"
                        onChange={handleChangeInfo} 
                    />
                    <datalist id="hometownxa" >

                    </datalist>
                </div>  
                <div className="editCitizen-hometown-city">
                    <input 
                        type="text" list="hometownthon"  
                        placeholder="Thôn/Phố/Bản" 
                        value={state?.hometownVillage} 
                        name="hometownVillage"
                        onChange={handleChangeInfo} 
                    />
                    <datalist id="hometownthon" >

                    </datalist>
                </div>  
            </div>

            <div className="editCitizen-infoDetail">
                <h3>Thông tin chi tiết hơn</h3>
                <div className="editCitizen-infoDetailPerson">
                    <textarea 
                        placeholder="Nhập thông tin chi tiết hơn, ví dụ: chiều cao, cân nặng, đặc điểm nhận dạng, hoạt động trong cuộc đời,..." 
                        value={state?.infoDetail}
                        name="infoDetail"
                        onChange={handleChangeInfo}
                    >

                    </textarea>
                </div>
            </div>

            <div className="editCitizen-infoFamily">
                <h3>Thông tin về gia đình</h3>
                <div className="editCitizen-infoFamilyDetail">
                    <textarea 
                        placeholder="Thông tin của bố mẹ anh chị em: Tên, tuổi nghề nghiệp,..." 
                        value={state?.infoFamily}
                        name="infoFamily"
                        onChange={handleChangeInfo}
                    >

                    </textarea>
                </div>
            </div>

            <div className="editCitizen-error">
                <p style={{color: "red", width: "100%", textAlign: "center", marginTop: "10px"}}>
                    {user?.messageCitizenEdit ? user?.messageCitizenEdit : ''}
                </p>
            </div>
            <div className="editCitizen-button">
                <Button typeButton="normal" text="Cập nhật" width={130} height={50} onClick={handleSubmitUpdate} />
            </div>
        </div>
    )
}

export default EditCitizen;
