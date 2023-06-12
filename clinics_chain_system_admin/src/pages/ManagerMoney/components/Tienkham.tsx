import { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react'
import { DatePicker, DatePickerProps, Spin, Table, Tag } from 'antd';
import { getBranchId, getListTreatment } from '../../../endpoint/user';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface DataType {
    stt: number;
    name: string;
    doctorName: string;
    timeStart: string;
    serviceNames: string[];
    totalPrice: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
    },
    {
        title: 'Tên bệnh nhân',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Tên bác sĩ',
        dataIndex: 'doctorName',
        key: 'doctorName',
    },
    {
        title: 'Ngày khám',
        dataIndex: 'timeStart',
        key: 'timeStart',
    },
    {
        title: 'Dịch vụ',
        key: 'services',
        dataIndex: 'services',
        render: (_, { serviceNames }) => (
            <>
              {serviceNames && serviceNames?.map((service:any) => {
                let color = service?.serviceName?.length > 15 ? 'geekblue' : 'green';
                if (service?.serviceName === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={service}>
                    {service?.serviceName.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
    },
    {
        title: 'Tổng tiền',
        key: 'totalPrice',
        dataIndex: 'totalPrice',
        render: (_, { serviceNames }) => {
            let total = 0;
            serviceNames?.forEach((item:any) => {
                total += item?.fee
            })
            return <>{new Intl.NumberFormat('de-DE').format(total)}</>
        },
    },
];
  

function Tienkham() {

    const [dataTreatment, setDataTreatment] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [dataQuery, setDataQuery] = useState({
        from: '2022-12-25',
        to: '2024-01-01',
        branchId: ''
    })
    const { authUser } = useSelector((state:RootState) => state.user)
    const [tienKham, setTienKham] = useState(0)
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('de-DE').format(price)
    }

    useEffect(() => {
        if (authUser?.role !== 4) {
          getBranchId()
            .then((res) => {
              setDataQuery({
                ...dataQuery,
                branchId: res?.data?.data?.branchId
              })
            })
            .catch((err) => {
    
            })
        }
    }, [authUser?.role])


    useEffect(() => {
        if (!dataQuery?.branchId && authUser?.role !== 4) return;
        setIsLoading(true);
        getListTreatment(dataQuery?.branchId ,dataQuery?.from, dataQuery?.to)
            .then((res) => {
                setIsLoading(false)
                if (!res?.data?.data?.treatmentRecords) {
                    setDataTreatment([])
                    setTienKham(0)
                    return
                }
                let data = [...res?.data?.data?.treatmentRecords];
                let data1: any[] = []
                let tien = 0
                data?.map((item:any, index:number) => {
                    data1.push({
                        ...item,
                        stt: index + 1,
                        timeStart: moment(item?.timeStart).format("DD-MM-YYYY")
                    })
                    item?.serviceNames?.forEach((item:any) => {
                        tien += item?.fee
                    })
                })
                setTienKham(tien)
                setDataTreatment(data1)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
            })
    }, [authUser?.role, dataQuery?.branchId, dataQuery?.from, dataQuery?.to])

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        let endDay
        let month = parseInt(dateString.split("-")[1])
        console.log(month);
        
        if (month === 2) {
            endDay = "-28"
        } else if (month === 4 || month === 6 || month === 9 || month === 11) {
            endDay = "-30"
        } else {
            endDay = "-31"
        }
        setDataQuery({
            ...dataQuery,
            from: dateString + "-01",
            to: dateString + endDay
        })
    };

  return (
    <div>
        <div className='mb-[20px]'>
            <DatePicker onChange={onChangeDate} picker="month" size='large' />
        </div>
        {!isLoading && 
            <div>
                <Table pagination={{ pageSize: 7 }} columns={columns} dataSource={dataTreatment} />
            </div>}
        {isLoading && 
            <div className='w-full flex justify-center mt-[70px]'>
                <Spin size='large' />
            </div>}
        <p className='text-sm text-slate-600'>Tổng tiền thu: <b className='underline text-xl'>{formatPrice(tienKham)} VNĐ</b></p>
    </div>
  )
}

export default Tienkham