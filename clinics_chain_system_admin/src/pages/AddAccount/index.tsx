import { Button, Input, Select, Tabs, TabsProps, notification } from 'antd'
import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import FormBM from './components/FormBM';
import FormKetoan from './components/FormKetoan';
import FormBranch from './components/FormBranch';
import { createAccountDoctor, getBranchId, getBranchs } from '../../endpoint/user';
import { NotificationPlacement } from 'antd/es/notification/interface';
const Context = React.createContext({ name: 'Default' });

function AddAccount() {

  const [dataBranchs, setDataBranchs] = useState<any>([])
  const { authUser } = useSelector((state: RootState) => state.user);
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
    description: <Context.Consumer>{({ name }) => `Tạo tài khoản thất bại`}</Context.Consumer>,
    placement,
    });
  };

  const [dataRequest, setDataRequest] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    branchId: "",
    phoneNumber: ""
  })
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Quản lý chi nhánh`,
      children: <FormBM dataBranchs={dataBranchs}/>,
    },
    {
      key: '2',
      label: `Kế toán`,
      children: <FormKetoan />,
    },
  ];
  useEffect(() => {
    getBranchId()
      .then((res) => {
        setDataRequest({
          ...dataRequest,
          branchId: res?.data?.data?.branchId
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  // const handleChange = (value: string) => {
  //   console.log(`selected ${value}`);
  //   setDataRequest({
  //       ...dataRequest,
  //       branchId: value
  //   })
  // };

  useEffect(() => {
    getBranchs()
      .then((res:any) => {
          console.log(res?.data?.data?.branches);
          let data = [...res?.data?.data?.branches]
          let data1:any = []
          data?.map((item:any, index:any) => {
              data1.push({value: item?.id, label: item?.branchName})
          })
          setDataBranchs(data1)
      })
      .catch((err) => {
          console.log(err);
      })
  }, [])

  const handleChangeInfo = (e:any) => {
    setDataRequest({
        ...dataRequest,
        [e.target.name]: e.target.value,
    })
  }

  const handleCreateAccount = () => {
    console.log(dataRequest);
    createAccountDoctor(dataRequest)
      .then((res) => {
          console.log(res);
          openNotification('topRight')
          setDataRequest({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            branchId: "",
            phoneNumber: ""
          })
      })
      .catch((err) => {
          console.log(err);
          openNotificationFail("topRight")
      })
  }
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className='flex justify-center mt-[100px]'>
        {authUser?.role === 3 ? 
          <div className='bm w-[400px] p-[20px] bg-[#f5f5f5] rounded-lg shadow-md'>
            <h2 className='text-center mb-[20px]'>Tạo tài khoản bác sĩ</h2>
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
                placeholder="Số điện thoại" size='large' 
                name='phoneNumber'
                onChange={handleChangeInfo}
                value={dataRequest?.phoneNumber}
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
            {/* <div className='mb-[20px]'>
              <Select
                  defaultValue="Chọn chi nhánh"
                  size='large'
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  options={dataBranchs}
              />
            </div> */}
            <div className='flex justify-center'>
              <Button 
                className='h-[44px] w-[120px]' type='primary' size='large'
                onClick={handleCreateAccount}
              >Tạo tài khoản</Button>
            </div>
          </div> :
          <div className='admin  w-[400px] p-[20px] bg-[#f5f5f5] rounded-lg shadow-md'>
            <h2 className='text-center mb-[20px]'>Tạo tài khoản</h2>
            <div>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
          </div>
        }

      </div>
    </Context.Provider>
  )
}

export default AddAccount
