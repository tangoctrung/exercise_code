import React, { useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import "./WritePost.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '../../common/Button/Button';
import { storage } from "../../firebase/index";
import { urlApi } from "../../api/urlApi";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../redux/actions/postAction';

function WritePost() {

    const { auth, post } = useSelector(state => state);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        title: '', content: '', 
        author: auth?.user?._id,
        codeName: auth?.user?.typeAccount==="A1" ? "Quốc gia" : auth?.user?.position.split("tế ")[1],
        images: []});

    // khi người dùng nhập title
    const handleChangeTitle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value,
        })
    }
    // khi người dùng nhập content
    const handleChangePost = (event, editor) => {
        setState({
            ...state,
            content: editor.getData(),
        });
    }
    // khi người dùng xóa ảnh
    const handleDeleteImage = (index) => {
        let listImage = [...state.images];
        listImage.splice(index, 1);
        setState({
            ...state,
            images: listImage,
        })
    }
    // khi người dùng upload ảnh
    const handleChooseImage = (e) => {
        let files = [...e.target.files];
        let newImages = [...state.images];
        var date = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");
        files.forEach(file => {
            const uploadTask = storage.ref(`imagePost/${auth?.user?._id},${auth?.user?.name}/${date}/${file.name}`).put(file);
            uploadTask.on('state_changed', 
                (snapshot) => {}, 
                (error) => { alert(error)}, 
                () => {
                    // complete function ....
                    storage.ref(`imagePost/${auth?.user?._id},${auth?.user?.name}/${date}`).child(file.name).getDownloadURL().then(url => {
                        newImages.push(url);
                        setState({
                            ...state,
                            images: newImages,
                        })
                    })
                });
        });
       
    }

    // khi người dùng submit Create Post
    const handleSubmitCreatePost  = () => {
        dispatch(addPost(state, auth?.accessToken));
    }
    return (
        <div className="writePost">
            <div className="writePost-top">
                <Topbar />
            </div>
            <div className="writePost-bottom">
                <h1>Viết báo</h1>    
                <div className="writePost-title">
                    <input type="text" name="title" onChange={handleChangeTitle} placeholder="Tiêu đề bài viết..."/>
                </div>         
                <div className="writePost-content">
                    <CKEditor
                        editor={ ClassicEditor }
                        data="Viết nội dung bài báo  ở đây..."
                        onChange={handleChangePost}
                    />
                </div>
            </div>
            <div className="writePost-listImage">
                <label htmlFor="choooseImage" >
                    <input type="file" id="choooseImage" hidden onChange={handleChooseImage}  multiple />
                    <p>Chọn ảnh</p>
                </label>
                <div className="writePost-Images">
                    {state.images.length > 0 && state.images.map((image, index) => (
                        <div className="writePost-image" key={index}>
                            <img src={image} alt="anh" />
                            <i className="fas fa-times" title="Gỡ bỏ ảnh này." onClick={() => handleDeleteImage(index)}></i>
                        </div>
                    ))}
                </div>
            </div>
            <div className="writePost-button">
                    <Button 
                    typeButton="normal" 
                    width={130} 
                    height={46} 
                    text="Xuất bản" 
                    onClick={handleSubmitCreatePost}
                    />
                </div>
        </div>
    )
}

export default WritePost;
