import { Alert, AlertColor, Button, CircularProgress, Snackbar, TextField } from '@mui/material';
import React, { useRef, useState } from 'react'
import CardTreatment from './components/CardTreatment';
import FilePrintTreatment from './components/FilePrintTreatment';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import DialogTreament from './components/DialogTreament';
import useGetTreatment from '../../../../hooks/useGetTreatment';
import { IMAGE_NODATA } from '../../../../constant';
import { createTreatment, updateTreatment } from '../../../../endpoint/doctor';
import { useReactToPrint } from "react-to-print";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { timeCreateTreatment } from '../../../../../services/formatTime';

function Treatment() {
  const [isEditTreatment, setIsEditTreatment] = React.useState(false);
  const [tabTreatment, setTabTreatment] = React.useState("listTreatment");
  const [treatmentSelect, setTreatmentSelect] = React.useState<any>({});
  const [emailSearch, setEmailSearch] = useState("")
  const [isCreate, setIsCreate] = useState(false);
  const { profileUser } = useSelector((state:RootState) => state.user)
  const { dataTreatment, isLoading } = useGetTreatment(emailSearch, profileUser?.id)
  const fileRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [notiError, setNotiError] = useState<{type: AlertColor, message: string}>({
    type: "success",
    message: ""
  })
  const handleClickTreatment = (index: number) => {
    setTabTreatment("detailTreatment")
    setIsCreate(false)
    setTreatmentSelect(dataTreatment[index] || {})
  };

  const handleBackTreatment = () => {
    setTabTreatment("listTreatment")
  }

  const handleClickEditTreatment = () => {
    setIsEditTreatment(true)
  }

  const handleSaveTreatment = async () => {
    // setIsEditTreatment(false)
    let dataRequestUpdate = {
      ...treatmentSelect,
      branchId: profileUser?.branchId,
      timeStart: treatmentSelect?.timeStart?.split(" UTC")[0],
      timeDone: treatmentSelect?.timeDone?.split(" UTC")[0]
    }
    let dataRequestCreate = {
      ...treatmentSelect,
      gender: treatmentSelect?.gender === "Nam" ? "MALE" : "FEMAIL",
      // dob: timeCreateTreatment(treatmentSelect?.dob),
      // patientId: "f2c57d35-eab6-4dc0-8408-55996cbf7726",
      branchId: profileUser?.branchId,
      timeStart: timeCreateTreatment(new Date().toDateString()),
    }
    console.log(treatmentSelect);
    isCreate ? 
    createTreatment(dataRequestCreate)
      .then((res) => {
        setOpenSnackbar(true)
        setNotiError({
          type: "success",
          message: "Tạo cuộc khám thành công."
        })
        setIsEditTreatment(false)
      })
      .catch((err) => {
        setOpenSnackbar(true)
        setNotiError({
          type: "error",
          message: "Tạo cuộc khám thất bại."
        })
      }) :
    updateTreatment(treatmentSelect?.id, dataRequestUpdate)
      .then((res) => {
        setOpenSnackbar(true)
        setNotiError({
          type: "success",
          message: "Cập nhật cuộc khám thành công."
        })
        setIsEditTreatment(false)
      })
      .catch((err) => {
        setOpenSnackbar(true)
        setNotiError({
          type: "error",
          message: "Cập nhật cuộc khám thất bại."
        })
      })
    
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleChangeEmailSearch = (event:any) => {
    setEmailSearch(event.target.value);
  };

  const handleClickToPrint = useReactToPrint({
    content: () => fileRef.current || null,
  });

  const handleOpenFormCreateTreatment = () => {
    setTabTreatment("detailTreatment")
    setTreatmentSelect({})
    setIsCreate(true)
    setIsEditTreatment(true)
  }

  return (
    <div className="layout p-[20px] h-full min-w-full overflow-scroll">
      {tabTreatment==="listTreatment" ? 
        <div>
          <div className=' px-[30px]  mt-[20px] flex justify-between mb-[30px]'>
            <div className='hidden lg:block text-2xl font-semibold'>Thông tin khám của bệnh nhân</div>
            <div className='flex items-center'>
              <div className='flex justify-end mt-2 mr-2'>
                <TextField
                  label="Email"
                  id=""
                  defaultValue=""
                  placeholder='Tìm kiếm theo email'
                  size="small"
                  onChange={handleChangeEmailSearch}
                />
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='w-[90%] flex justify-center flex-wrap'>
              {!isLoading && dataTreatment && 
                <div className='layout w-[300px] h-[400px] rounded-lg p-[12px] inline-block mr-[16px] mb-[16px] cursor-pointer bg-slate-200'>
                    <div 
                      className='w-full h-full flex flex-col justify-center items-center'
                      onClick={handleOpenFormCreateTreatment}
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/PlusCM128.svg/1200px-PlusCM128.svg.png" alt="" 
                        className='w-[60px] block'
                      />
                      <p className='text-xl font-bold'>Tạo cuộc khám</p>
                    </div>
                </div>}
              {!isLoading && dataTreatment && dataTreatment?.map((item:any, index:number) => 
                <div onClick={() => handleClickTreatment(index)} key={index}>
                  <CardTreatment treatment={item} />
                </div>
              )}
              {isLoading && 
                <div className='mt-[100px]'>
                  <CircularProgress />
                </div>}
                {!isLoading && (!dataTreatment || dataTreatment?.length <= 0) && 
                  <div className='min-h-[300px] w-full flex justify-center items-center'>
                    <img className='w-[250px]' src={IMAGE_NODATA} alt="" />
                  </div>}
            </div>
          </div>
        </div> : 
        <div className='flex justify-center'>
          <div className='w-[80%]'>
            <div className='flex justify-between items-center mb-[30px]'>
              <div className='flex items-center'>
                <div 
                  title='Quay lại' 
                  onClick={handleBackTreatment}
                  className='flex justify-center items-center transition-all duration-200 ease-linear p-[10px] rounded-lg box-border cursor-pointer hover:bg-slate-200 mr-[20px]'>
                  <ArrowBackIosNewRoundedIcon />
                </div>
                <h2>Thông tin khám bệnh</h2>
              </div>
              <div className='flex items-center'>
                {!isEditTreatment && 
                  <Button 
                    startIcon={<EditRoundedIcon />} 
                    onClick={handleClickEditTreatment}
                    variant='contained'
                  >
                    Chỉnh sửa
                  </Button>}
                {isEditTreatment && 
                  <Button 
                    startIcon={<SaveRoundedIcon />} 
                    onClick={handleSaveTreatment}
                    variant='contained'
                  >
                    Lưu lại
                  </Button>}
                <div className='mr-[20px]'></div>
                {!isEditTreatment && 
                  <Button 
                    startIcon={<AttachFileRoundedIcon />} 
                    variant='outlined'
                    onClick={handleClickToPrint}
                  >Xuất PĐF</Button>}
              </div>
            </div>
            <div className='p-[20px] bg-white rounded-lg' ref={fileRef}>
              {isEditTreatment ? 
                <DialogTreament treament={treatmentSelect} setTreatmentSelect={setTreatmentSelect}  /> : 
                <FilePrintTreatment treament={treatmentSelect} />}
            </div>
          </div>
        </div>}

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

export default Treatment;