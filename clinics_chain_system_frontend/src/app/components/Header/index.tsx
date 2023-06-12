import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { LogoApp } from '../Icons/LogoApp';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch } from 'react-redux';
import { updateAuthUser, updateProfileUser } from '../../store/features/userSlice';




function Header() {

    const navigate = useNavigate();
    const [isDesktopHeader, setIsDesktopHeader] = useState(window.window.innerWidth <= 1024 ? false : true);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const { t } = useTranslation("translation", { keyPrefix: 'page.home.header'});
    const { authUser } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch()

    const menuHeader = [
        {
            name: 'Giới thiệu',
            path: '#introduction',
        },
        {
            name: 'Cơ sở',
            path: '#facilities',
        },
        {
            name: 'Chuyên môn',
            path: '#speciality',
        },
        {
            name: 'Hỏi đáp',
            path: '#askDoctos',
        },
        {
            name: 'Đánh giá',
            path: '#review',
        },
    ]


    useEffect(() => {
        if (window.window.innerWidth <= 1350) {
            setIsDesktopHeader(false)
        }
        window.addEventListener("resize", (event: any) => {
            if (event?.target?.innerWidth <= 1350) {
                setIsDesktopHeader(false);
            } else {
                setIsDesktopHeader(true)
            }
        });
    }, [])

    const handleSwitchWork = () => {
        if (authUser?.role === 0) {
            navigate("/user")
        } else if (authUser?.role === 1){
            navigate("/doctor")
        }
    }

    const handleCloseDrawer = () => {
        setIsShowMenu(false);
    }

    const list = (anchor: string) => (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleCloseDrawer}
          onKeyDown={handleCloseDrawer}
        >
          <List>
            {menuHeader?.map((item:any, index:number) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item?.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
            {!authUser?.userId ? 
                <div>
                    <div className="header_menu_tablet_listItem_button">
                        <Button 
                            variant="contained" color="primary"
                            onClick={() => navigate("/login")}
                        >
                        {t('login')}
                        </Button>
                    </div>
                    <div className="header_menu_tablet_listItem_button">
                        <Button 
                            variant="contained" color="primary"
                            onClick={() => navigate("/register")}
                        >
                        {t('register')}
                        </Button>
                    </div>
                </div>: 
                <div className='ml-[12px]'>
                    <Button variant='text' onClick={handleSwitchWork}> 
                        <HomeWorkRoundedIcon style={{fontSize: "32px"}} /> <p className='ml-[6px] text-base'>Trang làm việc</p> 
                    </Button>
                    <Button variant='contained' style={{marginLeft: "10px", marginTop: "20px"}} onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </div>}
          <Divider />
        </Box>
    );

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
    <div className='header'>
        <div className='header_logo' onClick={() => navigate("/")}>
            <div className='header_logo_img'>
                <LogoApp className='header_image_logo' />
            </div>
            <span>eClinics</span>
        </div>
        {isDesktopHeader ?
            <>
                <div className='header_menu'>
                    {menuHeader && menuHeader.map((menu, index) => (
                        <div key={index} className="header_menu_item">
                            <a href={menu.path}>{menu.name}</a>
                        </div>
                    ))}
                </div>
                {!authUser?.userId ?
                    <div className='header_profile'>
                        <Button 
                            variant="contained" color="primary"
                            onClick={() => navigate("/login")}
                        >
                        {t('login')}
                        </Button>
                        <div></div>
                        <Button 
                            variant="contained" color="primary"
                            onClick={() => navigate("/register")}
                        >
                        {t('register')}
                        </Button>
                    </div> :
                    <div className='flex items-center justify-center min-w-[25%]'>
                        <Button variant='text' onClick={handleSwitchWork}> 
                            <HomeWorkRoundedIcon style={{fontSize: "32px"}} /> <p className='ml-[6px] text-base'>Trang làm việc</p> 
                        </Button>
                        <Button variant='contained' style={{marginLeft: "10px"}} onClick={handleLogout}>
                            Đăng xuất
                        </Button>
                    </div>} 
            </> :
            <div className='header_menu_tablet'>
                <div className="header_menu_tablet_content" onClick={() => setIsShowMenu(!isShowMenu)}> 
                    {!isShowMenu ? 
                        <>
                            <MenuIcon style={{ fontSize: "32px", fontWeight: 600, marginRight: '6px' }} /> Menu
                        </> : 
                        <>
                            <CloseIcon style={{ fontSize: "36px", fontWeight: 600 }}/>
                        </>}
                </div>
                {isShowMenu &&          
                    <Drawer
                        anchor="right"
                        open={isShowMenu}
                        onClose={handleCloseDrawer}
                    >
                        {list("right")}
                    </Drawer>}
            </div>
        }
    </div>
  )
}

export default Header