import React from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PunchClockRoundedIcon from '@mui/icons-material/PunchClockRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { IMAGE_DEFAULT } from '../../../../constant';

function LeftBarDoctor(props: any) {
    const { profileUser } = useSelector((state:RootState) => state.user)
    const {tabSelect, setTabSelect} = props;
    const handleClickTab = (value:string) => {
        if (tabSelect !== value) {
            setTabSelect(value);
        }
    }
    return (
        <div className='pt-10 bg-slate-400 max-w-xs h-full'>
            <div className='flex items-center mb-10 pl-4'>
                <div className='w-16 h-16'>
                    <img 
                        className='w-full h-full object-cover rounded-full'
                        src={profileUser?.avatarUrl || IMAGE_DEFAULT} alt="" />
                </div>
                <div className='ml-4'>
                    <p className='font-semibold text-xl'>{profileUser?.firstName + " " + profileUser?.lastName}</p>
                    <p className=''>{profileUser?.specialistIn || ""}</p>
                </div>
            </div>
            <div 
                onClick={() => handleClickTab("profile")}
                className={`flex items-center w-full pt-5 pb-5 pl-10 cursor-pointer mb-2  ${tabSelect === "profile" ? 'bg-gray-100' : ''}`}>
                <AccountCircleRoundedIcon className='mr-2' style={{ fontSize: "30px"}} />
                <p className='font-semibold'>Thông tin cá nhân</p>
            </div>
            <div 
                onClick={() => handleClickTab("timework")}
                className={`flex items-center w-full pt-5 pb-5 pl-10 cursor-pointer mb-2 ${tabSelect === "timework" ? 'bg-gray-100' : ''}`}
            >
                <PunchClockRoundedIcon className='mr-2' style={{ fontSize: "30px"}} />
                <p className='font-semibold'>Thời gian làm việc</p>
            </div>
            <div 
                onClick={() => handleClickTab("notification")}
                className={`flex items-center w-full pt-5 pb-5 pl-10 cursor-pointer mb-2 ${tabSelect === "notification" ? 'bg-gray-100' : ''}`}
            >
                <NotificationsRoundedIcon className='mr-2' style={{ fontSize: "30px"}} />
                <p className='font-semibold'>Thông báo</p>
            </div>
            <div 
                onClick={() => handleClickTab("treatment")}
                className={`flex items-center w-full pt-5 pb-5 pl-10 cursor-pointer mb-2 ${tabSelect === "treatment" ? 'bg-gray-100' : ''}`}
            >
                <AccountTreeRoundedIcon className='mr-2' style={{ fontSize: "30px"}} />
                <p className='font-semibold'>Khám bệnh</p>
            </div>
        </div>
    )
}

export default LeftBarDoctor;