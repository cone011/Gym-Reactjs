import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import RoutineList from "../../components/Routine/RoutineList/RoutineList";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { GetAllRoutine } from "../../lib/RoutineApi";

const AllRoutine = () => {
  const {
    sendRequest,
    status,
    data: loadedRoutine,
    error,
  } = useHttp(GetAllRoutine, true);

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

  return <RoutineList routineList={loadedRoutine} />;
};

export default AllRoutine;
