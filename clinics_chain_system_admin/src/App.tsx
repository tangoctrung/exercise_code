import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import HomeWork from './pages/HomeWork';
import Login from './pages/auth/Login';
import PageNotFound from './pages/PageNotFound';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { TOKEN_FAKE } from './constant';
import jwt_decode from "jwt-decode";
import { updateAuthUser } from './store/features/userSlice';

// REACT_APP_API_URL=http://apigateway-xplat-sm.apps.xplat.fis.com.vn/
function App() {

  const navigate = useNavigate();
  const { authUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch()
  const token = localStorage.getItem("accessToken")

  
  useEffect(() => {
    if (!authUser?.accessToken) {
      let accessToken = localStorage.getItem("accessToken") || TOKEN_FAKE;
      let decoded:any = jwt_decode(accessToken);
      // let path:string = "/";
      // if (!decoded?.Email && (window.location.pathname !== "" || window.location.pathname !== path)) {
      //   navigate("/login");
      //   return;
      // }
      let data:any={
        userId: decoded?.ID,
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
        email: decoded?.Email,
        role: decoded?.Role || 0,
      }
      dispatch(updateAuthUser(data))
    }
  }, [])

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" /> } />
      <Route path="/" element={token ? <HomeWork /> : <Navigate to="/login" />} />
      <Route path="*" element={ <PageNotFound />} />
    </Routes>
  );
}

export default App;
