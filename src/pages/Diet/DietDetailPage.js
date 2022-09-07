import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import DietaDetailList from "../../components/Diet/DietDetailList/DietDetailList";
import { GetDietDetailById } from "../../lib/DietaDetalleApi";

const DietDetailPage = (props) => {
  const { IdDietDetail, isEditable } = props;

  const {
    sendRequest,
    status,
    data: loadedDietDetail,
    error,
  } = useHttp(GetDietDetailById, true);

  useEffect(() => {
    sendRequest(IdDietDetail);
  }, [sendRequest, IdDietDetail]);

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

  return (
    <DietaDetailList
      dietaDetalleList={loadedDietDetail}
      isEditable={isEditable}
    />
  );
};

export default DietDetailPage;
