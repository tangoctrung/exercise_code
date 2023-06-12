import { useEffect, useState } from "react";
import { getListFeedback } from "../endpoint/user";


export default function useGetListFeedbacks() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataFeedbacks, setDataFeedBacks] = useState<any>([]);
  const [error, setError] = useState<any>([]);
  useEffect(() => {
    setIsLoading(true);
    getListFeedback()
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.success) {
          setDataFeedBacks(res?.data?.data?.feedbacks);
        }
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      })
  }, [])

  return {
    dataFeedbacks,
    isLoading,
    error
  };
}
