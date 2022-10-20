import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DietaForm from "../../components/Diet/DietForm/DietForm";
import useHttp from "../../hook/use-http";
import { SaveDieta } from "../../lib/DietaApi";
import LoadingForm from "../../components/UI/LoadingForm/LoadingForm";

const DietFormPage = () => {
  const { sendRequest, status } = useHttp(SaveDieta);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (status === "completed") {
      history.push("/diet");
    }
  }, [status, history]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingForm showModal={true} message={"SAVING......."} />
      </div>
    );
  }

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
