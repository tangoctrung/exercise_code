import { Button, Input, Modal, notification } from "antd";
import React, { useState, useMemo } from "react";
import { createBranch, getBranchs } from "../../../endpoint/user";
import type { NotificationPlacement } from "antd/es/notification/interface";
import TextArea from "antd/es/input/TextArea";
const Context = React.createContext({ name: "Default" });

function FormBranch() {
  const [dataRequest, setDataRequest] = useState({
    address: "",
    contactPhone: "",
    establishedDate: "",
    intro: "",
    branchname: "",
  });

  const [listBranch, setListBranch] = useState<any[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Thông báo chi nhánh`,
      description: (
        <Context.Consumer>
          {({ name }) => "Tạo chi nhánh thành công"}
        </Context.Consumer>
      ),
      placement,
    });
  };
  const openNotificationFail = (placement: NotificationPlacement) => {
    api.error({
      message: `Thông báo chi nhánh`,
      description: (
        <Context.Consumer>
          {({ name }) => `Tạo chi nhánh thất bại`}
        </Context.Consumer>
      ),
      placement,
    });
  };

  const handleChangeInfo = (e: any) => {
    setDataRequest({
      ...dataRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateBranch = () => {
    console.log(dataRequest);
    createBranch(dataRequest)
      .then((res) => {
        console.log(res);
        openNotification("topRight");
        setDataRequest({
          address: "",
          contactPhone: "",
          establishedDate: "",
          intro: "",
          branchname: ""
        })
      })
      .catch((err) => {
        console.log(err);
        openNotificationFail("topRight");
      });
  };

  const handleShowListBranch = () => {
    getBranchs()
      .then((res) => {
        setListBranch(res?.data?.data?.branches);
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div>
        <div className="mb-[20px]">
          <Input
            placeholder="Tên chi nhánh"
            size="large"
            name="branchname"
            onChange={handleChangeInfo}
            value={dataRequest?.branchname}
          />
        </div>
        <div className="mb-[20px]">
          <Input
            placeholder="Số liên lạc"
            size="large"
            name="contactPhone"
            onChange={handleChangeInfo}
            value={dataRequest?.contactPhone}
          />
        </div>
        <div className="mb-[20px]">
          <Input
            placeholder="Ngày thành lập"
            size="large"
            name="establishedDate"
            onChange={handleChangeInfo}
            value={dataRequest?.establishedDate}
          />
        </div>
        <div className="mb-[20px]">
          <Input
            placeholder="Địa chỉ"
            size="large"
            name="address"
            onChange={handleChangeInfo}
            value={dataRequest?.address}
          />
        </div>
        <div className="mb-[20px]">
          <TextArea
            placeholder="Giới thiệu"
            size="large"
            name="intro"
            onChange={handleChangeInfo}
            value={dataRequest?.intro}
          />
        </div>
        <div className="flex justify-center">
          <Button
            className="h-[44px] w-[120px]"
            type="primary"
            size="large"
            onClick={handleCreateBranch}
          >
            Tạo chi nhánh
          </Button>
        </div>
        <div className="w-full flex justify-end">
          <p
            className="hover:text-blue-500 underline cursor-pointer"
            onClick={handleShowListBranch}
          >
            Danh sách chi nhánh
          </p>
        </div>
      </div>
      <Modal
        title="Danh sách các chi nhánh"
        width={800}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="w-full flex flex-wrap justify-between">
          {listBranch &&
            listBranch?.map((item: any, index: number) => (
              <div
                key={index}
                className="w-[48%] px-[20px] py-[10px] rounded-md bg-slate-200 mb-[10px]"
              >
                <p className="font-bold text-lg">{item?.branchName}</p>
                <i className="text-base text-gray-400">
                  SĐT: {item?.contactPhone}
                </i>
                <i className="text-base block text-gray-400">
                  Địa chỉ: {item?.address}
                </i>
              </div>
            ))}
        </div>
      </Modal>
    </Context.Provider>
  );
}

export default FormBranch;
