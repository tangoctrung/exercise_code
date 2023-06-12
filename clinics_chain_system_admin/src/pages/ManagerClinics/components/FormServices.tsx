import { Button, Input, Modal, notification } from "antd";
import React, { useState, useMemo } from "react";
import { createServices, getServices } from "../../../endpoint/user";
import type { NotificationPlacement } from "antd/es/notification/interface";
const Context = React.createContext({ name: "Default" });

function FormServices() {
  const [dataRequest, setDataRequest] = useState({
    serviceName: "",
    fee: 0,
  });
  const [listService, setListService] = useState<any[]>([]);
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
      message: `Thông báo dịch vụ`,
      description: (
        <Context.Consumer>
          {({ name }) => "Tạo dịch vụ thành công"}
        </Context.Consumer>
      ),
      placement,
    });
  };
  const openNotificationFail = (placement: NotificationPlacement) => {
    api.error({
      message: `Thông báo dịch vụ`,
      description: (
        <Context.Consumer>
          {({ name }) => `Tạo dịch vụ thất bại`}
        </Context.Consumer>
      ),
      placement,
    });
  };
  const handleChangeInfo = (e: any) => {
    if (e.target.name === "fee") {
      setDataRequest({
        ...dataRequest,
        [e.target.name]: parseInt(e.target.value),
      });
      return;
    }
    setDataRequest({
      ...dataRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateBranch = () => {
    console.log(dataRequest);
    createServices(dataRequest)
      .then((res) => {
        console.log(res);
        openNotification("topRight");
        setDataRequest({
          serviceName: "",
          fee: 0,
        });
      })
      .catch((err) => {
        console.log(err);
        openNotificationFail("topRight");
      });
  };

  const handleShowListService = () => {
    getServices()
      .then((res) => {
        setListService(res?.data?.data?.serviceTypes);
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE").format(price);
  };
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div>
        <div className="mb-[20px]">
          <Input
            placeholder="Tên dịch vụ"
            size="large"
            name="serviceName"
            value={dataRequest?.serviceName}
            onChange={handleChangeInfo}
          />
        </div>
        <div className="mb-[20px]">
          <Input
            placeholder="Giá tiền"
            size="large"
            name="fee"
            type="number"
            value={dataRequest?.fee}
            onChange={handleChangeInfo}
          />
        </div>
        <div className="flex relative justify-center">
          <Button
            className="h-[44px] w-[120px]"
            type="primary"
            size="large"
            onClick={handleCreateBranch}
          >
            Thêm dịch vụ
          </Button>
        </div>
        <div className="w-full flex justify-end">
          <p
            className="hover:text-blue-500 underline cursor-pointer"
            onClick={handleShowListService}
          >
            Danh sách dịch vụ
          </p>
        </div>
      </div>
      <Modal
        title="Danh sách các dịch vụ"
        width={800}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="w-full flex flex-wrap justify-between">
          {listService &&
            listService?.map((item: any, index: number) => (
              <div
                key={index}
                className="w-[48%] px-[20px] py-[10px] rounded-md bg-slate-200 mb-[10px]"
              >
                <p className="font-bold text-lg">{item?.serviceName}</p>
                <i className="text-base text-gray-400">
                  {formatPrice(item?.fee)}
                </i>
              </div>
            ))}
        </div>
      </Modal>
    </Context.Provider>
  );
}

export default FormServices;
