import React, { useEffect } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import "./PostSaved.css";
import { dataPost } from '../../data/dataDemo/dataPost';
import Post from '../../components/ListPost/Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsUser } from '../../redux/actions/postAction';

function PostSaved() {

    const { auth, post } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostsUser(auth?.user?._id, auth?.accessToken));
    }, [auth?.user?._id])
    return (
        <div className="postSaved">
            <div className="postSaved-top">
                <Topbar />
            </div>
            <div className="postSaved-bottom">
                <div className="postSaved-listPost">
                    <h3>Danh sách bài viết của bạn</h3>
                    {post?.userPosts.length > 0 ? 
                    post?.userPosts.map((post, index) => (
                        <Post post={post} key={index}/>
                    )) : <p>Bạn chưa có bài viết nào.</p>}
                </div>
            </div>
        </div>
    )
}

export default PostSaved;
