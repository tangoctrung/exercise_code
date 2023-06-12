import React from 'react'
import CardRateDoctor from './component/CardRateDoctor'
import useGetListFeedbacks from '../../../../../hooks/useGetListFeedbacks'
import { CircularProgress } from '@mui/material'
import { IMAGE_NODATA } from '../../../../../constant'

function ListRateDoctor() {
    const { dataFeedbacks, isLoading } = useGetListFeedbacks()
  return (
    <div>
        <div className='w-full flex flex-wrap justify-around'>
            {!isLoading && dataFeedbacks && dataFeedbacks?.map((item:any, index:number) => (
                <CardRateDoctor feedback={item} />
            ))}
            {!isLoading &&(!dataFeedbacks || dataFeedbacks?.length <= 0) && 
            <div className='min-h-[300px] w-full flex justify-center items-center'>
              <img className='w-[250px]' src={IMAGE_NODATA} alt="" />
            </div>}
            {isLoading && 
            <div className='w-full flex justify-center mt-[50px] text-center'>
              <CircularProgress />
            </div>}
        </div>
    </div>
  )
}

export default ListRateDoctor