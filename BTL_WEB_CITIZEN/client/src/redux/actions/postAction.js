import { getDataAPI, postDataAPI, putDataAPI, deleteDataAPI } from '../../api/api';
import * as ACTIONS from "../constants/postContant";


export const addPost = (data, token) => async (dispatch) => {
    try {
        const res = await postDataAPI('createpost', data, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.ADD_POST, payload: {post: res.data.data}});
            window.location.reload();
        }
    } catch (err) {
        console.log(err);
    }
}

export const getAllPosts = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('getallposts', token);
        if (res.data.status) {
            dispatch({type: ACTIONS.GET_POST_ALL, payload: {listPost: res.data.data}});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getHotPosts = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('getpoststotalwatch', token);
        if (res.data.status) {
            dispatch({type: ACTIONS.GET_POST_HOT, payload: {listPost: res.data.data}});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getCodenamePosts = (codeName, token) => async (dispatch) => {
    try {
        const res = await getDataAPI(`getpostscodename?codeName=${codeName}`, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.GET_POST_CODENAME, payload: {listPost: res.data.data}});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getPostsUser = (userId, token) => async (dispatch) => {
    try {
        const res = await getDataAPI(`getpostsuser/${userId}`, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.GET_POST_USER, payload: {listPost: res.data.data}});
        }
    } catch (err) {
        console.log(err);
    }
}

export const deletePost = (postId, token) => async (dispatch) => {
    try {
        const res = await deleteDataAPI(`deletepostsuser/${postId}`, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.DELETE_POST, payload: {postId: postId}});
        }
    } catch (err) {
        console.log(err);
    }
}

export const updateTotalWatch = (data, token) => async (dispatch) => {
    try {
        await putDataAPI(`updatetotalwatch`, data, token);
    } catch (err) {
        console.log(err);
    }
}

export const deletePostCurrent = (postId, setPost, setMessage, token) => async (dispatch) => {
    try {
        const res = await deleteDataAPI(`deletepostsuser/${postId}`, token);
        if (res.data.status) {
            setPost(null);
            setMessage("Không tìm thấy bài viết");
        }
    } catch (err) {
        console.log(err);
    }
}