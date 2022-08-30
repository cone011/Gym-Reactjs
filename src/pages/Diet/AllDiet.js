import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import DietList from "../../components/Diet/DietList/DietList";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { GetAllDieta } from "../../lib/DietaApi";

const AllDiet = () => {
  const { sendRequest, status, data: loadedDiet, error } = useHttp(GetAllDieta);

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

  return <DietList dietList={loadedDiet} />;
};

export default AllDiet;
