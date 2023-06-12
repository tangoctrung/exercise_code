import React, { useState } from 'react'
import Header from '../../components/Header';
import useGetInfoDoctor from '../../hooks/useGetInfoDoctor';
import LeftBarDoctor from './components/LeftBar';
import Notification from './components/Notification';
import ProfileDoctor from './components/ProfileDoctor';
import TimeWork from './components/TimeWork';
import Treatment from './components/Treatment';
import { useLocation } from 'react-router-dom';

function Doctor() {
    const [tabSelect, setTabSelect] = useState("profile");
    const { search } = useLocation();
    console.log(search);
    
    const { dataProfile } = useGetInfoDoctor();
  return (
    <div className="layout pt-[70px]">
      <div className=''>
        {" "}
        <Header />{" "}
      </div>

      <div className='flex h-[calc(100vh-70px)]'>
        <div className='min-w-[260px] xl:min-w-[320px]'>
            <LeftBarDoctor tabSelect={tabSelect} setTabSelect={setTabSelect} />
        </div>

        <div className='w-full min-h-full bg-gray-100'>
            {tabSelect==="profile" && <ProfileDoctor dataProfile={dataProfile} />}
            {tabSelect==="timework" && <TimeWork />}
            {tabSelect==="notification" && <Notification />}
            {tabSelect==="treatment" && <Treatment />}
        </div>

      </div>

    </div>
  )
}

export default Doctor;