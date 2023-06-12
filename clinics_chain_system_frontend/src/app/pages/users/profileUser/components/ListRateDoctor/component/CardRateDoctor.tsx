import { Rating } from '@mui/material'
import React from 'react'
import moment from 'moment'

function CardRateDoctor({feedback} : {feedback:any}) {

  return (
    <div className='m-5 w-[220px] rounded-md overflow-hidden bg-gray-50 shadow-md'>
        <div className='w-full h-40 p-[10px]'>
          <p className='line-clamp-6 text-justify'>
            {feedback?.comment}
          </p>
        </div>
        <div className='w-full p-2'>
          <Rating name="half-rating" defaultValue={feedback?.star} disabled />
        </div>
        <div className='w-full p-2 flex justify-between'>
          <div className='max-w-[150px] flex items-center'>
            <p className='text-sm mr-[6px] italic'>Lúc</p> <p className='text-sm'>{moment(feedback?.createdAt).format("hh:mm DD/MM/YYYY")}</p>
          </div>
        </div>
        
    </div>
  )
}

export default CardRateDoctor