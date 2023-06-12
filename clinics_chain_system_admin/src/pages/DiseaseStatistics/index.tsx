import React, { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { faker } from '@faker-js/faker';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { getBranchId, getBranchs, getDataDiseases } from '../../endpoint/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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
      text: 'Biều đồ thống kê dịch vụ sử dụng',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


function DiseaseStatistics() {

  const { authUser } = useSelector((state:RootState) => state.user)
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
        label: 'Tổng số lượt',
        data: labels.map(() => 2000),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  })

  useEffect(() => {
    if (authUser?.role !== 4) {
      getBranchId()
        .then((res) => {
          setBranchId(res?.data?.data?.branchId)
        })
        .catch((err) => {

        })
    }
  }, [authUser?.role])

  useEffect(() => {
    if (!branchId) return;
    getDataDiseases(dataQuery?.from, dataQuery?.to, branchId)
      .then((res) => {
        console.log("dataMoney: ");
        if (res?.data?.data?.stats) {
          let dataMoney = [...res?.data?.data?.stats]
          
          let dataLabels:string[] = []
          dataMoney?.map((item:any) => {
              dataLabels.push(item?.name)
          })
          setDataChart({
            labels: dataLabels,
            datasets: [{
              label: 'Tổng số lượt',
              data:  dataMoney ? dataMoney?.map((item) => item?.total || 0) : [],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }]
          })
        } else {
          setDataChart({
            labels: [],
            datasets: [{
              label: 'Tổng số lượt',
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
        {authUser?.role === 4 &&
          <div className='mr-[20px]'>
            <Select
                defaultValue="Chọn chi nhánh"
                size='large'
                style={{ width: "100%" }}
                onChange={handleChange}
                options={dataBranchs}
            />
          </div>}
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

export default DiseaseStatistics