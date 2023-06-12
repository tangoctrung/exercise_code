import React, { useEffect } from 'react'
import { Alert, Button, Snackbar } from '@mui/material'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Face6RoundedIcon from '@mui/icons-material/Face6Rounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AddLocationRoundedIcon from '@mui/icons-material/AddLocationRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { updateInfoUser } from '../../../../../endpoint/auth';
import { useDispatch } from 'react-redux';
import { updateProfileUser } from '../../../../../store/features/userSlice';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../../../utils/firebase';
import { IMAGE_DEFAULT } from '../../../../../constant';

function Profile({dataProfile}: {dataProfile: any}) {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    let userId:string = localStorage.getItem("userId") || "";
    const [profile, setProfile] = React.useState({
        age: dataProfile?.age || 0,
        dateOfBirth: dataProfile?.dateOfBirth || "",
        email: dataProfile?.email || "",
        firstName: dataProfile?.firstName || "",
        gender: dataProfile?.gender ? (dataProfile?.gender==="MALE" ? "Nam" : "Nữ") : "",
        id: userId || "",
        lastName: dataProfile?.lastName || "",
        moreInfo: dataProfile?.moreInfo || "",
        phoneNumber: dataProfile?.phoneNumber || "",
        address: dataProfile?.address || "",
        avatarUrl: dataProfile?.avatarUrl || ""
    })

    // const [age, setAge] = React.useState('');
    // const [value, setValue] = React.useState<Dayjs | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    // const [data, setData] = React.useState<any>([]);
    const [error, setError] = React.useState<any>("");
    const dispatch = useDispatch();

    useEffect(() => {
        setProfile({
            age: dataProfile?.age || 0,
            dateOfBirth: dataProfile?.dateOfBirth || "",
            email: dataProfile?.email || "",
            firstName: dataProfile?.firstName || "",
            gender: dataProfile?.gender || "",
            id: userId || "",
            lastName: dataProfile?.lastName || "",
            moreInfo: dataProfile?.moreInfo || "",
            phoneNumber: dataProfile?.phoneNumber || "",
            address: dataProfile?.address || "",
            avatarUrl: dataProfile?.avatarUrl || "",
        })
    }, [dataProfile])

    const handleChangeGender = (event: SelectChangeEvent) => {
        setProfile({
            ...profile,
            gender: event?.target?.value
        })
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setError("");
    }

    const handleChangeInfo = (e:any) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value===undefined ? "" : e.target.value
        })
    }

    const handleUpdateInfoUser = () => {
        console.log(profile);
        
        let dataRequest:any = {
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            age: profile?.age,
            id: profile?.id,
            dateOfBirth: profile?.dateOfBirth,
            gender: profile?.gender,
            phoneNumber: profile?.phoneNumber,
            moreInfo: profile?.moreInfo,
            address: profile?.address,
            avatarUrl: profile?.avatarUrl
        }
        updateInfoUser(dataRequest)
            .then((res) => {
                console.log("res: ", res);
                if (res?.data?.success) {
                    setOpenDialog(false);
                    setOpenSnackbar(true);
                    dispatch(updateProfileUser(profile));
                } else {
                    setError("Cập nhật thông tin thất bại, hãy thử lại")
                    setOpenDialog(false);
                    setOpenSnackbar(true)
                }
                // setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                // setError(err);
                setIsLoading(false);
            })
    }

    const uploadFileToFirebaseStorage = (e: any) => {
        console.log(e);
        let file = e.target?.files[0];
        if (!file) {
          alert("Please choose a file first!");
        }
        const storageRef = ref(storage, `/avatars/${dataProfile?.id}/${new Date().getTime()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
              setProfile({
                ...profile,
                avatarUrl: url,
              })
            });
          }
        );
      }

  return (
    <div>
        <div className='pl-10 pr-10'>
            <div className='flex items-start mb-[6px]'>
                <p className='font-semibold w-[150px] flex items-center'> <Face6RoundedIcon style={{ marginRight: "6px"}}/> Giới tính</p>
                <span className='font-normal text-xl ml-4'>: {dataProfile?.gender ? (dataProfile?.gender === "MALE" ? "Nam" : "Nữ") : <b>Chưa có thông tin</b>}</span>
            </div>
            <div className='flex items-start mb-[6px]'>
                <p className='font-semibold w-[150px] flex items-center'> <CallRoundedIcon style={{ marginRight: "6px"}}/> SDT</p>
                <span className='font-normal text-xl ml-4'>: {dataProfile?.phoneNumber || <b>Chưa có thông tin</b>}</span>
            </div>
            <div className='flex items-start mb-[6px]'>
                <p className='font-semibold w-[150px] flex items-center'><EmailRoundedIcon style={{ marginRight: "6px"}}/> Email</p>
                <span className='font-normal text-xl ml-4'>: {dataProfile?.email || <b>Chưa có thông tin</b>}</span>
            </div>
            <div className='flex items-start mb-[6px]'>
                <p className='font-semibold w-[150px] flex items-center'><AddLocationRoundedIcon style={{ marginRight: "6px"}}/> Địa chỉ</p>
                <span className='font-normal text-xl ml-4'>: {dataProfile?.address || <b>Chưa có thông tin</b>}</span>
            </div>
            <div className='flex items-start mb-[6px]'>
                <p className='font-semibold w-[150px] flex items-center'><InfoRoundedIcon style={{ marginRight: "6px"}}/> Thông tin khác</p>
                <span className='font-normal text-xl ml-4'>: {dataProfile?.moreInfo || <b>Chưa có thông tin</b>}</span>
            </div>
        </div>
        <div className='pl-10 pr-10 mt-8 mb-2 w-full flex justify-end'>
            <Button variant='contained' onClick={handleClickOpen}>Chỉnh sửa</Button>
        </div>

        <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
            <DialogContent>
                <div className='flex justify-center'>
                    <div className='w-32 h-32 relative'>
                        <img 
                            src={profile?.avatarUrl || IMAGE_DEFAULT} alt="" 
                            className='w-full h-full rounded-full object-cover'
                        />
                        <input type="file" hidden accept="image/*" onChange={uploadFileToFirebaseStorage} id="icon-button-file" />
                        <label className='absolute top-0 left-0 w-full h-full' htmlFor="icon-button-file"></label>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <TextField
                        margin="dense"
                        id="name"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        name='firstName'
                        value={profile?.firstName}
                        style={{marginRight: "10px"}}
                        onChange={handleChangeInfo}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        id="name"
                        label="Last Name"
                        type="text"
                        name='lastName'
                        value={profile?.lastName}
                        style={{marginLeft: "10px"}}
                        variant="standard"
                        onChange={handleChangeInfo}
                    />
                </div>
                <div className='flex items-center justify-between mt-4'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker
                            label="Ngày sinh"
                            value={profile?.dateOfBirth || null}
                            onChange={(newValue) => {
                                let date:string = dayjs(dayjs(newValue).toString()).format("YYYY-MM-DD");
                                setProfile({
                                    ...profile,
                                    dateOfBirth: date,
                                })
                            }}
                            renderInput={(params) => <TextField size='small' {...params} />}
                        />
                    </LocalizationProvider>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">Giới tính</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={profile?.gender}
                            label="Giới tính"
                            onChange={handleChangeGender}
                        >
                            <MenuItem value={"MALE"}>Nam</MenuItem>
                            <MenuItem value={"FEMALE"}>Nữ</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <TextField
                    margin="dense"
                    id="name"
                    label="Email"
                    type="email"
                    fullWidth
                    value={profile?.email}
                    variant="standard"
                    disabled={true}
                    onChange={handleChangeInfo}
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Số điện thoại"
                    type="text"
                    name='phoneNumber'
                    value={profile?.phoneNumber}
                    fullWidth
                    variant="standard"
                    onChange={handleChangeInfo}
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Địa chỉ"
                    type="text"
                    name='address'
                    value={profile?.address}
                    fullWidth
                    variant="standard"
                    onChange={handleChangeInfo}
                />
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={4}
                    name='moreInfo'
                    value={profile?.moreInfo}
                    onChange={handleChangeInfo}
                    placeholder="Thông tin khác"
                    style={{ width: "100%", marginTop: "16px", border: "1px solid gray", outline: "none", borderRadius: "4px", padding: "4px" }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button variant='contained' onClick={handleUpdateInfoUser}>Lưu lại</Button>
            </DialogActions>
        </Dialog>

        <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            // message={message}
            // action={action}
        >
            <Alert onClose={handleCloseSnackbar} severity={error !== "" ? "error" : "success"} sx={{ width: '100%' }}>
                {error !== "" ? error : "Cập nhật thông tin cá nhân thành công"}
            </Alert>
      </Snackbar>
    </div>
  )
}

export default Profile