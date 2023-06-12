import { useEffect, useState } from "react";
import { getNotiDoctor } from "../endpoint/doctor";
import { filterDataNoti } from "../../services/filterDataNoti";


export default function useGetNotiDoctor() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataNoti, setDataNoti] = useState<any>([]);
  const [error, setError] = useState<any>([]);
  useEffect(() => {
    setIsLoading(true);
    getNotiDoctor()
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.success) {
          let data: any[] = res?.data?.data?.notifications;
          let data1 = filterDataNoti(data);
          console.log(data1);
          setDataNoti(data1);
        }
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      })
  }, [])

  return {
    dataNoti,
    isLoading,
    error
  };
}
