import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBranchs } from "../endpoint/user";
// import { updateProfileUser } from "../store/features/userSlice";


export default function useGetBranchs() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataBranchs, setDataBranchs] = useState<any>([]);
  const [error, setError] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getBranchs()
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.success) {
          setDataBranchs(res?.data?.data?.branches);
        //   dispatch(updateProfileUser(res?.data?.data?.branches))
        }
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      })
  }, [dispatch])

  return {
    dataBranchs,
    isLoading,
    error
  };
}
