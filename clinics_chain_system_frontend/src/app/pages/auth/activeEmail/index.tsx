import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmailUser } from "../../../endpoint/auth";


function ActiveAccount() {
//   const { t } = useTranslation("translation", { keyPrefix: "page.auth" });
  const navigate = useNavigate();
  const [query] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false);
  const [dataOTP, setDataOTP] = useState({
    otpId: "",
    otp: "",
  })
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  useEffect(() => {
    setDataOTP({
        otp: query.get("otp") || "",
        otpId: query.get("otpId") || "",
    })
  }, [query])

  const handleVerifyEmail = () => {
    verifyEmailUser(dataOTP)
      .then((res) => {
        if (res?.data?.code === 200) {
            navigate("/login");
        } else {
            setOpenSnackbar(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        // setMessage(err);
        setOpenSnackbar(true);
        setIsLoading(false);
      })
  }
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleBackHome = () => {
    navigate("/");
  }

  return (
    <div className="active_email h-[100vh] w-[100vw] flex justify-center">
        <div className="mt-[50px] h-[200px] w-[400px] p-[20px] rounded-lg  shadow-md">
            <h2>Xác thực email</h2>
            <p>Bạn hãy click vào button <b>Active</b> dưới đây để verify email của bạn</p>
            <div className="flex mt-[20px]">
                <Button variant="contained" 
                    onClick={handleVerifyEmail}
                >Active</Button>
                <div className="mr-[20px]"></div>
                <Button variant="text" 
                    onClick={handleBackHome}
                >Quay về Trang chủ</Button>
            </div>
        </div>
        <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            // message={message}
            // action={action}
        >
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                Xác thực email thất bại, hãy thử lại
            </Alert>
      </Snackbar>
    </div>
  );
}

export default ActiveAccount;
