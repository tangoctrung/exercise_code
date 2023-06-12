import React from 'react'
import ItemNotification from './components/ItemNotification';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ItemNotificationConfirm from './components/ItemNotificationConfirm';
import useGetNotiDoctor from '../../../../hooks/useGetNotiDoctor';
import { Button, CircularProgress } from '@mui/material';
import DetailNotiConfirm from './components/DetailNotiConfirm';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { IMAGE_NODATA } from '../../../../constant';

function Notification() {
  const [openDialogNoti, setOpenDialogNoti] = React.useState(false);
  const [notiSelect, setNotiSelect] = React.useState<any>();
  const [tabNoti, setTabNoti] = React.useState("listNoti");

  const { dataNoti, isLoading } = useGetNotiDoctor()
  
  const handleClickOpenDialogNoti = () => {
    setOpenDialogNoti(true);
  };

  const handleCloseDialogNoti = () => {
      setOpenDialogNoti(false);
  };

  const handleSwitchTabNoti = (index: number, s: string) => {
    setNotiSelect(dataNoti[index]);
    setTabNoti(s);
  };

  const handleSwitchTabListNoti = () => {
    setTabNoti("listNoti")
  }

  return (
    <div className="layout p-[20px] min-h-full max-h-[810px] min-w-full overflow-scroll">
      {tabNoti === "listNoti" ? 
        <div>
          {!isLoading && dataNoti && dataNoti.map((item:any, index:number) => (
            item?.type === 0 ? 
            <div key={index}>
              <ItemNotification noti={item} />
              <div className='w-full border-b-[1px] border-gray-300 border-solid'></div>
            </div> : 
            <div key={index} onClick={() => handleSwitchTabNoti(index, "detailNoti")}>
              <ItemNotificationConfirm noti={item} />
              <div className='w-full border-b-[1px] border-gray-300 border-solid'></div>
            </div>
          ))}     
          {!isLoading &&(!dataNoti || dataNoti?.length <= 0) && 
            <div className='min-h-[300px] w-full flex justify-center items-center'>
              <img className='w-[250px]' src={IMAGE_NODATA} alt="" />
            </div>}
          {isLoading && 
            <div className='w-full flex justify-center mt-[50px] text-center'>
              <CircularProgress />
            </div>}
        </div>:
        <div className='w-full h-full flex flex-col items-center'>
          <div className='w-full flex justify-start mb-[20px]'>
            <Button
              startIcon={<ArrowBackIosRoundedIcon />}
              variant='outlined'
              onClick={handleSwitchTabListNoti}
            >Quay lại</Button>
          </div>
          <div className='w-[90%]  rounded-xl bg-gray-200 p-[30px]'>
            <DetailNotiConfirm notiSelect={notiSelect} />
          </div>
        </div>}

      <Dialog open={openDialogNoti} onClose={handleCloseDialogNoti} fullWidth maxWidth="md">
        <DialogTitle>Thông báo từ: <b>Branch Manager</b></DialogTitle>
        <DialogContent>
          <b className='mt-[10px] block mb-[10px] text-lg'>Cung cấp các thiết bị mới cho cơ sở</b>
          <p>Để giải đáp được Có mấy dạng thông tin cơ bản? thì cần hiểu được thông tin là gì. Hiện nay có rất nhiều khái niệm thông tin được đưa ra khác nhau. Thông tin là giải quyết sự không chắc chắn; đó là câu trả lời cho câu hỏi “thực thể là gì”, do đó, xác định được cả bản chất của các đặc tính đó. Thông tin được liên kết với các dữ liệu vì dữ liệu đại diện cho các giá trị sẽ được quy cho các tham số. Về mặt truyền thông, thông tin được thể hiện dưới dạng nội dung của tin nhắn hoặc thông qua sự quan sát trực tiếp, gián tiếp. Thông tin cũng có thể được mã hóa thành nhiều dạng khác nhau để truyền và giải thích. Theo quan điểm cá nhân của người viết bài thì thông tin là sự phản ánh sự vật, sự việc, hiện tượng của thế giới khách quan, các hoạt động của con người trong đời sống xã hội. Thông tin được con người thu nhận được từ thế giới xung quanh như sự vật, sự kiện,…Thông tin đem lại nhiều kiến thức, sự hiểu biết cho con người. Bên cạnh đó con người sẽ tiếp nhận thông tin để làm tăng hiểu biết cho mình và tiến hành những hoạt động có ích cho cộng đồng. Vậy hiện nay có mấy dạng thông tin cơ bản? Chúng ta cùng tìm hiểu ở phần tiếp theo của bài viết.</p>
        </DialogContent>
      </Dialog>

      {/* <Dialog open={openDialogNotiConfirm} onClose={handleCloseDialogNotiConfirm} fullWidth maxWidth="md">
        <DialogTitle>Thông báo về bệnh nhân yêu cầu khám</DialogTitle>
        <DialogContent>
          <div className='flex items-center relative'>
            <div className='w-[150px] h-[150px] mr-[30px]'>
                <img 
                  src={notiSelect?.moreInfo?.avatarUrl || IMAGE_DEFAULT} alt="" 
                  className='w-full h-full rounded-full object-cover'
                />
            </div>
            <div>
              <div className='flex'>
                <p className='min-w-[120px]'>Họ tên: </p>
                <b className='text-lg'>{notiSelect?.moreInfo?.FullName || 'Tạ Ngọc Trung'}</b>
              </div>
              <div className='flex'>
                <p className='min-w-[120px]'>Ngày sinh: </p>
                <b className='text-lg'>{notiSelect?.moreInfo?.Dob || '23/07/2001'}</b>
              </div>
              <div className='flex'>
                <p className='min-w-[120px]'>Giới tính: </p>
                <b className='text-lg'>{notiSelect?.moreInfo?.Gender === "MALE" ? "Nam" : "Nữ"}</b>
              </div>
              <div className='flex'>
                <p className='min-w-[120px]'>Số điện thoại: </p>
                <b className='text-lg'>{notiSelect?.moreInfo?.PhoneNumber || '0387195947'}</b>
              </div>
              <div className='flex'>
                <p className='min-w-[120px]'>Email: </p>
                <b className='text-lg'>{notiSelect?.moreInfo?.Email || 'trungtn@gmail.com'}</b>
              </div>
              
            </div>
            {!notiSelect?.moreInfo?.IsConfirmed &&
              <div className='absolute right-[0px] top-[0px]'>
                <Button variant='contained' onClick={handleConfirmNoti}>Confirm</Button>
              </div>}
          </div>
          <div>
            <div className='mt-[20px]'>
              <p className='min-w-[120px]'>Triệu chứng: </p>
              <b className='text-lg ml-[30px]'>{notiSelect?.moreInfo?.Description || "Đau đầu, chóng mặt, mỏi vai gáy"}</b>
            </div>
            <div className='mt-[20px]'>
              <p className='min-w-[120px]'>Bệnh nhân muốn được: </p>
              <b className='text-lg ml-[30px]'>{notiSelect?.moreInfo?.ServiceType || "Khám tổng quát"}</b>
            </div>
            <div className='mt-[20px]'>
              <p className='min-w-[120px]'>Thời gian khám: </p>
              <b className='text-lg ml-[30px]'>{moment(notiSelect?.moreInfo?.MeetingTime).format("hh:mm DD-MM-YYYY")}</b>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  )
}

export default Notification;