import React, { useState, useEffect } from 'react'
import { getBranchs, getTotalMoney } from '../../endpoint/user'
import { DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
const { RangePicker } = DatePicker;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Biều đồ hiển thị tổng tiền khám',
    },
  },
};





function KeToanTongTien() {

  const [dataQuery, setDataQuery] = useState({
    from: '04-2022',
    to: '06-2024'
  })
  const [branchId, setBranchId] = useState("")
  const [dataBranchs, setDataBranchs] = useState<any>([])
  const [labels, setLabels] = useState<string[]>([])
  const [dataChart, setDataChart] = useState<any>({
    labels,
    datasets: [
      {
        label: 'Tổng tiền khám',
        data: labels.map(() => 2000),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  })

  useEffect(() => {
    if (!branchId) return;
    getTotalMoney(dataQuery?.from, dataQuery?.to, branchId)
      .then((res) => {
        console.log("dataMoney: ");
        if (res?.data?.data?.stats) {
          let dataMoney = [...res?.data?.data?.stats]
          
          let dataLabels:string[] = []
          dataMoney?.map((item:any) => {
              dataLabels.push(item?.month + "/" + item?.year)
          })
          setDataChart({
            labels: dataLabels,
            datasets: [{
              label: 'Tổng tiền khám',
              data:  dataMoney ? dataMoney?.map((item) => item?.money || 0) : [],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }]
          })
        } else {
          setDataChart({
            labels: [],
            datasets: [{
              label: 'Tổng tiền khám',
              data:  [],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }]
          })
        }
        
      })
      .catch((err) => {

      })
  }, [dataQuery?.from, dataQuery?.to, branchId])

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

  const handleChangeDay = (values:any) => {
    if (values[0] && values[1]) {
        setDataQuery({
            from: dayjs(values[0]).format("MM-YYYY"),
            to: dayjs(values[1]).format("MM-YYYY"),
        })
    } else {
        setDataQuery({
            from: '04-2022',
            to: '06-2026'
        })
    }
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setBranchId(value)
  };

  return (
    <div>
      <div className='flex justify-start items-center mb-[20px]'>
        <div className='mr-[20px]'>
          <Select
              defaultValue="Chọn chi nhánh"
              size='large'
              style={{ width: "100%" }}
              onChange={handleChange}
              options={dataBranchs}
          />
        </div>
        <div>
          <RangePicker size='large' picker="month" onChange={handleChangeDay} />
        </div>
      </div>

      <div>
        <Bar options={options} data={dataChart} />
      </div>
    </div>
  )
}

export default KeToanTongTien