import { Input, notification } from 'antd'
import React, { useMemo, useState } from 'react'
import { LogoApp } from '../../assets/svg/LogoApp'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../endpoint/auth';
import jwt_decode from "jwt-decode";
import { TOKEN_FAKE } from '../../constant';
import { updateAuthUser } from '../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { NotificationPlacement } from 'antd/es/notification/interface';
const Context = React.createContext({ name: 'Default' });

function Login() {
    const [api, contextHolder] = notification.useNotification();

    const [dataLogin, setDataLogin] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const openNotificationFail = (placement: NotificationPlacement) => {
        api.error({
        message: `Thông báo Đăng nhập`,
        description: <Context.Consumer>{({ name }) => `Đăng nhập thất bại, hãy xem lại email và mật khẩu`}</Context.Consumer>,
        placement,
        });
    };
    const openNotificationLogin = (placement: NotificationPlacement) => {
      api.error({
      message: `Thông báo Đăng nhập`,
      description: <Context.Consumer>{({ name }) => `Bạn không có quyền đăng nhập với tài khoản này`}</Context.Consumer>,
      placement,
      });
  };
    const handleChangeInfo = (e: any) => {
        setDataLogin({
          ...dataLogin,
          [e?.target?.name]: e?.target?.value
        })
      }
    
      const validateForm = (data:any) => {
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
            console.log("message: ", message);
            
          return;
        }
        setIsLoading(true);
        
        loginUser(dataLogin)
          .then((res) => {
            if (res?.data?.code === 200) {
              let dataUser:any = res?.data?.data;
              let decoded:any = jwt_decode(dataUser?.accessToken?.split(" ")[1] || TOKEN_FAKE)
              console.log(decoded);
              
              if (decoded?.Role !== 3 && decoded?.Role !== 4 && decoded?.Role !== 5) {
                openNotificationLogin("topRight")
                return
              }
              
              let data:any={
                userId: dataUser?.userId,
                accessToken: dataUser?.accessToken?.split(" ")[1],
                refreshToken: dataUser?.refreshToken?.split(" ")[1],
                email: dataUser?.email,
                role: decoded?.Role || 3,
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
            // setMessage(err);
            openNotificationFail("topRight")
            setIsLoading(false);
          })
        
      }
      const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
          <div className='w-[500px] h-fit rounded-lg shadow-md p-5'>
              <div className='w-full flex justify-center'>
                  <div className='flex items-center'>
                      <LogoApp />
                      <p className='ml-3 font-semibold text-2xl'>eClinics</p>
                  </div>
              </div>
              <p className='italic text-gray-300 mt-2'>Đăng nhập hệ thống với tư cách admin hoặc quản lý chi nhánh</p>
              <div className='mt-[40px]'>
                  <div className='flex justify-center'>
                      <Input 
                          placeholder="Nhập username hoặc email" 
                          size='large' style={{ width: "80%", height: "50px" }} 
                          name='email'
                          onChange={handleChangeInfo}
                      />
                  </div>
                  <div className='mt-[20px] flex justify-center'>
                      <Input.Password
                          placeholder="Nhập password"
                          size='large'
                          style={{ width: "80%", height: "50px" }} 
                          name='password'
                          onChange={handleChangeInfo}
                          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                  </div>
              </div>
              <div className='mt-[30px] flex justify-center'>
                  <Button 
                      type="primary" size='large' 
                      style={{ width: "40%", height: "50px" }}
                      onClick={handleLogin}
                  >
                      Đăng nhập
                  </Button>
              </div>
          </div>
      </div>
    </Context.Provider>
  )
}

export default Login