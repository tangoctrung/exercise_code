import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField'
import { Alert, Button, FormControl, Snackbar } from "@mui/material";
import { LogoApp } from "../../../components/Icons/LogoApp";
import { loginUser } from "../../../endpoint/auth";
import { useDispatch } from "react-redux";
import { updateAuthUser } from "../../../store/features/userSlice";
import jwt_decode from "jwt-decode";
import { TOKEN_FAKE } from "../../../constant";

interface DataLogin {
  email: string,
  password: string,
}

function Login() {
  const { t } = useTranslation("translation", { keyPrefix: "page.auth" });
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  })
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

  const handleChangeInfo = (e: any) => {
    setDataLogin({
      ...dataLogin,
      [e?.target?.name]: e?.target?.value
    })
  }

  const validateForm = (data: DataLogin) => {
    if (data.email === "" || data.password === "") 
    {
      return "Bạn chưa điền đầy đủ thông tin, hãy kiểm tra lại"
    }
    // if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
    //   return "Email không hợp lệ, hãy kiểm tra lại"
    // }
    if (data.password?.length < 8) {
      return "Mật khẩu không hợp lệ, hãy kiểm tra lại"
    }
    return "";
  }

  const handleLogin = () => {
    let message:string = validateForm(dataLogin);
    if (message !== "") {
      setMessage(message)
      setOpenSnackbar(true)
      return;
    }
    setIsLoading(true);
    
    loginUser(dataLogin)
      .then((res) => {
        if (res?.data?.code === 200) {
          let dataUser:any = res?.data?.data;
          let decoded:any = jwt_decode(dataUser?.accessToken?.split(" ")[1] || TOKEN_FAKE)
          let data:any={
            userId: dataUser?.userId,
            accessToken: dataUser?.accessToken?.split(" ")[1],
            refreshToken: dataUser?.refreshToken?.split(" ")[1],
            email: dataUser?.email,
            role: decoded?.Role || 0,
          }
          dispatch(updateAuthUser(data))
          localStorage.setItem("accessToken", dataUser?.accessToken?.split(" ")[1])
          localStorage.setItem("refreshToken", dataUser?.refreshToken?.split(" ")[1])
          localStorage.setItem("userId", dataUser?.userId)

          navigate("/")
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setOpenSnackbar(true)
        setMessage("Đăng nhập thất bại, hãy xem lại email và mật khẩu");
        setIsLoading(false);
      })
    
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleSwitchRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <FormControl className="login_form">
        <div className="login_form_title flex flex-col items-center">
          <LogoApp className='header_image_logo' style={{fontSize: "48px"}} />
          <p>{t("login")}</p>
        </div>
        <div className="login_form_email">
          <TextField
            onChange={handleChangeInfo}
            name="email"
            required
            id=""
            className="input_login"
            label="Email address"
          />
        </div>
        <div className="login_form_password">
          <TextField
            onChange={handleChangeInfo}
            type="password"
            name="password"
            required
            id=""
            className="input_login"
            label="Password"
          />
        </div>
        <div className="login_form_submit">
            <Button variant="contained" color="primary" className="button_submit" onClick={handleLogin}>
              Submit
            </Button>
        </div>
        <div className="login_form_forget">
          <div className="login_form_forget_content">
            <div><p onClick={() => handleSwitchRegister()}>{t("haveNotAccount")}</p></div>
          </div>
        </div>
        <div className="login_form_description">
          <p>Copyright © eClinics 2022.</p>
        </div>
      </FormControl>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
