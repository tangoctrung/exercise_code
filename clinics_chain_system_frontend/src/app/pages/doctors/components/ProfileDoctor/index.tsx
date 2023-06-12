import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Alert, Button, Snackbar } from '@mui/material'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IMAGE_DEFAULT } from '../../../../constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { createProfileDoctor, updateInfoDoctor, updateProfileDoctor } from '../../../../endpoint/doctor';
import { useDispatch } from 'react-redux';
import { updateInfoDoctorStore, updateProfileDoctorStore } from '../../../../store/features/userSlice';
import ReactHtmlParser from 'react-html-parser';
import { storage } from '../../../../utils/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function ProfileDoctor({dataProfile}: {dataProfile:any}) {

  const [openDialogProfile, setOpenDialogProfile] = React.useState(false);
  const [openDialogInfo, setOpenDialogInfo] = React.useState(false);
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [titleDialog, setTitleDialog] = React.useState("");
  const { profileUser } = useSelector((state:RootState) => state.user)
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<any>("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const dispatch = useDispatch();
  // let userId:string = localStorage.getItem("userId") || "";
  const [infoDoctor, setInfoDoctor] = React.useState({
    dob: profileUser?.dob || "",
    firstName: profileUser?.firstName || "",
    lastName: profileUser?.lastName || "",
    phoneNumber: profileUser?.phoneNumber || "",
    address: profileUser?.address || "",
    specialistIn: profileUser?.specialistIn,
    avatarUrl: profileUser?.avatarUrl || "",
  })

  // let userId:string = localStorage.getItem("userId") || "";
  const [profile, setProfile] = React.useState({
    intro: profileUser?.profile?.intro,
    experience: profileUser?.profile?.experience,
    awards: profileUser?.profile?.awards,
  })

  useEffect(() => {
    setProfile({
      intro: profileUser?.profile?.intro,
      experience: profileUser?.profile?.experience,
      awards: profileUser?.profile?.awards,
    })  
  }, [profileUser])

  useEffect(() => {
    setInfoDoctor({
      dob: profileUser?.dob || "",
      firstName: profileUser?.firstName || "",
      lastName: profileUser?.lastName || "",
      phoneNumber: profileUser?.phoneNumber || "",
      address: profileUser?.address || "",
      specialistIn: profileUser?.specialistIn,
      avatarUrl: profileUser?.avatarUrl,
    })
  }, [profileUser])

  const editorRef:any = useRef(null);

  const SaveContent = () => {
    let dataRequest:any = {
      introduction: profileUser?.profile?.intro,
      experience: profileUser?.profile?.experience,
      awards: profileUser?.profile?.awards,
    }
    if (editorRef.current) {
      if (titleDialog==="Giới thiệu") {
        dataRequest.introduction = editorRef.current.getContent()
        setProfile({
          ...profile,
          intro: editorRef.current.getContent()
        })
      } else if (titleDialog==="Kinh nghiệm") {
        dataRequest.experience = editorRef.current.getContent()
        setProfile({
          ...profile,
          experience: editorRef.current.getContent()
        })
      } else {
        dataRequest.awards = editorRef.current.getContent()
        setProfile({
          ...profile,
          awards: editorRef.current.getContent()
        })
      }
    }

    dataProfile?.profile?.id ?
      updateProfileDoctor(dataRequest)
      .then((res) => {
          console.log("res: ", res);
          setOpenDialogProfile(false);
          setOpenDialogInfo(false);
          setOpenSnackbar(true);
          dispatch(updateProfileDoctorStore(dataRequest));
          // setData(res.data);
          setError("")
          setIsLoading(false);
      })
      .catch((err) => {
          // setError(err);
          setOpenSnackbar(true)
          setError("Cập nhật thông tin thất bại, hãy thử lại")
          setIsLoading(false);
      })  :
      createProfileDoctor(dataRequest)
      .then((res) => {
          console.log("res: ", res);
          setOpenDialogProfile(false);
          setOpenDialogInfo(false);
          setOpenSnackbar(true);
          setError("")
          dispatch(updateProfileDoctorStore(dataRequest));
          // setData(res.data);
          setIsLoading(false);
      })
      .catch((err) => {
          // setError(err);
          setOpenSnackbar(true)
          setError("Cập nhật thông tin thất bại, hãy thử lại")
          setIsLoading(false);
      })


  };

  const handleClickOpenDialogProfile = () => {
      setOpenDialogProfile(true);
  };

  const handleCloseDialogProfile = () => {
      setOpenDialogProfile(false);
  };

  const handleClickOpenDialogInfo = (title: string) => {
    setOpenDialogInfo(true);
    setTitleDialog(title)
  };

  const handleCloseDialogInfo = () => {
      setOpenDialogInfo(false);
  };

  const handleChangeInfo = (e:any) => {
    console.log("edit info doctor");
    console.log(e);
    
    setInfoDoctor({
        ...infoDoctor,
        [e.target.name]: e.target.value===undefined ? "" : e.target.value
    })
  }
  const handleUpdateInfoUser = () => {
    updateInfoDoctor(infoDoctor)
        .then((res) => {
            console.log("res: ", res);
            if (res?.data?.success) {
                setOpenDialogProfile(false);
                setError("")
                setOpenSnackbar(true);
                dispatch(updateInfoDoctorStore(infoDoctor));
            } else {
                setError("Cập nhật thông tin thất bại, hãy thử lại")
                setOpenDialogProfile(false);
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError("");
  }

  const uploadFileToFirebaseStorage = (e: any) => {
    console.log(e);
    let file = e.target?.files[0];
    if (!file) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/avatars/${profileUser?.id}/${new Date().getTime()}`);
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
          setInfoDoctor({
            ...infoDoctor,
            avatarUrl: url,
          })
        });
      }
    );
  }

  return (
    <div className="layout p-[20px] h-full max-h-full min-w-full overflow-scroll">
      <div className=''>
        <div className='flex items-center justify-between'>
          <h2>Thông tin cơ bản</h2>
          <Button variant='contained' onClick={handleClickOpenDialogProfile}>Chỉnh sửa</Button>
        </div>
        <div className='flex items-center justify-start mt-[30px] ml-[50px] mr-[30px]'>
          <div className='w-[160px] h-[160px] '>
            <img 
              className='w-full h-full object-cover rounded-full'
              src={profileUser?.avatarUrl || IMAGE_DEFAULT} alt="" />
          </div>
          <div>
            <div className='pl-10 pr-10'>
              <div className='flex items-center'>
                  <p className='font-bold w-[100px]'>Họ tên: </p><span className='font-normal text-lg ml-4'>{profileUser?.firstName + " " + profileUser?.lastName}</span>
              </div>
              <div className='flex items-center'>
                  <p className='font-bold w-[100px]'>Ngày sinh: </p><span className='font-normal text-lg ml-4'>{profileUser?.dob || ""}</span>
              </div>
              <div className='flex items-center'>
                  <p className='font-bold w-[100px]'>SĐT: </p><span className='font-normal text-lg ml-4'>{profileUser?.phoneNumber || ""}</span>
              </div>
              <div className='flex items-center'>
                  <p className='font-bold w-[100px]'>Email: </p><span className='font-normal text-lg ml-4'>{profileUser?.email || ""}</span>
              </div>
              {/* <div className='flex items-center'>
                  <p className='font-bold w-[100px]'>Địa chỉ: </p><span className='font-normal text-lg ml-4'>Ngõ 42, Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội</span>
              </div> */}
              <div className='flex items-center'>
                  <p className='font-bold w-[100px]'>Chức danh: </p><span className='font-normal text-lg ml-4'>{profileUser?.specialistIn || ""}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-[50px]'>
        <div className='flex items-center justify-between'>
          <h2>Giới thiệu</h2>
          <Button variant='contained' onClick={() => handleClickOpenDialogInfo("Giới thiệu")}>Chỉnh sửa</Button>
        </div>
        <div className='flex items-center justify-start mt-[30px] ml-[50px] mr-[30px]'>
          <p>{ReactHtmlParser(profile?.intro) || <b>Chưa có thông tin</b>}</p>
        </div>
      </div>

      <div className='mt-[50px]'>
        <div className='flex items-center justify-between'>
          <h2>Kinh nghiệm</h2>
          <Button variant='contained' onClick={() => handleClickOpenDialogInfo("Kinh nghiệm")}>Chỉnh sửa</Button>
        </div>
        <div className='flex items-center justify-start mt-[30px] ml-[50px] mr-[30px]'>
          <p>{ReactHtmlParser(profile?.experience) || <b>Chưa có thông tin</b>}</p>
        </div>
      </div>

      <div className='mt-[50px]'>
        <div className='flex items-center justify-between'>
          <h2>Thành tựu</h2>
          <Button variant='contained' onClick={() => handleClickOpenDialogInfo("Thành tựu")}>Chỉnh sửa</Button>
        </div>
        <div className='flex items-center justify-start mt-[30px] ml-[50px] mr-[30px]'>
          <p>{ReactHtmlParser(profile?.awards) || <b>Chưa có thông tin</b>}</p>
        </div>
      </div>

      <Dialog open={openDialogProfile} onClose={handleCloseDialogProfile}>
        <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
        <DialogContent>
            <div className='flex justify-center'>
                <div className='w-32 h-32 relative'>
                    <img 
                        src={infoDoctor?.avatarUrl ? infoDoctor?.avatarUrl : IMAGE_DEFAULT} alt="" 
                        className='w-full h-full rounded-full object-cover'
                    />
                    <input type="file" hidden accept="image/*" onChange={uploadFileToFirebaseStorage}  id="icon-button-file" />
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
                  value={infoDoctor?.firstName}
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
                  value={infoDoctor?.lastName}
                  style={{marginLeft: "10px"}}
                  variant="standard"
                  onChange={handleChangeInfo}
              />
            </div>
            <div className='flex items-center justify-between mt-4'>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                        label="Ngày sinh"
                        value={infoDoctor?.dob}
                        onChange={(newValue) => {
                          let date:string = dayjs(dayjs(newValue).toString()).format("YYYY-MM-DD");
                          setValue(newValue);
                          setInfoDoctor({
                            ...infoDoctor,
                            dob: date,
                          })
                        }}
                        renderInput={(params) => <TextField size='small' {...params} />}
                    />
                </LocalizationProvider>
                {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Giới tính</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={age}
                        label="Giới tính"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Nam</MenuItem>
                        <MenuItem value={20}>Nữ</MenuItem>
                        <MenuItem value={20}>Khác</MenuItem>
                    </Select>
                </FormControl> */}
            </div>
            <TextField
                margin="dense"
                id="name"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                name="email"
                value={profileUser?.email}
                disabled={true}
            />
            <TextField
                margin="dense"
                id="name"
                label="Số điện thoại"
                type="number"
                name="phoneNumber"
                value={infoDoctor?.phoneNumber}
                fullWidth
                variant="standard"
                onChange={handleChangeInfo}
            />
            {/* <TextField
                margin="dense"
                id="name"
                label="Địa chỉ"
                type="text"
                fullWidth
                variant="standard"
            /> */}
            <TextField
                margin="dense"
                id="name"
                label="Chức danh"
                type="text"
                name="specialistIn"
                value={infoDoctor?.specialistIn}
                fullWidth
                variant="standard"
                onChange={handleChangeInfo}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialogProfile}>Hủy</Button>
            <Button variant='contained' onClick={handleUpdateInfoUser}>Lưu lại</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogInfo} onClose={handleCloseDialogInfo} fullWidth maxWidth="lg">
        <DialogTitle>{titleDialog || "Chỉnh sửa thông tin"}</DialogTitle>
        <DialogContent>
          <div className='min-w-[1000px] min-h-[600px] p-[20px]'>
            <Editor
              apiKey='73zpyvox38spiumqpji014joqvz2yyb0i3d67d6q7hmgggt0'
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue={titleDialog==="Giới thiệu" ? (profileUser?.profile?.intro) : (titleDialog==="Kinh nghiệm" ? profileUser?.profile?.experience : profileUser?.profile?.awards)}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialogInfo}>Hủy</Button>
            <Button variant='contained' onClick={SaveContent}>Lưu lại</Button>
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

export default ProfileDoctor;