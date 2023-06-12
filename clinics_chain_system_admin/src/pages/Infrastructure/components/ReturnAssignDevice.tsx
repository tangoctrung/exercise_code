import React, { useEffect, useState, useMemo } from 'react'
import { getListAssignDevice, returnAssignDevice } from '../../../endpoint/user'
import moment from 'moment'
import { Button, notification } from 'antd'
import { NotificationPlacement } from 'antd/es/notification/interface'
const Context = React.createContext({ name: 'Default' });

function ReturnAssignDevice({branchId} : {branchId:string}) {

    const [listAssign, setListAssign] = useState<any[]>([])

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement) => {
      api.success({
      message: `Thông báo thiết bị`,
      description: <Context.Consumer>{({ name }) => `Thu hồi thiết bị thành công!`}</Context.Consumer>,
      placement,
      });
    };
    const openNotificationFail = (placement: NotificationPlacement) => {
        api.error({
        message: `Thông báo thiết bị`,
        description: <Context.Consumer>{({ name }) => `Thu hồi thiết bị thất bại`}</Context.Consumer>,
        placement,
        });
    };

    useEffect(() => {
        getListAssignDevice(branchId)
            .then((res) => {
              setListAssign(res?.data?.data?.toolUsers)
            })
            .catch((err) => {
            })
    }, [branchId])

    const handleReturnAssign = (index:number) => {
      let id = listAssign[index]?.id;
      returnAssignDevice(id)
        .then((res) => {
          openNotification('topRight')
          let data = [...listAssign]
          let data1 = data.filter((item) => item?.id !== id)
          console.log(data1);
          setListAssign(data1);
        })
        .catch((err) => {
          openNotificationFail('topRight')
        })
    }

    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div>
        {listAssign && listAssign?.map((item:any, index:number) => (
        <div className='mb-[10px] flex justify-between items-center p-[10px] rounded-md bg-slate-100'>
            <div className='mr-[6px]'>
              <b>Ngày: {moment(item?.createdAt).format("DD-MM-YYYY")}</b>
              <p>Bàn giao <b>{item?.quantity} {item?.toolName}</b> cho bác sĩ <b>{item?.doctorName}</b></p>
            </div>
            <div>
              <Button 
                color='red'
                onClick={() => handleReturnAssign(index)}
              >
                Thu hồi
              </Button>
            </div>
          </div>
        ))}
        
      </div>
    </Context.Provider>
  )
}

export default ReturnAssignDevice