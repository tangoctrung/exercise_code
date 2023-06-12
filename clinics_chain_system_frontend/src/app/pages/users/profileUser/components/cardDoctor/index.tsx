import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { IMAGE_DEFAULT } from '../../../../../constant';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { createReservation } from '../../../../../endpoint/user';
import { timeReservation } from '../../../../../../services/formatTime';
import moment from "moment"

function CardDoctor({dataProfile, dataServices}: {dataProfile:any, dataServices:any}) {

  const [open, setOpen] = React.useState(false);
  const [openDialogCalendar, setOpenDialogCalendar] = React.useState(false);
  const { profileUser } = useSelector((state: RootState) => state.user)
  const [valueService, setValueService] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  const [dataRequest, setDataRequest] = useState({
    fullName: profileUser?.firstName + " " + profileUser?.lastName || "",
    dob: profileUser?.dateOfBirth || "",
    phoneNumber: profileUser?.phoneNumber || "",
    gender: profileUser?.gender || "",
    email: profileUser?.email || "",
    doctorId: dataProfile?.id || "",
    type: 1, 
    description: "",
    serviceType: "",
    meetingTime: "",
    branchId: dataProfile?.branchId || ""
  })

  const handleChangeServiceType = (event: SelectChangeEvent) => {
    setValueService(event?.target?.value)
    setDataRequest({
      ...dataRequest,
      serviceType: event?.target?.value,
    })
  };
  

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleClickOpenDialogCalendar = () => {
    setOpenDialogCalendar(true);
  };

  const handleCloseDialogCalendar = () => {
    setOpenDialogCalendar(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleChangeDescription = (e: any) => {
    setDataRequest({
      ...dataRequest,
      description: e.target.value
    })
  }

  const handleChooseTime = (e:any) => {
    // const date = moment(e.target.value);
    // const formattedDate = date.format('YYYY-MM-DD HH:mm:ss Z');
    setDataRequest({
      ...dataRequest,
      meetingTime: timeReservation(e.target.value)
    })
  }

  const handleSendRequest = () => {
    createReservation(dataRequest)
      .then((res:any) => {
        if (res?.data?.success) {
          setOpenDialogCalendar(false);
          setOpen(false)
          setOpenSnackbar(true)
        }
      })
      .catch((err:any) => {
        console.log("create reservations: ", err);
      })
  }

  

  return (
    <div>
      <div className='m-5 relative w-[200px] h-[300px] rounded-md overflow-hidden bg-gray-50 shadow-md'>
        <img 
            src={dataProfile?.avatarUrl || IMAGE_DEFAULT} alt="" 
            className='w-full h-40 object-cover'
        />
        <div className='w-full p-2'>
            <p className='font-semibold'>Bs {dataProfile?.firstName + " " + dataProfile?.lastName}</p>
            <p className='text-sm italic'>{dataProfile?.specialistIn || ""}</p>
            <p className='text-base'><b>{dataProfile?.totalTreatment ? dataProfile?.totalTreatment : "Chưa có"} lượt khám</b>, và <b>{dataProfile?.avgStar ? dataProfile?.avgStar + " sao" : "chưa có"}</b> đánh giá </p>
        </div>
        <div className='w-full absolute bottom-0 left-0'>
          <Button variant='contained' className='w-full' onClick={handleClickOpen} >Xem thêm</Button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}  fullWidth={true} maxWidth="lg">
        <DialogTitle>Thông tin bác sĩ</DialogTitle>
        <DialogContent>
          <div className='w-full h-[800px] p-[20px]'>
            <div className='flex items-start justify-around'>
              <div className='flex items-center'>
                <div className='h-[150px] w-[150px] mr-[20px]'>
                  <img 
                    src={dataProfile?.avatarUrl || IMAGE_DEFAULT} alt="" 
                    className='h-full w-full object-cover rounded-full'
                  />
                </div>
                <div className='ml-4 flex flex-col justify-evenly'>
                  <div className='flex mb-[8px]'><p className='min-w-[120px]'>Họ tên </p><b>{dataProfile?.firstName + " " + dataProfile?.lastName}</b></div>
                  <div className='flex mb-[8px]'><p className='min-w-[120px]'>Email: </p><b>{dataProfile?.email || ""}</b></div>
                  <div className='flex mb-[8px]'><p className='min-w-[120px]'>Ngày sinh: </p><b>{dataProfile?.dob || ""}</b></div>
                  <div className='flex mb-[8px]'><p className='min-w-[120px]'>Chức danh: </p><b>{dataProfile?.specialistIn}</b></div>
                </div>
              </div>
              <div className=''>
                <Button variant='contained' onClick={handleClickOpenDialogCalendar}>Đặt lịch</Button>
              </div>
            </div>
            {/* <div className='mt-8'>
              <b className='text-2xl'>Lịch làm việc: </b>
            </div> */}
            <div className='mt-8'>
              <b className='text-2xl'>Giới thiệu: </b>
              <article className='text-justify ml-3 mt-3'>{dataProfile?.profile?.intro ? ReactHtmlParser(dataProfile?.profile?.intro) : <p>Chưa có thông tin</p>}</article>
            </div>
            <div className='mt-8'>
              <b className='text-2xl'>Kinh nghiệm: </b>
              <article className='text-justify ml-3 mt-3'>{dataProfile?.profile?.experience ? ReactHtmlParser(dataProfile?.profile?.experience) : <p>Chưa có thông tin</p>}</article>
            </div>
            <div className='mt-8'>
              <b className='text-2xl'>Giải thưởng: </b>
              <article className='text-justify ml-3 mt-3'>{dataProfile?.profile?.awards ? ReactHtmlParser(dataProfile?.profile?.awards) : <p>Chưa có thông tin</p>}</article>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialogCalendar} onClose={handleCloseDialogCalendar} fullWidth maxWidth="sm">
        <DialogTitle style={{ fontWeight: 600 }}>Thông tin đặt lịch</DialogTitle>
        <DialogContent>
          <div className='w-full min-h-[420px] py-5'>
            <div className='mt-[30px]'>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Dịch vụ khám</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={valueService}
                    label="Dịch vụ khám"
                    onChange={handleChangeServiceType}
                  >
                    {dataServices && dataServices?.map((item:any, index:number) => (
                      <MenuItem 
                        key={index} 
                        value={item?.serviceName}
                      >
                        <b>{item?.serviceName}</b> 
                        <span className='ml-[30px] text-sm italic text-gray-500'>({item?.fee} VNĐ)</span>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className='mt-[20px]'>
              <TextareaAutosize
                placeholder='Mô tả triệu chứng' 
                style={{ width: "100%", height: "150px", border: "1px solid gray", outline: "none", padding: "10px", borderRadius: "5px" }} 
                onChange={handleChangeDescription}
              />
            </div>
            <div className='mt-[20px] w-full'>
              <p className='font-medium mb-[8px]'>Đặt lịch</p>
              <input 
                className='py-2 px-4 w-[50%] rounded-lg outline-none border-[1px] border-gray-300' 
                type="datetime-local" 
                onChange={handleChooseTime}
              />
            </div>
            <div className='mt-[30px] flex justify-center'>
              <Button 
                variant='contained' 
                style={{ width: "150px", height: "50px"}}
                onClick={handleSendRequest}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            // message={message}
            // action={action}
        >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
               Gửi yêu cầu thành công, hãy kiểm tra email để chờ phản hồi từ bác sĩ
            </Alert>
      </Snackbar>
    </div>
  )
}

export default CardDoctor