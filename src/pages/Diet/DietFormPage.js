import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DietaForm from "../../components/Diet/DietForm/DietForm";
import useHttp from "../../hook/use-http";
import { SaveDieta } from "../../lib/DietaApi";

const DietFormPage = () => {
  const { sendRequest, status } = useHttp(SaveDieta);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (status === "completed") {
      history.push("/diet");
    }
  }, [status, history]);

  const saveDietHandler = (dietData) => {
    sendRequest(dietData);
  };

  return (
    <DietaForm
      esNuevo={location.state.esNuevo}
      dietData={location.state.dietData}
      OnsaveDiet={saveDietHandler}
    />
  );
};

export default DietFormPage;
