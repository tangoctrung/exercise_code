import { DatePicker, DatePickerProps, Spin, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react'
import { getBranchId, getListTool } from '../../../endpoint/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
// import Column from 'antd/es/table/Column';
const { Column } = Table;
interface DataType {
  stt: number;
  toolName: string;
  code: string,
  quantity: number;
  price: number;
  boughtPlace: string;
  boughtDate: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Tên thiết bị',
    dataIndex: 'toolName',
    key: 'toolName',
  },
  {
    title: 'Mã thiết bị',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Giá tiền',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Nơi mua',
    key: 'boughtPlace',
    dataIndex: 'boughtPlace',
  },
  {
    title: 'Ngày mua',
    key: 'boughtDate',
    dataIndex: 'boughtDate',
  },
];
  

function Cosovatchat() {

  const { authUser } = useSelector((state:RootState) => state.user)
  const [branchId, setBranchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataTools, setDataTools] = useState<any[]>([])
  const [totalMoney, setTotalMoney] = useState({
    tienVatchat: 0,
    tienKham: 0,
  })
  useEffect(() => {
    getBranchId()
      .then((res) => {
        setBranchId(res?.data?.data?.branchId)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    if (!branchId  && authUser?.role !== 4) return;
    setIsLoading(true)
    getListTool(branchId)
      .then((res) => {
        console.log(res);
        let data = [...res?.data?.data?.tools];
        data.reverse();
        let data1: any[] = []
        let tien = 0;
        data?.map((item:any, index:number) => {
          tien += item?.price
          data1.push({
            ...item,
            stt: index + 1
          })
        })
        setTotalMoney({
          ...totalMoney,
          tienVatchat: tien
        })
        setDataTools(data1)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      })
  }, [branchId])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE').format(price)
  }

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
        <div className='mb-[20px]'>
            <DatePicker onChange={onChangeDate} picker="month" size='large' />
        </div>

        {!isLoading &&
          <div>
              <Table pagination={{ pageSize: 7 }} columns={columns} dataSource={dataTools} />
          </div>}
        {isLoading && 
          <div className='w-full flex justify-center mt-[70px]'>
            <Spin size='large' />
          </div>}
        <p className='text-sm text-slate-600'>Tổng chi phí: <b className='underline text-xl'>{formatPrice(totalMoney?.tienVatchat)} VNĐ</b></p>
    </div>
  )
}

export default Cosovatchat