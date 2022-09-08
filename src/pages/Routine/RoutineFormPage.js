import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useHttp from "../../hook/use-http";
import RoutineForm from "../../components/Routine/RoutineForm/RoutineForm";
import { SaveRoutine } from "../../lib/RoutineApi";

const RoutineFormPage = () => {
  const { sendRequest, status } = useHttp(SaveRoutine, true);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (status === "completed") {
      history.push("/routine");
    }
  }, [status, history]);

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
