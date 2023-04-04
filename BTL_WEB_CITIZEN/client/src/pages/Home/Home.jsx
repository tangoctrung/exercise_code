import React, { useEffect } from 'react';
import "./Home.css";
import ListPost from '../../components/ListPost/ListPost';
import * as ACTIONS from "../../redux/constants/userContant";
import { useDispatch, useSelector } from 'react-redux';
import Topbar from '../../components/Topbar/Topbar';
import { getAllPosts, getHotPosts, getCodenamePosts, deletePost, updateTotalWatch } from "../../redux/actions/postAction";


function Home() {

    const dispatch = useDispatch();
    const { auth, user, post } = useSelector(state => state);
    const codeName = auth?.user?.typeAccount === "A1" ? "Quốc gia" : auth?.user?.position.split("tế ")[1];

    const handleChangeArticleView = (s) => {
        dispatch({type: ACTIONS.ARTICLE_VIEW, payload: {
            articleView: s,
        }});
    }

    useEffect(() => {
        if (user?.articleView === "1") {
            dispatch(getAllPosts(auth?.accessToken));
        } else if (user?.articleView === "2") {
            dispatch(getHotPosts(auth?.accessToken));
        } else if (user?.articleView === "3") {
            dispatch(getCodenamePosts(codeName, auth?.accessToken));
        }
    }, [user?.articleView])

    return (
        <div className="home">
            <div className="home-top">
                <Topbar />
            </div>
            <div className="home-news">
                <h1>Tin tức</h1>
                <div className="home-news-content">
                    <div className="home-news-menu">
                        <div className="home-news-item">
                            <span 
                                title="Tin tức đăng gần đây"
                                className={user.articleView==='1' ? "home-news-item-isActive" : ""}
                                onClick={() => handleChangeArticleView('1')}
                            >
                                Mới nhất
                            </span>
                        </div>
                        <div className="home-news-item">
                            <span 
                                title="Tin tức được nhiều người xem nhất"
                                className={user.articleView==='2' ? "home-news-item-isActive" : ""}
                                onClick={() => handleChangeArticleView('2')}
                            >
                                Hot nhất
                            </span>
                        </div>
                        
                    </div>
                    <div className="home-news-listPost">
                        { user?.articleView ==="1" && post?.allPosts.length > 0 && <ListPost dataPost={post?.allPosts} />}
                        { user?.articleView ==="1" && post?.allPosts.length <= 0 && <p>Không có bài viết nào</p>}
                        { user?.articleView ==="2" && post?.hotPosts.length > 0 && <ListPost dataPost={post?.hotPosts} />}
                        { user?.articleView ==="2" && post?.hotPosts.length <= 0 && <p>Không có bài viết nào</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
