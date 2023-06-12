import React from 'react'
import { IMAGE_DEFAULT } from '../../../../../constant'
import ListItemText from '@mui/material/ListItemText';
import { List, ListItem, ListItemIcon } from '@mui/material';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';


function FilePrintTreatment({treament}: {treament:any}) {

    const caculatorFee = (array: any) => {
        let sum = 0;
        array.forEach((element: any) => {
            sum += element?.fee
            console.log(element?.fee);
        });
        console.log(sum);
        
        return sum;
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('de-DE').format(price)
      }
  return (
    <div className=''>
        <div className='flex items-center justify-center'>
            <div className=''>
                <div className='flex mb-[16px]'>
                    <p className='w-[100px]'>Họ tên: </p>
                    <b>{treament?.name}</b>
                </div>
                <div className='flex mb-[16px]'>
                    <p className='w-[100px]'>Giới tính: </p>
                    <b>{treament?.gender ? (treament?.gender === "MALE" ? "Nam" : "Nữ") : ""}</b>
                </div>
                <div className='flex mb-[16px]'>
                    <p className='w-[100px]'>Ngày sinh: </p>
                    <b>{treament?.dob}</b>
                </div>
                <div className='flex mb-[16px]'>
                    <p className='w-[100px]'>SĐT: </p>
                    <b>{treament?.phoneNumber}</b>
                </div>
                <div className='flex mb-[16px]'>
                    <p className='w-[100px]'>Email: </p>
                    <b>{treament?.email}</b>
                </div>
                <div className='flex'>
                    <p className='w-[100px]'>Địa chỉ: </p>
                    <b>{treament?.address ? treament?.address : "Chưa có thông tin"}</b>
                </div>
            </div>
        </div>
        <div className='w-full'>
            <div className='flex flex-col mt-[40px]'>
                <b className='mb-[10px] text-lg py-2 px-6 rounded-3xl bg-slate-200 w-fit'>Triệu chứng</b>
                <div className='text-justify ml-[20px]'>{treament?.symptoms ? treament?.symptoms : "Chưa có thông tin"}</div>
            </div>
            <div className='flex flex-col mt-[40px] w-full'>
                <b className='mb-[10px] text-lg py-2 px-6 rounded-3xl bg-slate-200 w-fit'>Mô tả chuẩn đoán</b>
                <div className='text-justify ml-[20px]'>{treament?.code ? ReactHtmlParser(treament?.code) : <b>Chưa có thông tin</b>}</div>
            </div>
            <div className='flex flex-col mt-[40px]'>
                <b className='mb-[10px] text-lg py-2 px-6 rounded-3xl bg-slate-200 w-fit'>Kết luận</b>
                <div className='text-justify ml-[20px]'>{treament?.conclusion || <b>Chưa có thông tin</b>}</div>
            </div>
            <div className='flex flex-col mt-[40px]'>
                <b className='mb-[10px] text-lg py-2 px-6 rounded-3xl bg-slate-200 w-fit'>Kê đơn</b>
                <div className='text-justify ml-[20px]'>{treament?.prescription ? ReactHtmlParser(treament?.prescription) : <b>Chưa có thông tin</b>}</div>
            </div>
            <div className='flex flex-col mt-[40px]'>
                <b className='mb-[10px] text-lg py-2 px-6 rounded-3xl bg-slate-200 w-fit'>Dịch vụ sử dụng</b>
                <div className='ml-[30px]'>
                    <List dense={true}>
                        {treament?.serviceNames && treament?.serviceNames?.map((item:any, index: number) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <LocalHospitalRoundedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item?.serviceName}
                                    secondary={formatPrice(item?.fee)}
                                />
                            </ListItem>
                        ))}
                        {!treament?.serviceNames && <b>Chưa có thông tin</b>}
                    </List>
                </div>
            </div>
            {treament?.serviceNames && 
                <div className='flex items-center mt-[20px]'>
                    <p className='mr-[16px] text-lg'>Tổng chi phí: </p>
                    <b className='text-xl'>{formatPrice(caculatorFee(treament?.serviceNames))} VNĐ</b>
                </div>}
            {treament?.isRevisit && 
                <div className='flex flex-col mt-[40px] w-full'>
                    <b className='mb-[10px] text-lg py-2 px-6 rounded-3xl bg-slate-200 w-fit'>Lịch tái khám</b>
                    <div className='text-justify font-bold ml-[20px]'>{treament?.revisitTime && moment(treament?.revisitTime).format("hh:mm DD-MM-YYYY")}</div>
                </div>}
        </div>
        <div>

        </div>
    </div>
  )
}

export default FilePrintTreatment