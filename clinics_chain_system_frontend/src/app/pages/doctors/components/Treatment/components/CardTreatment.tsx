import moment from 'moment';
import React from 'react'
import { IMAGE_DEFAULT } from '../../../../../constant';

function CardTreatment({treatment}: {treatment:any}) {
  return (
    <div className="layout w-[300px] h-[400px] rounded-lg p-[12px] inline-block mr-[16px] mb-[16px] cursor-pointer bg-slate-200">
      <div className=' flex  flex-col w-full h-full relative'>
        <div className='flex justify-center w-full'>
          <div className='w-[120px] h-[120px]'>
              <img 
                  className='w-full h-full object-cover rounded-full'
                  src={treatment?.avatarUrl ? treatment?.avatarUrl : IMAGE_DEFAULT} alt="" />
          </div>
        </div>
        <div className='flex justify-center flex-col items-center mt-[10px]'>
            <p><span className='text-sm'>Bệnh nhân: </span> <b>{treatment?.name || "Tạ Ngọc Trung"}</b></p>
            <i className='text-sm'>Email: {treatment?.email || "tangoctrung12123@gmail.com"}</i>
        </div>
        <div className='mt-[20px] min-h-[140px]'>
            <b>Triệu chứng: </b>
            <span className='line-clamp-[6]'>{treatment?.symptoms || ""}</span>
        </div>
        {/* <div className='mt-[20px] min-h-[140px]'>
            <b>Kết luận: </b>
            <span className='line-clamp-[6]'>{treatment?.conclusion || "Chưa có thông tin"}</span>
        </div> */}
        <div className='absolute bottom-0 left-0'>
            <i className='text-sm'>Thời gian khám: {moment(treatment?.timeStart || "04/05/2023").format("DD-MM-YYYY")}</i>
        </div>
      </div>
    </div>
  )
}

export default CardTreatment;