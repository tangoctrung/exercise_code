import { DatePicker, DatePickerProps, Select, Spin, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getBranchs, getHistoryActionDeviceKeToan } from '../../endpoint/user';
// import Column from 'antd/es/table/Column';
interface DataType {
  stt: number;
  toolName: string;
  code: string,
  quantity: number;
  fee: number;
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
    dataIndex: 'fee',
    key: 'fee',
  },
];
  

function KeToanTienDungcu() {

  const { authUser } = useSelector((state:RootState) => state.user)
  const [branchId, setBranchId] = useState("");
  const [dataBranchs, setDataBranchs] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false);
  const [dataTools, setDataTools] = useState<any[]>([])
  const [totalMoney, setTotalMoney] = useState({
    tienVatchat: 0,
    tienKham: 0,
  })
  useEffect(() => {
    getBranchs()
      .then((res:any) => {
          console.log(res?.data?.data?.branches);
          let data = [...res?.data?.data?.branches]
          let data1:any = []
          data?.map((item:any, index:any) => {
              data1.push({value: item?.id, label: item?.branchName})
          })
          setDataBranchs(data1)
      })
      .catch((err) => {
          console.log(err);
      })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getHistoryActionDeviceKeToan(branchId)
      .then((res) => {
        console.log(res);
        let data = [...res?.data?.data?.toolManagements];
        // data.reverse();
        let data1: any[] = []
        let tien = 0;
        data?.map((item:any, index:number) => {
          tien += item?.fee
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setBranchId(value)
  };

  return (
    <div>
        <div className='mr-[20px] w-fit mb-[20px]'>
            <Select
                defaultValue="Chọn chi nhánh"
                size='large'
                style={{ width: "100%" }}
                onChange={handleChange}
                options={dataBranchs}
            />
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

export default KeToanTienDungcu