import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import RoutineDetailList from "../../components/Routine/RoutineDetailList/RoutineDetailList";
import { GetObjectByIdRutina } from "../../lib/RoutineDetailApi";

const RoutineDetailPage = (props) => {
  const { IdRoutineDetail, isEditable } = props;
  const {
    sendRequest,
    status,
    data: loadedDetail,
    error,
  } = useHttp(GetObjectByIdRutina, true);

  useEffect(() => {
    sendRequest(IdRoutineDetail);
  }, [sendRequest, IdRoutineDetail]);

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
    <RoutineDetailList
      routineDetalleList={loadedDetail}
      isEditable={isEditable}
    />
  );
};

export default RoutineDetailPage;
