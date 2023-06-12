import { Tabs, TabsProps } from "antd";
import TabelVisit from "./TabelVisit";
import ChartVisit from "./ChartVisit";

function NumberOfVisits() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Thống kê với bảng`,
      children: <TabelVisit />,
    },
    {
      key: "2",
      label: `Thống kê bằng biểu đồ`,
      children: <ChartVisit />,
    },
  ];
  return (
    <div className="w-full h-full ">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
    </div>
  );
}

export default NumberOfVisits;
