import { getTreatments } from '../endpoint/doctor';
import { useEffect, useState } from "react";

export default function useGetTreatment(email: string, doctorId: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataTreatment, setDataTreatment] = useState<any>([]);
  const [error, setError] = useState<any>([]);

  
  useEffect(() => {
    setIsLoading(true);
    const timeOut = setTimeout(() => {
    console.log(email);
      getTreatments(email, doctorId)
        .then((res) => {
          let data = [...res.data?.data?.treatmentRecords]
          data.reverse()
          setDataTreatment(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        })
    }, 1000)
    return () => clearTimeout(timeOut)
  }, [email, doctorId])

  return {
    dataTreatment,
    isLoading,
    error
  };
}
