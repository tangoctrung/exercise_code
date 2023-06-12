import React from 'react'

function ItemNotification({noti}: {noti:any}) {
  return (
    <div className="relative flex justify-between items-center p-[20px] cursor-pointer rounded-xl transition-all duration-300 ease-in hover:bg-gray-200">
      {/* <div className='flex w-[95%]'>
        <div className='flex items-center mr-[30px] min-w-[200px]'>
          <div className='w-[40px] h-[40px] mr-[10px]'>
              <img
                  className='w-full h-full object-cover rounded-full' 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png" alt="" />
          </div>
          <div>
              <b className='text-base'>{noti?.}</b> <br />
              <span className='italic text-sm'>Branch manager</span>
          </div>
        </div>
        <div className=''>
          <div>
            <article className='font-bold text-lg line-clamp-1'>Cung cấp thêm các thiết bị mới cho cơ sở Cung cấp thêm các thiết bị mới cho cơ sở Cung cấp thêm các thiết bị mới cho cơ sở</article>
          </div>
          <div>
            <span className='italic text-sm'>11:34 23/02/2023</span>
          </div>
        </div>
      </div>
      <div>
          <p className='py-[8px] px-[20px] text-white rounded-md bg-red-400'>Quản lý</p>
      </div> */}
      <div className='mr-[10px]'>
        {noti?.message}
      </div>
      <div className='w-fit'>
        <p className='py-[4px] px-[10px] text-white text-xs rounded-md bg-blue-700'>Bàn giao</p>
      </div>
    </div>
  )
}

export default ItemNotification;