import { Button, Input, notification } from 'antd'
import React, { useState, useMemo }  from 'react'
import { createAccountKetoan } from '../../../endpoint/user'
import { NotificationPlacement } from 'antd/es/notification/interface';
const Context = React.createContext({ name: 'Default' });


function FormKetoan() {
    const [dataRequest, setDataRequest] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        branchdId: ""
    })
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement) => {
        api.success({
        message: `Thông báo tài khoản`,
        description: <Context.Consumer>{({ name }) => `Tạo tài khoản thành công!`}</Context.Consumer>,
        placement,
        });
    };
    const openNotificationFail = (placement: NotificationPlacement) => {
        api.error({
        message: `Thông báo tài khoản`,
        description: <Context.Consumer>{({ name }) => `Tạo tài khoản kế toán thất bại`}</Context.Consumer>,
        placement,
        });
    };
    const handleChangeInfo = (e:any) => {
        setDataRequest({
            ...dataRequest,
            [e.target.name]: e.target.value,
        })
    }

    const handleCreateAccount = () => {
        console.log(dataRequest);
        createAccountKetoan(dataRequest)
            .then((res) => {
                console.log(res);
                openNotification('topRight')
                setDataRequest({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    branchdId: ""
                })
            })
            .catch((err) => {
                console.log(err);
                openNotificationFail('topRight')
            })
    }
    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <Context.Provider value={contextValue}>
        {contextHolder}
        <div>
            <div className='mb-[20px] flex justify-between'>
                <Input 
                    placeholder="FirstName" size='large'
                    name='firstName'
                    className='mr-[10px]'
                    onChange={handleChangeInfo}
                    value={dataRequest?.firstName}
                />
                <Input 
                    placeholder="LastName" size='large'
                    name='lastName'
                    onChange={handleChangeInfo}
                    value={dataRequest?.lastName}
                />
            </div>
            <div className='mb-[20px]'>
                <Input 
                    placeholder="Email" size='large' 
                    name='email'
                    onChange={handleChangeInfo}
                    value={dataRequest?.email}
                />
            </div>
            <div className='mb-[20px]'>
                <Input.Password  
                    placeholder="Password" size='large'
                    name='password'
                    onChange={handleChangeInfo}
                    value={dataRequest?.password}
                />
            </div>
        
            <div className='flex justify-center'>
            <Button 
                className='h-[44px] w-[120px]' type='primary' size='large'
                onClick={handleCreateAccount}
            >Tạo tài khoản</Button>
            </div>
        </div>
    </Context.Provider>
  )
}

export default FormKetoan