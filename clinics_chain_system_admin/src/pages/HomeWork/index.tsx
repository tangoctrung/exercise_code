import React, { useState } from 'react'
import { TeamOutlined, BankOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { LogoApp } from '../../assets/svg/LogoApp';
import { Button } from 'antd';
import { IMAGE_DEFAULT } from '../../constant';
import Infrastructure from '../Infrastructure';
import type { MenuProps } from 'antd';
import DiseaseStatistics from '../DiseaseStatistics';
import ManagerMoney from '../ManagerMoney';
import NumberOfVisits from '../NumberOfVisits';
import ViewRate from '../ViewRate';
import AddAccount from '../AddAccount';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuthUser, updateProfileUser } from '../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import ManagerClinics from '../ManagerClinics';
import KeToanTongTien from '../DiseaseStatistics/KeToanTongTien';
import KeToanTienDungcu from '../DiseaseStatistics/KeToanTienDungcu';

type MenuItem = Required<MenuProps>['items'][number];
const { Header, Content, Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}



const HomeWork: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { authUser } = useSelector((state: RootState) => state.user);

  const [tab, setTab] = useState<string>("1")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const items: MenuItem[] = [
    // getItem('Thông tin cá nhân', '1', <UserOutlined />),
    (authUser?.role === 3) ? getItem('Cơ sở vật chất', '2', <BankOutlined />) : null,
    authUser?.role !== 5 ? getItem('Thống kê', 'sub1', <AreaChartOutlined />, [
      getItem('Số lượt khám', '3'),
      getItem('Tiền thu chi', '4'),
      authUser?.role === 5 ? null : getItem('Thống kê dịch vụ', '5'),
    ]) : null,
    authUser?.role === 5 ? getItem('Thống kê', 'sub1', <AreaChartOutlined />, [
      getItem('Tiền dụng cụ', '9'),
      getItem('Tiền khám', '10'),
    ]) : null,
    authUser?.role === 5 ? null : getItem('Quản lý nhân sự', 'sub2', <TeamOutlined />, [
      getItem('Đánh giá bác sĩ', '6'),
      // getItem('Giờ làm việc', '7'),
      getItem('Đăng ký tài khoản', '7'),
    ]),
    authUser?.role !== 4 ? null : getItem('Quản lý phòng khám', '8', <TeamOutlined />),
  ];
  const handleSwitchTab = (e:any) => {
    setTab(e?.key) 
  }

  const handleLogout = () => {
    let data:any={
        userId: "",
        accessToken: "",
        refreshToken: "",
        email: "",
        role: 0,
    }
    let dataProfile:any={
        age: 0,
        dateOfBirth: "",
        email: "",
        firstName: "",
        gender: "",
        id: "",
        lastName: "",
        moreInfo: "",
        phoneNumber: "",
        address: "",
    }
    dispatch(updateAuthUser(data))
    dispatch(updateProfileUser(dataProfile))
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userId")
    navigate("/login")
}

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={300}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ padding: "20px", maxWidth: "300px" }}
      >
        <div className="mb-[20px] flex items-center">
          <LogoApp />
          <p className='text-lg text-white font-semibold ml-2'>eClinics</p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          onClick={handleSwitchTab}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} >
          <div className='w-full h-full flex justify-between px-10'>
            <div className='flex items-center'>
              <div className='w-[50px] h-[50px]'>
                <img src={IMAGE_DEFAULT} alt="" className='w-full h-full rounded-full object-cover' />
              </div>
              <div className='flex flex-col ml-[20px]'>
                <b className='leading-none mb-[6px] text-lg font-semibold'>{authUser?.email}</b>
                <span className='leading-none text-gray-400'>Chức danh: <b>{authUser?.role === 4 ? "Admin" : (authUser?.role === 3 ? "Quản lý chi nhánh" : "Kế toán")}</b></span>
              </div>
            </div>
            <div className='flex items-center'>
              <Button 
                type='primary'
                onClick={handleLogout}
              >Đăng xuất</Button>
            </div>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: colorBgContainer }} className="h-[calc(100vh-100px)]">
            {/* {tab==="1" && <Profile />} */}
            {tab==="2" && <Infrastructure />}
            {tab==="3" && <NumberOfVisits />}
            {tab==="4" && <ManagerMoney />}
            {tab==="5" && <DiseaseStatistics />}
            {tab==="6" && <ViewRate />}
            {/* {tab==="7" && <ViewTimeWork />} */}
            {tab==="7" && <AddAccount />}
            {tab==="8" && <ManagerClinics />}
            {tab==="9" && <KeToanTienDungcu />}
            {tab==="10" && <KeToanTongTien />}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>eClinics ©2023 Created by trungtn</Footer> */}
      </Layout>
    </Layout>
  );
};

export default HomeWork;