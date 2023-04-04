import './App.css';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { useEffect } from 'react';
import { getUser } from './redux/actions/authAction';
import Work from './pages/Work/Work';
import ViewPersonDetail from './pages/ViewPersonDetail/ViewPersonDetail';
import Profile from './pages/Profile/Profile';
import PostSaved from './pages/PostSaved/PostSaved';
import WritePost from './pages/WritePost/WritePost';
import PostDetail from './pages/PostDetail/PostDetail';

function App() {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    
    // mỗi lần reload trang WEB gọi API lấy thông tin user
    useEffect(() => {
        if (auth.accessToken) {
            dispatch(getUser(auth.accessToken));
        }
    }, [dispatch, auth.accessToken])


    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/login" exact element={ !auth.accessToken ? <Login /> : <Navigate to="/work" /> } />
                    {/* <Route path="/register" exact element={ !auth.accessToken ? <Register /> : <Navigate to="/" /> } /> */}
                    <Route path="/" exact element={ <Home /> } />
                    <Route path="/work" exact element={ auth.accessToken ? <Work /> : <Navigate to="/login" /> } />
                    <Route path="/profile/:id" exact element={ auth.accessToken ? <Profile /> : <Navigate to="/login" /> } />
                    <Route path="/postsaved" exact element={ auth.accessToken ? <PostSaved /> : <Navigate to="/login" /> } />
                    <Route path="/writepost" exact element={ auth.accessToken ? <WritePost /> : <Navigate to="/login" /> } />
                    <Route path="/postDetail/:id" exact element={<PostDetail /> } />
                    <Route path="/viewpersondetail/:id" exact element={ auth.accessToken ? <ViewPersonDetail /> : <Navigate to="/login" /> } />
                    <Route path="*" exact element={ auth.accessToken ? <PageNotFound /> : <Navigate to="/login" /> } />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
