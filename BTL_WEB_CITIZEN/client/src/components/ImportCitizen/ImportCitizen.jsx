import React, { useState, useEffect } from 'react';
import "./ImportCitizen.css";
import Button from '../../common/Button/Button';
import { dataNation } from "../../data/dataDemo/dataNation";
import { dataReligion } from "../../data/dataDemo/dataReligion";
import { dataEducation } from '../../data/dataDemo/dataEducation';
import { dataJob } from '../../data/dataDemo/dataJob';
import dataLocal from "../../data/dataDemo/local.json";
import { useSelector, useDispatch } from 'react-redux';
import {storage} from '../../firebase';
import { noAvatar } from '../../api/urlApi';
import * as ACTIONS from "../../redux/constants/userContant";
import { addCitizen } from '../../redux/actions/userAction';

function ViewCitizen() {

    const { auth, user } = useSelector(state => state);
    const dispatch = useDispatch();
    const [file, setFile] = useState();

    // các trường thông tin của citizen
    const [state, setState] = useState({
        avatar: '', name: '', numCCCD: '', education: '', national: '', religion: '', phone: '', email: '', date: null, job: '',
        addressCity: '', addressDistrict: '', addressWard:'', addressVillage: '', hometownCity: '',
        hometownDistrict: '',hometownWard: '',hometownVillage: '',
        gender: '',infoDetail: '',infoFamily: '',
        timeAdd: Date.now(),
        typeAccount: auth?.user?.typeAccount,
        codeArea: auth?.user?.accountName.slice(0, auth?.user?.accountName.length - 2),
    });

    // khi người dùng điền thông tin citizen
    const handleChangeInfo = (e) => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    // khi người dùng chọn avatar
    const handleChooseAvatar = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file) {
            const uploadTask = storage.ref(`citizens/avatar//${file.name}`).put(file);
            console.log("loading");
            uploadTask.on('state_changed', 
                (snapshot) => {}, 
                (error) => { alert(error)}, 
                () => {
                    // complete function ....
                    storage.ref(`citizens/avatar/`).child(file.name).getDownloadURL().then(url => {
                        console.log(url);
                        setState({
                            ...state,
                            avatar: url,
                        });
                    })
                });
        }
    }

    // khi người dùng submit
    const handleSubmitCitizen = () => {
        dispatch({type: ACTIONS.CLEAR_MESSAGE_CITIZEN})
        console.log(state);
        dispatch(addCitizen(state, auth?.accessToken));
    }

    return (
        <div className="importCitizen-content">
            <div className="importCitizen-info">
                <div className="importCitizen-img">
                    <label htmlFor="choooseImage" title="Bấm vào để chọn ảnh" >
                        <input type="file" id="choooseImage" hidden onChange={handleChooseAvatar} />
                        <img src={file ? state.avatar : noAvatar } alt="avatar" />
                    </label>
                </div>
                <div className="importCitizen-infoBasic">
                    <p><b>Họ và tên:</b><input type="text" name="name"   onChange={handleChangeInfo}  /></p>
                    <p><b>Ngày sinh:</b><input type="date" placeholder="DD/MM/YYYY" name="date"   onChange={handleChangeInfo} /></p>
                    <p>
                        <b>Giới tính: </b>
                        <input type="text" list="gioitinh" name="gender"   onChange={handleChangeInfo} />
                        <datalist id="gioitinh">
                            <option key={1} value="Nam"></option>
                            <option key={2} value="Nữ"></option>
                            <option key={3} value="Khác"></option>
                        </datalist>
                    </p>
                    <p>
                        <b>Dân tộc: </b>
                        <input type="text" list="dantoc" name="nation"   onChange={handleChangeInfo} />
                        <datalist id="dantoc">
                            {dataNation.map((item, index) => (
                                <option key={index} value={item.name}></option>
                            ))}
                        </datalist>
                    </p>
                    <p>
                        <b>Tôn giáo: </b>
                        <input type="text" list="tongiao" name="religion"   onChange={handleChangeInfo} />
                        <datalist id="tongiao">
                            {dataReligion.map((item, index) => (
                                <option key={index} value={item.name}></option>
                            ))}
                        </datalist>
                    </p>
                    <p>
                        <b>Học vấn: </b>
                        <input type="text" list="hocvan" name="education"  onChange={handleChangeInfo} />
                        <datalist id="hocvan">
                            {dataEducation.map((item, index) => (
                                <option key={index} value={item.name}></option>
                            ))}
                        </datalist>
                    </p>
                    <p><b>SĐT: </b><input type="text" name="phone"  onChange={handleChangeInfo} /></p>
                    <p><b>Số CCCD: </b><input type="text" name="numCCCD"  onChange={handleChangeInfo} /></p>
                    <p><b>Email: </b><input type="text" name="email" onChange={handleChangeInfo} /></p>
                    <p>
                        <b>Công việc: </b>
                        <input type="text" list="congviec" name="job"  onChange={handleChangeInfo} />
                        <datalist id="congviec">
                            {dataJob.map((item, index) => (
                                <option key={index} value={item.value}>{item.name}</option>
                            ))}
                        </datalist>
                    </p>                          
                </div>
            </div>

            <p>Nơi ở hiện tại</p>
            <div className="importCitizen-address">
                <div className="importCitizen-address-city">
                    <input type="text" list="addresscity" placeholder="Tỉnh/Thành phố" name="addressCity"  onChange={handleChangeInfo} />
                    <datalist id="addresscity" >
                        { dataLocal.map((city, index) => (
                            <option key={index} value={city.Name}>{city.Name}</option>
                        ))}
                    </datalist>
                </div>  
                <div className="importCitizen-address-city">
                    <input type="text" list="addresshuyen" placeholder="Huyện/Quận" name="addressDistrict"  onChange={handleChangeInfo} />
                    <datalist id="addresshuyen" >

                    </datalist>
                </div>
                <div className="importCitizen-address-city">
                    <input type="text" list="addressxa" placeholder="Xã/Phường" name="addressWard"  onChange={handleChangeInfo} />
                    <datalist id="addressxa" >

                    </datalist>
                </div>     
                <div className="importCitizen-address-city">
                    <input type="text" list="addressxa" placeholder="Thôn/Phố/Bản" name="addressVillage"  onChange={handleChangeInfo} />
                    <datalist id="addressxa" >

                    </datalist>
                </div>
            </div>

            <p>Quê quán</p>
            <div className="importCitizen-hometown">
                <div className="importCitizen-hometown-city">
                    <input type="text" list="hometowncity" placeholder="Tỉnh/Thành phố" name="hometownCity"  onChange={handleChangeInfo} />
                    <datalist id="hometowncity" >
                        { dataLocal.map((city, index) => (
                            <option key={index} value={city.Name}>{city.Name}</option>
                        ))}
                    </datalist>
                </div>  
                <div className="importCitizen-hometown-city">
                    <input type="text" list="hometownhuyen" placeholder="Huyện/Quận" name="hometownDistrict"  onChange={handleChangeInfo} />
                    <datalist id="hometownhuyen" >

                    </datalist>
                </div>
                <div className="importCitizen-hometown-city">
                    <input type="text" list="hometownxa"  placeholder="Xã/Phường" name="hometownWard"  onChange={handleChangeInfo} />
                    <datalist id="hometownxa" >

                    </datalist>
                </div>  
                <div className="importCitizen-hometown-city">
                    <input type="text" list="hometownthon"  placeholder="Thôn/Phố/Bản" name="hometownVillage"  onChange={handleChangeInfo} />
                    <datalist id="hometownthon" >

                    </datalist>
                </div>  
            </div>

            <div className="importCitizen-infoDetail">
                <h3>Thông tin chi tiết hơn</h3>
                <div className="importCitizen-infoDetailPerson">
                    <textarea placeholder="Nhập thông tin chi tiết hơn, ví dụ: chiều cao, cân nặng, đặc điểm nhận dạng, hoạt động trong cuộc đời,..."
                     name="infoDetail"  onChange={handleChangeInfo} >

                    </textarea>
                </div>
            </div>
            
            <div className="importCitizen-infoFamily">
                <h3>Thông tin về gia đình</h3>
                <div className="importCitizen-infoFamilyDetail">
                    <textarea placeholder="Thông tin của bố mẹ anh chị em: Tên, tuổi nghề nghiệp,..." name="infoFamily" onChange={handleChangeInfo} >

                    </textarea>
                </div>
            </div>

            <div className="importCitizen-text">
                <p>{user?.messageCitizen}</p>
            </div>

            <div className="importCitizen-button">
               <Button typeButton="normal" text="Nhập" width={130} height={50} onClick={handleSubmitCitizen} />
            </div>
        </div>
    )
}

export default ViewCitizen;
