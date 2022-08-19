import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import { GetAllTypeExcersice } from "../../lib/TypeExcersiceApi";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import TypeExcersiceList from "../../components/TypeExcersice/TypeExcersiceList/TypeExcersiceList";

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

  return <TypeExcersiceList typeExcersiceList={loadedTypeExcersice} />;
};

export default AllTypeExcersice;
