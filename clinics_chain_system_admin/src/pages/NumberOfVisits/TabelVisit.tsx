import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Modal, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getBranchId, getListTreatment } from '../../endpoint/user';
import moment from 'moment'
import dayjs  from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
const { RangePicker } = DatePicker;

interface DataType {
    stt: number;
    name: string;
    doctorName: string;
    timeStart: string;
    symptoms: string;
    conclusion: string;
}

  
function TabelVisit() {
    const [openModal, setOpenModal] = useState(false);
    const [dataRecord, setDataRecord] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [dataQuery, setDataQuery] = useState({
        from: '2022-12-25',
        to: '2024-01-01',
        branchId: ''
    })
  const { authUser } = useSelector((state:RootState) => state.user)
  
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
        getListTreatment(dataQuery?.branchId, dataQuery?.from, dataQuery?.to)
            .then((res) => {
                setIsLoading(false)
                if (!res?.data?.data?.treatmentRecords) {
                    setDataRecord([])
                    return
                }
                let data = [...res?.data?.data?.treatmentRecords];
                let data1: any[] = []
                data?.map((item:any, index:number) => {
                    data1.push({
                        ...item,
                        stt: index + 1,
                        timeStart: moment(item?.timeStart).format("DD-MM-YYYY")
                    })
                })
                setDataRecord(data1)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
            })
    }, [dataQuery?.branchId, dataQuery?.from, dataQuery?.to])

    // const handleOpenModal = (data:any) => {
    //     setOpenModal(true);
    //     // setDataRecord(data);
    //     console.log(data);      
    // }

    const handleChangeDay = (values:any) => {
        if (values[0] && values[1]) {
            setDataQuery({
                ...dataQuery,
                from: dayjs(values[0]).format("YYYY-MM-DD"),
                to: dayjs(values[1]).format("YYYY-MM-DD"),
            })
        } else {
            setDataQuery({
                ...dataQuery,
                from: '2022-12-25',
                to: '2026-01-01'
            })
        }
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
            title: 'Triệu chứng',
            key: 'symptoms',
            dataIndex: 'symptoms',
        },
        {
            title: 'Kết luận',
            key: 'conclusion',
            dataIndex: 'conclusion',
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <div>
        //             <Button onClick={() => handleOpenModal(record)}>Xem thêm</Button>
        //         </div>
        //     ),
        // },
    ];
  return (
    <div className='w-full h-full '>
        <div className='flex items-center'>
            <RangePicker size='large' onChange={handleChangeDay} />
        </div>
        {!isLoading && 
            <div className='mt-[30px]'>
                <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={dataRecord} />
            </div>}
        {isLoading && 
            <div className='w-full flex justify-center mt-[70px]'>
              <Spin size='large' />
            </div>}
        <Modal
            title="Chi tiết khám bệnh"
            centered
            open={openModal}
            onOk={() => setOpenModal(false)}
            onCancel={() => setOpenModal(false)}
            width={1000}
            style={{ maxHeight: "800px" }}
        >
            <p>Hello</p>
        </Modal>
    </div>
  )
}

export default TabelVisit