import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getListDoctor } from "../endpoint/user";

export default function useGetListDoctor(branchId:string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataDoctors, setDataDoctors] = useState<any>([]);
  const [error, setError] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getListDoctor(branchId)
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.success) {
            setDataDoctors(res?.data?.data?.doctors);
        }
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      })
  }, [branchId, dispatch])

  return {
    dataDoctors,
    isLoading,
    error
  };
}
