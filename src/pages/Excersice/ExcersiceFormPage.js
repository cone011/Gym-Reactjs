import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useHttp from "../../hook/use-http";
import { saveExcersice } from "../../lib/ExcersiceApi";
import ExcersiceForm from "../../components/Excersice/ExcersiceForm/ExcersiceForm";
import LoadingForm from "../../components/UI/LoadingForm/LoadingForm";

const ExcersiceFormPage = () => {
  const { sendRequest, status } = useHttp(saveExcersice);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/excersice");
    }
  }, [status, history]);

  const saveExcersiceHandler = (excersiceData) => {
    sendRequest(excersiceData);
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingForm showModal={true} message={"SAVING..."} />
      </div>
    );
  }

  return (
    <ExcersiceForm
      esNuevo={location.state.esNuevo}
      excersiceObject={location.state.excersiceObject}
      listType={location.state.listType}
      onSaveExcersice={saveExcersiceHandler}
    />
  );
};

export default ExcersiceFormPage;
