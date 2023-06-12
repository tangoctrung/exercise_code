import { Button, Modal, Spin, Table, Tabs, TabsProps } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react'
import TableAddRow from '../../components/TableAddRow/TableAddRow';
import { getBranchId, getListDoctor, getListTool } from '../../endpoint/user';
import AssignDevice from './components/AssignDevice';
import ReturnAssignDevice from './components/ReturnAssignDevice';
import HistoryActionDevice from './components/HistoryActionDevice';

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
    title: 'Max thiết bị',
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

function Infrastructure() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalAssign, setOpenModalAssign] = useState(false);

  const [branchId, setBranchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataTools, setDataTools] = useState<any[]>([])
  const [listTool, setListTool] = useState<any[]>([])
  const [listDoctor, setListDoctor] = useState<any[]>([])
  const onChange = (key: string) => {
    console.log(key);
  };
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Bàn giao`,
      children: <AssignDevice listTool={listTool} listDoctor={listDoctor} />,
    },
    {
      key: '2',
      label: `Thu hồi bàn giao`,
      children: <ReturnAssignDevice branchId={branchId} />,
    },
    {
      key: '3',
      label: `Lịch sử`,
      children: <HistoryActionDevice branchId={branchId} />,
    },
  ];
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
    if (!branchId) return;
    setIsLoading(true)
    getListTool(branchId)
      .then((res) => {
        console.log(res);
        let data = [...res?.data?.data?.tools];
        data.reverse();
        let data1: any[] = []
        data?.map((item:any, index:number) => {
          data1.push({
            ...item,
            stt: index + 1
          })
        })
        setDataTools(data1)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      })
  }, [branchId])

  const handleClickAssign = () => {
    Promise.all([getListTool(branchId), getListDoctor(branchId)])
      .then((res) => {
        console.log(res);
        let dataTool = [...res[0]?.data?.data?.tools]
        let dataDoctor = [...res[1]?.data?.data?.doctors]
        let dataTool1: any[] = []
        let dataDoctor1: any[] = []

        dataTool?.map((item:any) => {
          dataTool1.push({
            value: item?.id || "",
            label: item?.toolName + " (" + item?.code + ") (" + item?.quantity + " cái)"
          })
        })
        dataDoctor?.map((item:any) => {
          dataDoctor1.push({
            value: item?.id || "",
            label: item?.firstName + " " + item?.lastName + " (" + item?.specialistIn + ")"
          })
        })

        setListTool(dataTool1)
        setListDoctor(dataDoctor1)
        setOpenModalAssign(true)
      })
      .catch((err) => {
        console.log(err);
      })
    
  }

  return (
    <div>
      <div className='mb-[20px] flex items-center justify-between'>
        <Button type='primary' onClick={() => setOpenModal(true)}>Khai báo</Button>
        <Button type='primary' onClick={handleClickAssign}>Bàn giao</Button>
      </div>
      {!isLoading &&
        <div>
          <Table pagination={{ pageSize: 10 }} columns={columns} dataSource={dataTools} />
        </div>}
      {isLoading && 
        <div className='w-full flex justify-center mt-[70px]'>
          <Spin size='large' />
        </div>}

      <Modal
        title="Khai báo cơ sở vật chất"
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        width={600}
        style={{ maxHeight: "800px" }}
      >
        <TableAddRow branchId={branchId} dataTools={dataTools} setDataTools={setDataTools} />
      </Modal>

      <Modal
        title="Bàn giao thiết bị"
        centered
        open={openModalAssign}
        onOk={() => setOpenModalAssign(false)}
        onCancel={() => setOpenModalAssign(false)}
        width={500}
        style={{ maxHeight: "800px" }}
      >
        <div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </Modal>
    </div>
  )
}

export default Infrastructure