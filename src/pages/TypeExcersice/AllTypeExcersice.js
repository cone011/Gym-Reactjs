import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import { GetAllTypeExcersice } from "../../lib/TypeExcersiceApi";

const AllTypeExcersice = () => {
  const {
    sendRequest,
    status,
    data: loadedTypeExcersice,
    error,
  } = useHttp(GetAllTypeExcersice, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
};

export default AllTypeExcersice;
