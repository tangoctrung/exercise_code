import { Card, CardContent, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

function CardRegisterTime({dataTime}:{dataTime:any}) {

    return (
        <div className='m-[10px] flex items-center justify-between p-[10px] w-[275px] h-[190px]'>
            <Card sx={{ minWidth: 275, minHeight: 190 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Ngày <b>{moment(dataTime?.date).format("DD-MM-YYYY")}</b>
                    </Typography>
                    <Typography color="text.secondary" component="div">
                        Đăng ký <b>{dataTime?.shifts?.length}</b> ca làm việc: 
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="" className='flex flex-col'>
                        {dataTime && dataTime?.shifts?.map((item:any, index:number) => (
                            <b key={index} className='mb-[4px] ml-[20px]'>Ca {item ===("08:00 - 12:00") ? "1" : (item === ("13:30 - 17:30") ? "2" : "3")}({item})</b>
                        ))}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default CardRegisterTime