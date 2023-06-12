import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getInfoUser } from '../endpoint/auth';
import { updateProfileUser } from "../store/features/userSlice";


export default function useGetInfoUser() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getInfoUser()
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.success) {
          setData(res?.data?.data?.patient);
          dispatch(updateProfileUser(res?.data?.data?.patient))
        }
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      })
  }, [dispatch])

  return {
    data,
    isLoading,
    error
  };
}
