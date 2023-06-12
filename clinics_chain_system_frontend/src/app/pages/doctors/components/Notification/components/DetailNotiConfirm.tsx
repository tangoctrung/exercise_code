import React, { useEffect, useState } from 'react'
import { IMAGE_DEFAULT } from '../../../../../constant'
import moment from 'moment'
import { confirmNotiDoctor, createTreatment } from '../../../../../endpoint/doctor'
import { Alert, AlertColor, Button, Snackbar } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../store/store'
import { timeCreateTreatment } from '../../../../../../services/formatTime'

function DetailNotiConfirm({notiSelect}: {notiSelect: any}) {

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [isConfirm, setIsConfirm] = useState(notiSelect?.isConfirm)
    const { profileUser } = useSelector((state: RootState) => state.user)
    const [notiError, setNotiError] = useState<{type: AlertColor, message: string}>({
        type: "error",
        message: ""
    })
    useEffect(() => {
        setIsConfirm(notiSelect?.isConfirm)
    }, [notiSelect?.isConfirm])
    console.log(isConfirm);
    
    const handleConfirmNoti = () => {
        confirmNotiDoctor(notiSelect?.id)
          .then((res:any) => {
            console.log(res);
            if (res?.data?.success) {
              setNotiError({
                type: "success",
                message: "Xác nhận thành công. Hệ thống sẽ gửi mail thông báo đến bệnh nhân."
              })
              setIsConfirm(true);
            }
          })
          .catch((err) => {
            console.log(err);
            setNotiError({
                type: "error",
                message: "Xác nhận thất bại, hãy thử lại sau."
            })
          })
        setOpenSnackbar(true);
    }

    const handleCreateTreatment = () => {
        if (isConfirm) {
            let dataTreament = {
                patientId: notiSelect?.moreInfo?.CreatedBy,
                name: notiSelect?.moreInfo?.FullName,
                dob: notiSelect?.moreInfo?.Dob,
                phoneNumber: notiSelect?.moreInfo?.PhoneNumber,
                email: notiSelect?.moreInfo?.Email,
                gender: notiSelect?.moreInfo?.Gender,
                symptoms: notiSelect?.moreInfo?.Description,
                branchId:  profileUser?.branchId,
                address: profileUser?.moreInfo?.Address,
                avatarUrl: profileUser?.moreInfo?.AvatarUrl,
                timeStart: timeCreateTreatment(new Date().toDateString())
                // isRevisit: false,
              }
              createTreatment(dataTreament)
                .then((res) => {
                  if (res?.data?.success) {
                    setNotiError({
                        type: "success",
                        message: "Tạo cuộc khám thành công."
                    })
                  }
                })
                .catch((err) => {
                    console.log(err);
                    setNotiError({
                        type: "error",
                        message: "Tạo cuộc khám thất bại."
                    })
                })
        } else {
            setNotiError({
                type: "error",
                message: "Thông báo chưa được xác nhận."
            })
        }
        setOpenSnackbar(true);
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

  return (
    <div>
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
        {!isConfirm ?
            <div className='absolute right-[0px] top-[0px]'>
                <Button variant='contained' onClick={handleConfirmNoti}>Confirm</Button>
            </div> :
            <div className='absolute right-[0px] top-[0px]'>
                <div className='flex flex-col'>
                    <div>
                        <Button startIcon={<CheckRoundedIcon />} variant='contained' disabled>Confirmed</Button>
                    </div>
                    <div className='mt-[10px]'>
                        <Button
                            variant='contained'
                            onClick={handleCreateTreatment}
                        >Tạo cuộc khám</Button>
                    </div>
                </div>
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

        <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
        >
            <Alert onClose={handleCloseSnackbar} severity={notiError?.type ? notiError?.type : "info"} sx={{ width: '100%' }}>
                {notiError?.message}
            </Alert>
      </Snackbar>
    </div>
  )
}

export default DetailNotiConfirm