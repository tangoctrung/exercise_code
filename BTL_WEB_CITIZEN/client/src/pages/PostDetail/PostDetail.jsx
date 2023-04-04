import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Topbar from '../../components/Topbar/Topbar';
import "./PostDetail.css";
import { urlApi, noAvatar } from "../../api/urlApi";
import moment from "moment";
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
// import * as ACTIONS from "../../redux/actions/postAction";
import { deletePostCurrent } from "../../redux/actions/postAction";
import Slider from "react-slick";
import { Link } from 'react-router-dom';


function PostDetail() {

    var settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [post, setPost] = useState();
    const location = useLocation();
    const postId = location.pathname.split("/")[2];

    useEffect(()=> {
        const fetchPost = async () => {
            const res = await axios.get(urlApi + `/getpostid/${postId}`, {
                headers: {
                    Authorization: 'Bearer ' + auth?.accessToken
                }
            });
            if (res.data.status) {
                setPost(res.data.data);
            } else {
                setMessage(res.data.message);
            }
        }
        fetchPost();
    }, [postId])

    // khi người dùng xóa bài viết
    const handleDeletePost = (postId) => {
        dispatch(deletePostCurrent(postId, setPost, setMessage, auth?.accessToken));
    }

    return (
        <div className="postDetail">
            <div className="postDetail-top">
                <Topbar />
            </div>
            <div className="postDetail-bottom">
                {post ? <div className="postDetail-content">
                    <div className="postDetail-content-top">
                        <Link to={`/profile/${post?.author?._id}`} className="postDetail-top-imgName">
                            <div className="postDetail-top-img">
                                <img src={post?.author?.avatar ? post?.author?.avatar : noAvatar} alt="avatar" />
                            </div>
                            <div className="postDetail-top-name">
                                <strong>{post?.author?.name ? post?.author?.name : ""}</strong>
                                <p>{post?.author?.position ? post?.author?.position : ""}</p>
                            </div>
                        </Link>
                        <div className="postDetail-top-menu">
                            <div className="postDetail-top-item postDetail-top-itemMenu">
                                <i className="fas fa-ellipsis-h"></i>
                                <div className="postDetail-top-item-options">
                                    <div className="postDetail-top-item-options-item">
                                        <i className="fas fa-link"></i>
                                        <span>Sao chép liên kết</span>
                                    </div>
                                    {/* {auth?.user?._id === post?.author?._id && 
                                        <div className="postDetail-top-item-options-item" onClick={() => handleDeletePost(post?._id)}>
                                            <i className="fas fa-trash"></i>
                                            <span>Xóa bài báo</span>
                                        </div>} */}
                                    <div className="postDetail-top-item-options-item">
                                        <i className="fas fa-flag"></i>
                                        <span>Báo cáo bài viết</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="postDetail-content-body">
                        <div className="postDetail-timeView">
                            <p><i className="far fa-clock"></i> {moment(post?.createdAt).format("DD-MM-YYYY")}</p>
                            <p><i className="fas fa-eye"></i> {post?.totalWatch}</p>
                        </div>
                        <h3>{post?.title}</h3>
                        <div className="postDetail-text">
                            {ReactHtmlParser(post?.content)}
                        </div>
                    </div>
                    <div className="postDetail-listImagesContainer">
                        <div className="postDetail-listImage" >
                            <Slider {...settings}>
                                {post?.images && post?.images?.map((image, index) => (
                                    <div className="postDetail-image" key={index}>
                                        <img src={image} alt="demo" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div> :
                <p>{message}</p>}
            </div>
        </div>
    )
}

export default PostDetail;
