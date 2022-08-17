import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { getAllExcersice } from "../../lib/ExcersiceApi";
import ExcersiceList from "../../components/Excersice/ExcersiceList/ExcersiceList";
const AllExcersice = () => {
  const {
    sendRequest,
    status,
    data: loadedExcersice,
    error,
  } = useHttp(getAllExcersice, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  return <ExcersiceList excersiceList={loadedExcersice} />;
};

export default AllExcersice;
