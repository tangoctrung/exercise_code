import * as ACTIONS from '../constants/postContant';


const initialState = {
    allPosts: [],  // tất cả bài viết
    hotPosts: [],  // bài viết mới nhất
    codenamePosts: [], // bài viết thuộc tỉnh của người dùng
    userPosts: [], // bài viết của 1 user
    messagePost: "Không tìm thấy bài viết nào.", // message thông báo không tìm thấy bài post nào.
};


const post = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_POST: 
            return {
                ...state,
                allPosts:  state.allPosts.unshift(action.payload.post),
            }
        case ACTIONS.GET_POST_ALL: 
            return {
                ...state,
                allPosts: action.payload.listPost,
            }
        case ACTIONS.GET_POST_HOT: 
            return {
                ...state,
                hotPosts: action.payload.listPost,
            }
        case ACTIONS.GET_POST_CODENAME: 
            return {
                ...state,
                codenamePosts: action.payload.listPost,
            }
        case ACTIONS.GET_POST_USER: 
            return {
                ...state,
                userPosts: action.payload.listPost,
            }
        case ACTIONS.MESSAGE_POST:
            return {
                ...state,
                messagePost: action.payload.message,
            }
        case ACTIONS.DELETE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter(
                    (post) => post._id !== action.payload.postId
                ),
            }

        default:
            return state;
    }
}
export default post;