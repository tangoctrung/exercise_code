import React, { useRef, useState } from 'react'
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Rating, Snackbar, TextareaAutosize } from '@mui/material';
import FilePrintTreatment from '../../../../doctors/components/Treatment/components/FilePrintTreatment';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import useGetTreatment from '../../../../../hooks/useGetTreatment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { createFeedback } from '../../../../../endpoint/user';
import moment from 'moment';
import { IMAGE_NODATA } from '../../../../../constant';
import { useReactToPrint } from "react-to-print";

const labels: { [index: string]: string } = {
    1: 'Tồi tệ',
    2: 'Không tốt lắm',
    3: 'Bình thường',
    4: 'Tốt',
    5: 'Vượt mong đợi',
  };

function TimeLineUser() {

    const [open, setOpen] = React.useState(false);
    const [openDialogRate, setOpenDialogRate] = React.useState(false);
    const [statusSnackbar, setStatusSnackbar] = React.useState({
        open: false,
        message: "",
        error: false,
    })
    const [hover, setHover] = React.useState(-1);
    const { profileUser } = useSelector((state: RootState) => state.user)
    const { dataTreatment, isLoading } = useGetTreatment(profileUser?.email, "")
    const [treatmentSelect, setTreatmentSelect] = useState<any>({});
    const [dataFeedback, setDataFeedback] = useState({
        comment: "",
        star: 0
    })
    const fileRef = useRef(null);

    const getLabelText = (value: number) => {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }

    const handleOpenDialog = (index: number) => {
        setOpen(true);
        setTreatmentSelect(dataTreatment[index])
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDialogRate = () => {
        setOpenDialogRate(true)
    }

    const handleCloseDialogRate = () => {
        setOpenDialogRate(false)
    }

    const handleCloseSnackbar = () => {
        setStatusSnackbar({
            open: false,
            message: "",
            error: false,
        })
    }

    const handleSendRate = async () => {
        let dataRequest = {
            treatmentRecordId: treatmentSelect?.id,
            doctorId: treatmentSelect?.doctorId,
            comment: dataFeedback?.comment,
            star: dataFeedback?.star
        }

        if (!dataFeedback?.comment || dataFeedback?.star === 0) {
            setStatusSnackbar({
                error: true,
                message: "Bạn chưa điền đẩy đủ thông tin đánh giá",
                open: true,
            })
            return
        }

        const res = await createFeedback(dataRequest)
        console.log("data post feedback", res);
        setOpenDialogRate(false)
        if (res.data?.success) {
            setStatusSnackbar({
                error: false,
                message: "Gửi đánh giá thành công",
                open: true,
            })
        } else {
            setStatusSnackbar({
                error: true,
                message: "Gửi đánh giá thất bại",
                open: true,
            })
        }
    }

    const handleClickToPrint = useReactToPrint({
        content: () => fileRef.current || null,
      });
    
  return (
    <div className='w-full mt-[30px]'>
        {!isLoading && dataTreatment && dataTreatment?.map((item:any, index:number) => (
            <div 
                key={index}
                className='flex justify-between w-full py-2 px-4 rounded-md bg-gray-50 my-2'>
                <div className='flex items-center'>
                    <p className='mr-[10px] italic text-slate-400 min-w-[140px]'>{moment(item?.timeStart).format("hh:mm DD/MM/YYYY")}</p>
                    <p className='line-clamp-2'>{item?.symptoms}</p>
                </div>
                <div className='min-w-[100px]'>
                    <Button color='info' onClick={() => handleOpenDialog(index)} >Xem thêm</Button>
                </div>
            </div>
        ))}

        {!isLoading &&(!dataTreatment || dataTreatment?.length <= 0) && 
            <div className='min-h-[300px] w-full flex justify-center items-center'>
              <img className='w-[250px]' src={IMAGE_NODATA} alt="" />
            </div>}
        {isLoading && 
            <div className='w-full flex justify-center mt-[50px] text-center'>
                <CircularProgress />
            </div>}

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            {/* <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle> */}
            <DialogContent>
                <div ref={fileRef} className='p-[20px]'>
                    <FilePrintTreatment treament={treatmentSelect} />
                </div>
            </DialogContent>
  
            <DialogActions>
                <Button 
                    onClick={handleOpenDialogRate}
                    variant='outlined'
                    startIcon={<RateReviewRoundedIcon />}
                >Đánh giá</Button>
                {/* <Button 
                    onClick={handleClose}
                    variant='contained'
                >Xem tái khám</Button> */}
                <Button 
                    variant='contained' 
                    onClick={handleClickToPrint}
                >In PDF</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={openDialogRate} onClose={handleClose}>
          <DialogTitle>Đánh giá:</DialogTitle>
          <DialogContent>
            <div className='flex flex-col'>
                <div className='flex '>
                    <Rating name="half-rating" 
                        defaultValue={0}
                        getLabelText={getLabelText}
                        onChange={(e:any, newValue) => setDataFeedback({
                            ...dataFeedback,
                            star: newValue || 0
                        })}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                    {dataFeedback?.star !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : dataFeedback?.star]}</Box>
                    )}
                </div>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={4}
                    placeholder="Cảm nhận"
                    onChange={(e:any) => setDataFeedback({
                        ...dataFeedback,
                        comment: e.target.value || ""
                    })}
                    style={{ width: "300px", marginTop: "16px", border: "1px solid gray", outline: "none", borderRadius: "4px", padding: "4px" }}
                />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogRate}>Hủy</Button>
            <Button variant='contained' onClick={handleSendRate}>Gửi</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            open={statusSnackbar.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
        >
            <Alert onClose={handleCloseSnackbar} severity={statusSnackbar?.error ? "error" : "success"} sx={{ width: '100%' }}>
                {statusSnackbar.message}
            </Alert>
      </Snackbar>
    </div>
  )
}

export default TimeLineUser