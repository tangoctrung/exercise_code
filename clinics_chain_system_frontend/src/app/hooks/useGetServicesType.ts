import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServices } from "../endpoint/user";


export default function useGetServicesType() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataServices, setDataServices] = useState<any>([]);
  const [error, setError] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getServices()
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.success) {
            setDataServices(res?.data?.data?.serviceTypes);
        }
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      })
  }, [dispatch])

  return {
    dataServices,
    isLoading,
    error
  };
}
