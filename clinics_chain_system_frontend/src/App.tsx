import React, { useEffect } from 'react';
import './index.css';
import './assets/styles/index.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './app/pages/home';
import Login from './app/pages/auth/login';
import Register from './app/pages/auth/register';
import ProfileUser from './app/pages/users/profileUser';
import PageNotFound from './app/pages/404';
import './app/utils/i18n';
import TestPage from './app/pages/test';
import Doctor from './app/pages/doctors';
import ActiveAccount from './app/pages/auth/activeEmail';
import { useSelector } from 'react-redux';
import { RootState } from './app/store/store';
import { useDispatch } from 'react-redux';
import { updateAuthUser } from './app/store/features/userSlice';
import { TOKEN_FAKE } from './app/constant';
import jwt_decode from "jwt-decode";


const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
          {/* <Routes>
            <Route path="/login" element={ !token ? <Login /> : <Navigate to="/" />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/active-account" element={ <ActiveAccount />} />
            <Route path="/register" element={ <Register />} />
            <Route path="/user" element={ token ? <ProfileUser /> : <Navigate to="/login" /> } />
            <Route path="/doctor" element={ token ? <Doctor /> : <Navigate to="/login" /> } />
            <Route path="/test" element={ <TestPage />} />
            <Route path="*" element={ <PageNotFound />} />
          </Routes> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/active-account" element={ <ActiveAccount />} />
            <Route path="/register" element={ <Register />} />
            <Route path="/user" element={ <ProfileUser />  } />
            <Route path="/doctor" element={ <Doctor /> } />
            <Route path="/test" element={ <TestPage />} />
            <Route path="*" element={ <PageNotFound />} />
          </Routes>
    </ThemeProvider>
  );
}

export default App;
