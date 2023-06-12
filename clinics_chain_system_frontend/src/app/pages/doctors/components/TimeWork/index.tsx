import React, { useEffect, useRef, useState } from 'react'
import CardRegisterTime from './components/CardRegisterTime';
// import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
// import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import useGetTimeWorkingDoctor from '../../../../hooks/useGetTimeWorkingDoctor';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Alert, Button, Checkbox, CircularProgress, FormControlLabel, Snackbar, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { IMAGE_NODATA } from '../../../../constant';
import { createTimeWorkingDoctor } from '../../../../endpoint/doctor';
import 'react-calendar/dist/Calendar.css';

function TimeWork() {
  const [listTime, setListTime] = useState<any[]>([]);
  const { profileUser } = useSelector((state: RootState) => state.user)
  const [valueDay, setValueDay] = React.useState<Dayjs | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [dataDate, setDataDate] = useState({
    from: "2022-01-01",
    to: "2030-01-01",
  })
  const [status, setStatus] = React.useState({
    isError: false,
    message: "",
  });
  const [dataWorkTime, setDataWorkTime] = useState<{date: string, shifts: string[]}>({
    date: "",
    shifts: []
  })
  const [dataCheck, setDataCheck] = useState({
    check1: false,
    check2: false,
    check3: false
  })


  const { dataTimeWorking, setDataTimeWorking, isLoading } = useGetTimeWorkingDoctor({
    doctorId: profileUser?.id,
    from: dataDate?.from,
    to: dataDate?.to,
  })
  
  useEffect(() => {
    console.log(dataTimeWorking);
    setListTime(dataTimeWorking)
  }, [dataTimeWorking])

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleChooseShift = (e: any, s: string) => {
    let times = dataWorkTime.shifts
    let index = times.indexOf(s)
    
    if (e.target.checked) {
      if (index < 0) times.push(s)
    } else {
      if (index >= 0) times.splice(index, 1)
    }

    setDataCheck((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked
    }))
    
    setDataWorkTime({
      ...dataWorkTime,
      shifts: times
    })
  }

  const handleRegisterWorkTime = () => {
    console.log(dataWorkTime);
    console.log(dataCheck);
    
    createTimeWorkingDoctor(dataWorkTime)
      .then((res) => {
        console.log(res);
        
        let data = dataTimeWorking;
        data.unshift(dataWorkTime)
        setDataTimeWorking(data);
        setStatus({
          isError: false,
          message: "Tạo thời gian làm việc thành công"
        })
        // setListTime([])
        setDataCheck({
          check1: false,
          check2: false,
          check3: false,
        })
        setDataWorkTime({
          date: "",
          shifts: []
        })
        setValueDay(null)
        setOpenSnackbar(true)
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          isError: true,
          message: "Tạo thời gian làm việc thất bại, hãy thử lại"
        })
        setOpenSnackbar(true)
      })
  }
  
  return (
    <div className="layout p-[40px] h-full overflow-scroll">
      <h3>Đăng ký thời gian làm việc</h3>

      {/* <div>
        <Calendar onChange={handleChangeValueDate} value={value} />
      </div> */}
      <div className='w-full flex justify-center'>
        <div className='w-[400px] h-fit rounded-lg shadow-md mb-[20px] p-[20px] flex flex-col items-center'>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker
                  label="Chọn ngày làm"
                  value={valueDay}
                  onChange={(newValue) => {
                    let date:string = dayjs(dayjs(newValue).toString()).format("YYYY-MM-DD");
                    setValueDay(newValue);
                    setDataWorkTime({
                      ...dataWorkTime,
                      date: date,
                    })
                    setDataDate({
                      from: date,
                      to: date,
                    })
                  }}
                  renderInput={(params) => <TextField size='small' {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className='mt-[20px]'>
            <h3>Chọn ca làm</h3>
            <div>
              <FormControlLabel
                value=""
                control={<Checkbox checked={dataCheck?.check1} name='check1' onChange={(e) => handleChooseShift(e, "08:00 - 12:00")} />}
                label="Ca 1(08:00 - 12:00)"
                labelPlacement="end"
                // onChange={}
              />
              <FormControlLabel
                value=""
                control={<Checkbox checked={dataCheck?.check2} name='check2' onChange={(e) => handleChooseShift(e, "13:30 - 17:30")} />}
                label="Ca 2(13:30 - 17:30)"
                labelPlacement="end"
              />
              <FormControlLabel
                value=""
                control={<Checkbox checked={dataCheck?.check3} name='check3' onChange={(e) => handleChooseShift(e, "19:00 - 23:00")} />}
                label="Ca 3(19:00 - 23:00)"
                labelPlacement="end"
              />
            </div>
          </div>
          <div className='mt-[20px]'>
            <Button variant='contained' onClick={handleRegisterWorkTime}>Đăng ký</Button>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap min-h-[300px] w-full'>
        {!isLoading && listTime?.length > 0 && listTime?.map((item:any, index:number) => (
          <CardRegisterTime dataTime={item} />
        ))}
        {!isLoading && listTime?.length <= 0 && 
          <div className='min-h-[300px] w-full flex justify-center items-center'>
            <img className='w-[250px]' src={IMAGE_NODATA} alt="" />
          </div>}
        {isLoading && 
          <div className='w-full flex justify-center mt-[50px] text-center'>
            <CircularProgress />
          </div>}
      </div>

      <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            // message={message}
            // action={action}
        >
            <Alert onClose={handleCloseSnackbar} severity={status?.isError ? 'error' : 'success'} sx={{ width: '100%' }}>
              {status?.message}
            </Alert>
      </Snackbar>
    </div>
  )
}

export default TimeWork;