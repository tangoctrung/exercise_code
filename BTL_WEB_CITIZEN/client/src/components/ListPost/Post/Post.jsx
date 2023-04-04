import React from 'react';
import { Link } from 'react-router-dom';
import "../ListPost.css";
import { noAvatar } from '../../../api/urlApi';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { updateTotalWatch } from '../../../redux/actions/postAction';

function Post({post}) {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    // khi người dùng click vào post
    const handleClickPost = (postId, total1) => {
        let total = total1 + 1;
        dispatch(updateTotalWatch({postId, total}, auth?.accessToken));
    }
    return (
        <div className="post">
            <div className="post-top">
                <Link to={`/profile/${post?.author?._id}`} className="post-top-imgName">
                    <div className="post-top-img">
                        <img src={post?.author?.avatar ? post?.author?.avatar : noAvatar} alt="avatar" />
                    </div>
                    <div className="post-top-name">
                        <strong>{post?.author?.name}</strong>
                        <p>{post?.author?.position}</p>
                    </div>
                </Link>
                <div className="post-top-menu">
                    <div className="post-top-item post-top-itemMenu">
                        <i className="fas fa-ellipsis-h"></i>
                        <div className="post-top-item-options">                          
                            <div className="post-top-item-options-item">
                                <i className="fas fa-link"></i>
                                <span>Sao chép liên kết</span>
                            </div>
                            <div className="post-top-item-options-item">
                                <i className="fas fa-flag"></i>
                                <span>Báo cáo bài viết</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post-body">
                <div className="post-body-text">
                    <div className="post-top-title">
                        <Link to={`/postdetail/${post?._id}`} className="post-top-title-link" onClick={() => handleClickPost(post?._id, post?.totalWatch)}>
                            <h2>{post?.title?.length < 50 ? ReactHtmlParser(post?.title) : ReactHtmlParser(post?.title?.slice(0, 50) + "...")}</h2>
                        </Link>
                    </div>
                    <div className="post-top-content">
                        <p>{post?.content?.length < 250 ? ReactHtmlParser(post?.content) : ReactHtmlParser(post?.content?.slice(0, 250) + "...")}</p>
                    </div>
                    <div className="post-top-time">
                        <p>{moment(post?.createdAt).format("DD-MM-YYYY")}</p>
                    </div>
                </div>
                <div className="post-body-img">
                    <img src={post?.images[0]} alt="post" />
                </div>
            </div>
        </div>
    )
}

export default Post;
