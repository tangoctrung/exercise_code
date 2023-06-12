import React from 'react'
import { Button } from '@mui/material'
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
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Profile() {

    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');
    const [value, setValue] = React.useState<Dayjs | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
            <DialogContent>
                <div className='flex justify-center'>
                    <div className='w-32 h-32 relative'>
                        <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS39u3F-cCvsUAxZqlKExK8TbsypeGKypLzqw&usqp=CAU" alt="" 
                            className='w-full h-full rounded-full object-cover'
                        />
                        <input type="file" hidden accept="image/*"  id="icon-button-file" />
                        <label className='absolute top-0 left-0 w-full h-full' htmlFor="icon-button-file"></label>
                    </div>
                </div>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Họ và tên"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <div className='flex items-center justify-between mt-4'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker
                            label="Ngày sinh"
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(params) => <TextField size='small' {...params} />}
                        />
                    </LocalizationProvider>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
                    </FormControl>
                </div>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    disabled={true}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Số điện thoại"
                    type="number"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Địa chỉ"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={4}
                    placeholder="Thông tin khác"
                    style={{ width: "100%", marginTop: "16px", border: "1px solid gray", outline: "none", borderRadius: "4px", padding: "4px" }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button variant='contained' onClick={handleClose}>Lưu lại</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default Profile