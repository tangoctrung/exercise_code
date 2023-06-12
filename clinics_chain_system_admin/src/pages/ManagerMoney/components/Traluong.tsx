import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React from 'react'

interface DataType {
    stt: number;
    name: string;
    quantity: number;
    price: number;
    where: string;
    date: string;
  }
  
const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Gía tiền',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Nơi mua',
      key: 'where',
      dataIndex: 'where',
    },
    {
      title: 'Ngày mua',
      key: 'date',
      dataIndex: 'date',
    },
];
  
const data: DataType[] = [
    {
      stt: 1,
      name: 'John Brown',
      quantity: 32,
      price: 1000000,
      where: 'New York No. 1 Lake Park',
      date: '20-10-2022',
    },
    {
      stt: 2,
      name: 'Jim Green',
      quantity: 42,
      price: 1000000,
      where: 'London No. 1 Lake Park',
      date: '29-12-2022',
    },
    {
      stt: 3,
      name: 'Joe Black',
      quantity: 32,
      price: 1000000,
      where: 'Sydney No. 1 Lake Park',
      date: '11-02-2023',
    },
    {
      stt: 1,
      name: 'John Brown',
      quantity: 32,
      price: 1000000,
      where: 'New York No. 1 Lake Park',
      date: '20-10-2022',
    },
    {
      stt: 2,
      name: 'Jim Green',
      quantity: 42,
      price: 1000000,
      where: 'London No. 1 Lake Park',
      date: '29-12-2022',
    },
    {
      stt: 3,
      name: 'Joe Black',
      quantity: 32,
      price: 1000000,
      where: 'Sydney No. 1 Lake Park',
      date: '11-02-2023',
    },
    {
      stt: 1,
      name: 'John Brown',
      quantity: 32,
      price: 1000000,
      where: 'New York No. 1 Lake Park',
      date: '20-10-2022',
    },
    {
      stt: 2,
      name: 'Jim Green',
      quantity: 42,
      price: 1000000,
      where: 'London No. 1 Lake Park',
      date: '29-12-2022',
    },
    {
      stt: 3,
      name: 'Joe Black',
      quantity: 32,
      price: 1000000,
      where: 'Sydney No. 1 Lake Park',
      date: '11-02-2023',
    },
];

function Traluong() {
  return (
    <div>
        <div>
            <Table pagination={{ pageSize: 7 }} columns={columns} dataSource={data} />
        </div>
        <p className='text-sm text-slate-600'>Tổng chi phí: <b className='underline text-xl'>10.000.000VNĐ</b></p>
    </div>
  )
}

export default Traluong