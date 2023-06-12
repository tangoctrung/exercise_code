import moment from 'moment'
import { IMAGE_DEFAULT } from '../../../../../constant'

function ItemNotificationConfirm({noti}: {noti:any}) {
  return (
    <div className="relative flex justify-between items-center p-[20px] cursor-pointer rounded-xl transition-all duration-300 ease-in hover:bg-gray-200">
      <div className='flex justify-between'>
        <div className='flex items-center mr-[30px] min-w-[200px]'>
          <div className='w-[40px] h-[40px] mr-[10px]'>
              <img
                  className='w-full h-full object-cover rounded-full' 
                  src={noti?.moreInfo?.avatarUrl || IMAGE_DEFAULT} alt="" />
          </div>
          <div>
              <b className='text-base'>{noti?.FullName || 'Tạ Ngọc Trung'}</b> <br />
              <span className='italic text-sm'>Bệnh nhân</span>
          </div>
        </div>
        <div>
          <div>
            <article className='font-medium text-lg line-clamp-1'>{noti?.FullName || 'Tạ Ngọc Trung'} đã gửi yêu cầu thăm khám.</article>
          </div>
          <div>
            <span className='italic text-sm'>lúc {moment(noti?.createdAt).format('hh:mm DD/MM/YYYY')}</span>
          </div>
        </div>
      </div>
        <div>
          <p className='py-[4px] px-[10px] text-white text-xs rounded-md bg-green-700'>Khám bệnh</p>
        </div>
      {/* <div className='absolute h-[10px] w-[10px] bg-blue-500 rounded-full right-[20px] top-[20px]'></div> */}
    </div>
  )
}

export default ItemNotificationConfirm