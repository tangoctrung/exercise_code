import TextareaAutosize from '@mui/base/TextareaAutosize';
import React, { useRef } from 'react'
import { IMAGE_DEFAULT } from '../../../../../constant'
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import useGetServicesType from '../../../../../hooks/useGetServicesType';
import { timeCreateTreatment } from '../../../../../../services/formatTime';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  
function getStyles(name: string, listService: readonly string[], theme: Theme) {
    return {
        fontWeight:
        listService.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

function DialogTreament({treament, setTreatmentSelect}:
    {treament:any, setTreatmentSelect:any}) {
  const theme = useTheme();
  const [listService, setListService] = React.useState<string[]>(treament?.serviceNames || []);
  const [totalMoney, setTotalMoney] = React.useState(0)
  const { dataServices } = useGetServicesType()
  const editorChuandoanRef:any = useRef(null);
  const editorKedonRef:any = useRef(null);


  console.log(dataServices);
  
  const handleChangeRevisit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTreatmentSelect({
        ...treament,
        isRevisit: event.target.checked,
    })
  };

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    let total = 0;
    value?.map((item:any) => {
        total += item?.fee
    })
    setTotalMoney(total)
    setListService(value);
    setTreatmentSelect({
        ...treament,
        serviceNames: value,
        totalFee: total,
    })
  };

  React.useEffect(() => {
    let total = 0;
    listService?.map((item:any) => {
        total += item?.fee
    })
    setTotalMoney(total)
  }, [listService])

  const handleChangeInfo = (e:any) => {
    setTreatmentSelect({
        ...treament,
        [e.target.name]: e.target.value===undefined ? "" : e.target.value
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE').format(price)
  }

  const handleChooseTime = (e:any) => {
    console.log(e.target.value);
    setTreatmentSelect({
        ...treament,
        timeRevisit: timeCreateTreatment(e.target.value)
    })
    // const date = moment(e.target.value);
    // const formattedDate = date.format('YYYY-MM-DD HH:mm:ss Z');
    // setDataRequest({
    //   ...dataRequest,
    //   meetingTime: timeReservation(e.target.value)
    // })
  }

  return (
    <div>
        <div className='flex flex-col items-center justify-center'>
            {/* <div className='min-w-[200px] h-[280px] mr-[20px]'>
                <img src={IMAGE_DEFAULT} alt="avatar" className='w-full h-full object-cover rounded-lg' />
            </div> */}
            <b className='w-full text-left mb-[20px] text-lg'>Thông tin cơ bản</b>
            <div className=''>
                <div className='mb-[16px]'>
                    <TextField
                        fullWidth
                        required
                        label="Họ tên"
                        id=""
                        size="small"
                        style={{ marginRight: "10px" }}
                        name='name'
                        variant="standard"
                        value={treament?.name}
                        onChange={handleChangeInfo}
                    />
                </div>
                <div className='flex justify-between mb-[16px]'>
                    <TextField
                        fullWidth
                        required
                        label="Giới tính"
                        id=""
                        size="small"
                        style={{ marginRight: "10px" }}
                        variant="standard"
                        name='gender'
                        value={treament?.gender}
                        onChange={handleChangeInfo}
                    />
                    <TextField
                        fullWidth
                        required
                        label="Ngày sinh"
                        id=""
                        size="small"
                        variant="standard"
                        name='dob'
                        value={treament?.dob}
                        onChange={handleChangeInfo}
                    />
                </div>
                <div className='mb-[16px]'>
                    <TextField
                        fullWidth
                        required
                        label="SĐT"
                        id=""
                        size="small"
                        variant="standard"
                        name='phoneNumber'
                        value={treament?.phoneNumber}
                        onChange={handleChangeInfo}
                    />
                </div>
                <div className='mb-[16px]'>
                    <TextField
                        fullWidth
                        required
                        label="Email"
                        id=""
                        size="small"
                        variant="standard"
                        name='email'
                        value={treament?.email}
                        onChange={handleChangeInfo}
                        // disabled
                    />
                </div>
                <div className=''>
                    <TextField
                        fullWidth
                        required
                        label="Địa chỉ"
                        id=""
                        size="small"
                        variant="standard"
                        value={treament?.address}
                        name='address'
                        onChange={handleChangeInfo}
                    />
                </div>
            </div>
        </div>
        <div className='w-full'>
            <div className='flex flex-col mt-[20px]'>
                <b className='mb-[10px] text-lg'>Triệu chứng</b>
                <TextareaAutosize 
                    name='symptoms'
                    value={treament?.symptoms}
                    onChange={handleChangeInfo}
                    style={{ width: "100%", height: "120px", border: "1px solid gray", outline: "none", padding: "8px", borderRadius: "5px" }} 
                />
            </div>
            <div className='flex flex-col mt-[20px] w-full'>
                <b className='mb-[10px] text-lg'>Mô tả chuẩn đoán</b>
                <div className='w-full min-h-[400px]'>
                    <Editor
                        apiKey='73zpyvox38spiumqpji014joqvz2yyb0i3d67d6q7hmgggt0'
                        onInit={(evt, editor) => editorChuandoanRef.current = editor}
                        initialValue={treament?.code}
                        init={{
                            setup : function(ed){
                                ed.on('change', function(e){
                                    setTreatmentSelect((state:any) => ({
                                        ...state,
                                        code: ed.getContent()
                                    }))
                                });
                            },
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
            </div>
            <div className='flex flex-col mt-[20px]'>
                <b className='mb-[10px] text-lg'>Kết luận</b>
                <TextareaAutosize
                    name='conclusion'
                    value={treament?.conclusion}
                    onChange={handleChangeInfo}
                    style={{ width: "100%", height: "120px", border: "1px solid gray", outline: "none", padding: "8px", borderRadius: "5px" }} 
                />
            </div>
            <div className='flex flex-col mt-[20px]'>
                <b className='mb-[10px] text-lg'>Kê đơn</b>
                <div className='w-full min-h-[400px]'>
                    <Editor
                        apiKey='73zpyvox38spiumqpji014joqvz2yyb0i3d67d6q7hmgggt0'
                        onInit={(evt, editor) => editorKedonRef.current = editor}
                        initialValue={treament?.prescription}
                        init={{
                            setup : function(ed){
                                ed.on('change', function(e){
                                    setTreatmentSelect((state:any) => ({
                                        ...state,
                                        prescription: ed.getContent()
                                    }))
                                });
                            },
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
            </div>
            <div className='flex flex-col mt-[20px]'>
                <b className='mb-[10px] text-lg'>Dịch vụ sử dụng</b>
                <div>
                    <FormControl sx={{ m: 1, width: 500 }}>
                        <InputLabel id="demo-multiple-chip-label">Dịch vụ</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={listService}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Dịch vụ" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value:any) => (
                                    <Chip key={value?.id} label={value?.serviceName} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {dataServices?.map((item:any, index:number) => (
                                <MenuItem
                                    key={index}
                                    value={item}
                                    style={getStyles(item?.serviceName, listService, theme)}
                                >
                                    {item?.serviceName} ({formatPrice(item?.fee)} VNĐ)
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className='flex items-center mt-[20px]'>
                <p className='mr-[16px] text-lg'>Tổng chi phí: </p>
                <b className='text-xl'>{formatPrice(totalMoney)} VNĐ</b>
            </div>
            <div className='mt-[20px]'>
                <p className='mr-[16px] mb-[10px] text-lg'>Tái khám</p>
                <FormGroup>
                    <FormControlLabel 
                        control={
                            <Switch checked={treament?.isRevisit || false} onChange={handleChangeRevisit} defaultChecked={false} />
                        } 
                        label="Có tái khám" 
                    />
                </FormGroup>
                {treament?.isRevisit &&
                    <input 
                        className='py-2 px-4 w-[50%] rounded-lg outline-none border-[1px] border-gray-300' 
                        type="datetime-local"
                        onChange={handleChooseTime}
                    />
                }
            </div>
        </div>
    </div>
  )
}

export default DialogTreament