import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getInfoDoctor } from '../endpoint/doctor';
import { updateProfileUser } from "../store/features/userSlice";


export default function useGetInfoDoctor() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataProfile, setDataProfile] = useState<any>([]);
  const [error, setError] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getInfoDoctor()
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.success) {
          setDataProfile(res?.data?.data?.doctor);
          dispatch(updateProfileUser(res?.data?.data?.doctor))
        }
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      })
  }, [dispatch])

  return {
    dataProfile,
    isLoading,
    error
  };
}
