import { Button, Input } from 'antd'
import React from 'react'
import { IMAGE_DEFAULT } from '../../constant'
import { UserOutlined, BankOutlined, AreaChartOutlined } from '@ant-design/icons';

function Profile() {
  return (
    <div className='flex justify-center '>
      <div className='flex flex-col items-center justify-center w-[500px] h-auto p-[20px] bg-[#f5f5f5] rounded-lg shadow-sm'>
        <div className='w-36 h-36 relative'>
          <img 
            src={IMAGE_DEFAULT} alt="" 
            className='w-full h-full rounded-full object-cover'
          />
          <input type="file" hidden accept="image/*"  id="icon-button-file" />
          <label className='absolute top-0 left-0 w-full h-full' htmlFor="icon-button-file"></label>
        </div>
        <div className='w-full'>
          <div className='mt-[30px]'>
            <p className='italic text-gray-500'>Họ và tên: </p>
            <Input size="large" style={{ height: "45px" }} placeholder="" prefix={<UserOutlined />} />
          </div>
          <div className='mt-[10px]'>
             <p className='italic text-gray-500'>Email: </p>
            <Input size="large" style={{ height: "45px" }} placeholder="" prefix={<UserOutlined />} />
          </div>
          <div className='mt-[10px]'>
             <p className='italic text-gray-500'>SĐT: </p>
            <Input size="large" style={{ height: "45px" }} placeholder="" prefix={<UserOutlined />} />
          </div>
          <div className='mt-[10px]'>
             <p className='italic text-gray-500'>Địa chỉ: </p>
            <Input size="large" style={{ height: "45px" }} placeholder="" prefix={<UserOutlined />} />
          </div>
          <div className='mt-[20px] flex justify-center'>
            <Button type="primary" style={{ width: "150px", height: "44px" }}>Chỉnh sửa</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile