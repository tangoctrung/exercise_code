import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../endpoint/auth";
import EmailIcon from '@mui/icons-material/Email';
// import Logo from "../../../../assets/images/logo.png";
// import { LogoApp } from "../../../components/Icons/LogoApp";

interface DataRegister {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: string,
  confirmPassword: string,
}

interface DataRequestRegister {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: string,
  age: number,
  address: string,
}

function Register() {
  const { t } = useTranslation("translation", { keyPrefix: "page.auth" });
  const navigate = useNavigate();
  const [dataRegister, setDataRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  })
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInfo = (e: any) => {
    setDataRegister({
      ...dataRegister,
      [e?.target?.name]: e?.target?.value
    })
    
  }

  const validateForm = (data: DataRegister) => {
    if (data.confirmPassword === "" || data.firstName === "" || data.email === "" 
      || data.lastName === "" || data.password === "" || data.phoneNumber === "") 
    {
      return "Bạn chưa điền đầy đủ thông tin, hãy kiểm tra lại"
    }
    if (data?.email?.indexOf("@") <= 0) {
      return "Email không hợp lệ, hãy kiểm tra lại"
    }
    if (data.password?.length < 8) {
      return "Mật khẩu phải có ít nhất 8 ký tự"
    }
    if (data.password !== data.confirmPassword) {
      return "Mật khẩu bạn nhập lại không đúng, hãy kiểm tra lại"
    }
    return "";
  }

  const handleRegister = () => {
    let message:string = validateForm(dataRegister);
    console.log(message);
    
    if (message !== "") {
      setMessage(message)
      setOpenSnackbar(true)
      return;
    }
    setIsLoading(true);
    let dataRequest: DataRequestRegister = {
      age: 10,
      address: "Trần Bình, Mai Dịch, Hà Nội",
      email: dataRegister?.email || "",
      firstName: dataRegister?.firstName || "",
      lastName: dataRegister?.lastName || "",
      password: dataRegister?.password || "",
      phoneNumber: dataRegister?.phoneNumber || ""
    }

    registerUser(dataRequest)
      .then((res) => {
        if (res?.data?.code === 200) {
          setOpenDialog(true)
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setMessage("Bạn hãy check email, có thể nó đã tồn tại");
        setOpenSnackbar(true)
        setIsLoading(false);
      })
    
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }
  const handleSwitchLogin = () => {
    navigate("/login");
  };


  return (
    <div className="register">
      <FormControl className="register_form">
        <div className="register_form_title flex flex-col items-center">
          {/* <LogoApp className='header_image_logo' style={{fontSize: "48px"}} /> */}
          <p>{t("register")} eClinics</p>
        </div>
        <div className="register_form_name">
          <div className="register_form_name_content">
            <TextField
              onChange={handleChangeInfo}
              name="firstName"
              required
              id=""
              className="input_register_name"
              label="First name"
            />
            <p className="kc"></p>
            <TextField
              onChange={handleChangeInfo}
              name="lastName"
              required
              id=""
              className="input_register_name"
              label="Last name"
            />
          </div>
        </div>
        <div className="register_form_email">
          <TextField
            onChange={handleChangeInfo}
            name="phoneNumber"
            required
            id=""
            className="input_register"
            label="Phone"
          />
        </div>
        <div className="register_form_email">
          <TextField
            onChange={handleChangeInfo}
            name="email"
            required
            id=""
            className="input_register"
            label="Email address"
          />
        </div>
        <div className="register_form_password">
          <TextField
            type="password"
            onChange={handleChangeInfo}
            name="password"
            required
            id=""
            className="input_register"
            label="Password"
          />
        </div>
        <div className="register_form_password">
          <TextField
            type="password"
            onChange={handleChangeInfo}
            name="confirmPassword"
            required
            id=""
            className="input_register"
            label="Confirm password"
          />
        </div>
        <div className="register_form_submit">
            <Button 
              variant="contained" color="primary" 
              className="button_submit"
              onClick={handleRegister}
            >
              Submit
            </Button>
        </div>
        <div className="register_form_forget">
          <div className="register_form_forget_content">
            <p onClick={() => handleSwitchLogin()}>{t("haveAccount")}</p>
          </div>
        </div>
        <div className="register_form_description">
          <p>Copyright © Celincis 2022.</p>
        </div>
      </FormControl>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        // message={message}
        // action={action}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          <div>
            <h2><EmailIcon style={{fontSize: "36px"}} /> Xác thực mail</h2>
          </div>
        </DialogTitle>
        <DialogContent>
            <div className="text-lg font-medium">
              Thông báo xác thực mail sẽ được gửi về hòm thư của bạn. Hãy kiểm tra và xác thực email.
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Register;
