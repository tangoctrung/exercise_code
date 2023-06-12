import { getDataAPITest } from './../endpoint/callAPITest/index';
import { useEffect, useState } from "react";


export default function useCallAPITest() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    getDataAPITest()
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      })
  }, [])

  return {
    data,
    isLoading,
    error
  };
}
