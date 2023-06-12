import React, { useEffect, useState } from 'react'
import { getHistoryActionDevice } from '../../../endpoint/user'
import moment from 'moment'

function HistoryActionDevice({branchId} : {branchId:string}) {

    const [listHistory, setListHistory] = useState<any[]>([])
    useEffect(() => {
        getHistoryActionDevice(branchId)
            .then((res) => {
                setListHistory(res?.data?.data?.toolManagements)
            })
            .catch((err) => {
            })
    }, [branchId])

  return (
    <div>
        {listHistory && listHistory?.map((item:any, index:number) => (
            <div key={index} className='mb-[10px] flex justify-between items-center p-[10px] rounded-md bg-slate-100'>
                <div>
                <b>Ngày: {moment(item?.createdAt).format("DD-MM-YYYY")}</b>
                <p>{item?.message}</p>
                </div>
            </div>
        ))}
        
      </div>
  )
}

export default HistoryActionDevice