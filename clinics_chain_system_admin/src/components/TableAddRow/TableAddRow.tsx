import { Button, Input, notification } from 'antd';
import React, { useMemo, useState } from 'react';
import { createTool } from '../../endpoint/user';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { functionUploadFile } from '../../utils/function';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../utils/firebase';
const Context = React.createContext({ name: 'Default' });

const TableAddRow = ({branchId, dataTools, setDataTools}: {branchId:string, dataTools: any[], setDataTools:any}) => {
  const [api, contextHolder] = notification.useNotification();

  const [dataRequest, setDataRequest] = useState({
    branchId: branchId,
    toolName: "",
    code: "",
    quantity: 0,
    image: "",
    price: 0,
    boughtDate: "",
    boughtPlace: ""
  })

  const openNotification = (placement: NotificationPlacement) => {
    api.success({
    message: `Thông báo`,
    description: <Context.Consumer>{({ name }) => `Thêm thiết bị thành công!`}</Context.Consumer>,
    placement,
    });
  };
  const openNotificationFail = (placement: NotificationPlacement) => {
      api.error({
      message: `Thông báo tài khoản`,
      description: <Context.Consumer>{({ name }) => `Thêm thiết bị thất bại`}</Context.Consumer>,
      placement,
      });
  };

  const handleChooseFile = (e:any) => {
    let file = e.target?.files[0];
    if (!file) {
        alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/imageTool/${branchId}/${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (err) => console.log(err),
        () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setDataRequest({
                ...dataRequest,
                image: url || "",
              })
            });
        }
    );
  }

  const handleChangeInfo = (e:any) => {
    setDataRequest({
        ...dataRequest,
        [e.target.name]: (e.target.name === "quantity" || e.target.name === "price") ? parseInt(e.target.value) : e.target.value,
    })
  }

  const handleCreateTool = () => {
    console.log(dataRequest);
    createTool(dataRequest)
        .then((res) => {
            console.log(res);
            let data = {
              ...dataRequest,
              stt: dataTools?.length + 1,
            }
            let listData = [...dataTools]
            listData.unshift(data)
            setDataTools(listData)
            openNotification('topRight')
        })
        .catch((err) => {
            console.log(err);
            openNotificationFail('topRight')
        })
  }
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className='w-full flex justify-center flex-col items-center'>
        <div className='w-[500px]'>
          <div className='mb-[10px]'>
            <label htmlFor="" className='mr-[10px]'>Hình ảnh: </label>
            <input type="file" name="" id="" onChange={handleChooseFile} />
          </div>
          <div className='mb-[20px] flex justify-between'>
            <Input
                placeholder="Tên thiết bị" size='large'
                className='mr-[10px]'
                name='toolName'
                onChange={handleChangeInfo}
            />
            <Input 
                placeholder="Mã thiết bị" size='large'
                name='code'
                onChange={handleChangeInfo}
            />
          </div>
          <div className='mb-[20px] flex justify-between'>
            <Input
                placeholder="Số lượng" size='large'
                className='mr-[10px]'
                type='number'
                name='quantity'
                onChange={handleChangeInfo}
            />
            <Input 
                placeholder="Tổng tiền" size='large'
                name='price'
                type='number'
                onChange={handleChangeInfo}
            />
          </div>
          <div className='mb-[20px] flex justify-between'>
            <Input
                placeholder="Ngày mua, ví dụ: 26/12/2022" size='large'
                className='mr-[10px]'
                name='boughtDate'
                onChange={handleChangeInfo}
            />
            <Input 
                placeholder="Nơi mua" size='large'
                name='boughtPlace'
                onChange={handleChangeInfo}
            />
          </div>
          <div className='mb-[20px] w-full flex justify-center'>
            <Button 
              type='primary'
              onClick={handleCreateTool}
            >Khai báo</Button>
          </div>
        </div>
      </div>
    </Context.Provider>
  );
};

export default TableAddRow;