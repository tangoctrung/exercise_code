import { Button, Input, Select, notification } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { NotificationPlacement } from 'antd/es/notification/interface';
import React, { useMemo, useState } from 'react'
import { assignDevice } from '../../../endpoint/user';
const Context = React.createContext({ name: 'Default' });

function AssignDevice({listTool, listDoctor}: {listTool:any[], listDoctor: any[]}) {


    const [dataRequest, setDataRequest] = useState({
        doctorId: "",
        toolId: "",
        quantity: 0,
        desc: ""
    })
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement) => {
        api.success({
        message: `Thông báo thiết bị`,
        description: <Context.Consumer>{({ name }) => `Bàn giao thiết bị thành công!`}</Context.Consumer>,
        placement,
        });
    };
    const openNotificationFail = (placement: NotificationPlacement) => {
        api.error({
        message: `Thông báo thiết bị`,
        description: <Context.Consumer>{({ name }) => `Bàn giao thiết bị thất bại`}</Context.Consumer>,
        placement,
        });
    };
    const handleChangeDevice = (value: string) => {
        console.log(`selected ${value}`);
        setDataRequest({
            ...dataRequest,
            toolId: value
        })
    };

    const handleChangeDoctor = (value: string) => {
        console.log(`selected ${value}`);
        setDataRequest({
            ...dataRequest,
            doctorId: value
        })
    };

    const handleChangeText = (e:any) => {
        if (e.target.name === "quantity"){
            setDataRequest({
                ...dataRequest,
                [e.target.name]: parseInt(e.target.value)
            })
            return
        }
        setDataRequest({
            ...dataRequest,
            [e.target.name]: e.target.value
        })
    }

    const handleAssignDevice = () => {
        console.log(dataRequest);
        assignDevice(dataRequest)
            .then((res) => {
                openNotification('topRight')
            })
            .catch((err) => {
                openNotificationFail('topRight')
            })
        
    }

    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <Context.Provider value={contextValue}>
        {contextHolder}
        <div className='w-full flex justify-center flex-col items-center'>
            <div className='mb-[12px]'>
                <Select
                    placeholder="Chọn thiết bị"
                    style={{ width: 300, height: 40 }}
                    size='large'
                    onChange={handleChangeDevice}
                    options={listTool}
                />
            </div>
            <div className='mb-[12px]'>
                <Select
                    placeholder="Chọn bác sĩ"
                    style={{ width: 300, height: 40 }}
                    size='large'
                    onChange={handleChangeDoctor}
                    options={listDoctor}
                />
            </div>
            <div className='mb-[12px]'>
                <Input 
                    placeholder="Số lượng thiết bị"
                    type='number'
                    className='w-[300px]'
                    size='large'
                    name='quantity'
                    onChange={handleChangeText}
                />
            </div>
            <div className='mb-[12px]'>
                <TextArea 
                    placeholder="Mô tả"
                    name='desc'
                    className='w-[300px] h-[400px]'
                    onChange={handleChangeText}
                />
            </div>
            <div className='mb-[12px]'>
                <Button
                    className=''
                    type='primary'
                    onClick={handleAssignDevice}
                >
                    Bàn giao
                </Button>
            </div>
        </div>
    </Context.Provider>
  )
}

export default AssignDevice