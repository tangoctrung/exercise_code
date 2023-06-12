import { Rate, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import { IMAGE_DEFAULT, NO_DATA } from '../../constant'
import { StarFilled } from '@ant-design/icons';
import { getBranchId, getListDoctorFeedbacks } from '../../endpoint/user';

function ViewRate() {

  const [indexStar, setIndexStar] = useState("all");
  const [listDoctor, setListDoctor] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dataQuery, setDataQuery] = useState({
    from: 0,
    to: 5
  })
  useEffect(() => {
    getBranchId()
      .then((res) => {
        console.log("get me: ", res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getListDoctorFeedbacks(dataQuery.from, dataQuery.to)
      .then((res) => {
        console.log(res?.data?.data);
        setListDoctor(res?.data?.data?.doctors)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      })
  }, [dataQuery.from, dataQuery.to])

  const handleSwitchTab = (s:string) => {
    if (s === "all") {
      setDataQuery({
        from: 0,
        to: 5,
      })
    } else {
      setDataQuery({
        from: parseInt(s.split("-")[0]),
        to: parseInt(s.split("-")[1]),
      })
    }
    setIndexStar(s)
  }

  
  return (
    <div>
      <div className='flex mb-[20px]'>
        <div 
          className={`w-[50px] h-[50px] rounded-full font-bold cursor-pointer flex items-center justify-center ${ indexStar==="all" ? "bg-gray-300" : "bg-[#f5f5f5]"}`}
          onClick={() => handleSwitchTab("all")}
        >
          All
        </div>
        <div 
          className={`w-[50px] h-[50px] rounded-full ml-[20px] font-bold cursor-pointer flex items-center justify-center ${ indexStar==="0-1" ? "bg-gray-300" : "bg-[#f5f5f5]"}`}
          onClick={() => handleSwitchTab("0-1")}
        >
          0-1 <StarFilled style={{ marginLeft: "2px", color: "#fadb14" }} />
        </div>
        <div 
          className={`w-[50px] h-[50px] rounded-full ml-[20px] font-bold cursor-pointer flex items-center justify-center ${ indexStar==="1-2" ? "bg-gray-300" : "bg-[#f5f5f5]"}`}
          onClick={() => handleSwitchTab("1-2")}
        >
          1-2 <StarFilled style={{ marginLeft: "2px", color: "#fadb14" }} />
        </div>
        <div 
          className={`w-[50px] h-[50px] rounded-full ml-[20px] font-bold cursor-pointer flex items-center justify-center ${ indexStar==="2-3" ? "bg-gray-300" : "bg-[#f5f5f5]"}`}
          onClick={() => handleSwitchTab("2-3")}
        >
          2-3 <StarFilled style={{ marginLeft: "2px", color: "#fadb14" }} />
        </div>
        <div 
          className={`w-[50px] h-[50px] rounded-full ml-[20px] font-bold cursor-pointer flex items-center justify-center ${ indexStar==="3-4" ? "bg-gray-300" : "bg-[#f5f5f5]"}`}
          onClick={() => handleSwitchTab("3-4")}
        >
          3-4 <StarFilled style={{ marginLeft: "2px", color: "#fadb14" }} />
        </div>
        <div 
          className={`w-[50px] h-[50px] rounded-full ml-[20px] font-bold cursor-pointer flex items-center justify-center ${ indexStar==="4-5" ? "bg-gray-300" : "bg-[#f5f5f5]"}`}
          onClick={() => handleSwitchTab("4-5")}
        >
          4-5 <StarFilled style={{ marginLeft: "2px", color: "#fadb14" }} />
        </div>
      </div>
      <div>
        <p>Tìm thấy <b>{listDoctor?.length || 0} bác sĩ</b></p>
        <div className='viewRateScroll p-[20px] h-[calc(100vh-210px)] overflow-scroll flex flex-wrap'>
          {!isLoading && listDoctor && listDoctor?.map((item:any, index:number) => (
              <div key={index} className='w-[220px] h-fit pt-[6px] cursor-pointer m-[10px] rounded-lg shadow-sm bg-[#f5f5f5]'>
                <div className='w-full h-fit flex justify-center'>
                  <img 
                    src={item?.profile?.avatar || IMAGE_DEFAULT} alt="" 
                    className='w-[140px] rounded-full h-[140px] object-cover'
                  />
                </div>
                <p className='text-base text-center mt-[8px]'>Bác sĩ: <b>{item?.firstName + " " + item?.lastName}</b></p>
                <i className='text-base block w-full text-gray-600 text-center mt-[4px]'>{item?.specialistIn}</i>
                <div className='w-full flex flex-col item-center mt-[16px]'>
                  <p className='text-center'>Tổng số <b>{item?.totalTreatment || 0}</b> lượt khám</p>
                  <b className='flex items-center justify-center text-lg'>{item?.avgStar || 0} /5 <StarFilled style={{ marginLeft: "2px", color: "#fadb14" }} /></b>
                  <div className='flex justify-center'>
                    <Rate allowHalf defaultValue={item?.avgStar || 0} disabled  />
                  </div>
                </div>
              </div>
            ))}
          {!isLoading && !listDoctor && 
            <div className='w-full flex justify-center mt-[30px]'>
              <img 
                src={NO_DATA} alt="" 
                className='w-fit'
              />
            </div>}
          {isLoading && 
            <div className='w-full flex justify-center mt-[70px]'>
              <Spin size='large' />
            </div>}
        </div>
      </div>
    </div>
  )
}

export default ViewRate