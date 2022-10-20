import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useHttp from "../../hook/use-http";
import RoutineForm from "../../components/Routine/RoutineForm/RoutineForm";
import { SaveRoutine } from "../../lib/RoutineApi";
import LoadingForm from "../../components/UI/LoadingForm/LoadingForm";

const RoutineFormPage = () => {
  const { sendRequest, status } = useHttp(SaveRoutine, true);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (status === "completed") {
      history.push("/routine");
    }
  }, [status, history]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingForm showModal={true} message={"SAVING......."} />
      </div>
    );
  }

  const saveRoutineHanlderPage = (routineData) => {
    sendRequest(routineData);
  };

  return (
    <RoutineForm
      esNuevo={location.state.esNuevo}
      routineObject={location.state.routineObject}
      onSaveRoutine={saveRoutineHanlderPage}
    />
  );
};

export default RoutineFormPage;
