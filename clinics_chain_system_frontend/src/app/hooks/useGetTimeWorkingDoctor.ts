import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { getTimeWorkingDoctor } from "../endpoint/doctor";
// import { updateProfileUser } from "../store/features/userSlice";


export default function useGetTimeWorkingDoctor(dataRequest: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataTimeWorking, setDataTimeWorking] = useState<any>([]);
  const [error, setError] = useState<any>([]);
  // const dispatch = useDispatch();
  console.log(dataRequest);
  

  useEffect(() => {
    setIsLoading(true);
    getTimeWorkingDoctor(dataRequest)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        
        if (res?.data?.success) {
          let dataArr = res?.data?.data?.workingTimes || []
          dataArr.reverse()
          console.log(dataArr);
          
            setDataTimeWorking(dataArr);
        //   dispatch(updateProfileUser(res?.data?.data?.branches))
        }
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      })
  }, [dataRequest?.from])

  return {
    dataTimeWorking, 
    setDataTimeWorking,
    isLoading,
    error
  };
}
