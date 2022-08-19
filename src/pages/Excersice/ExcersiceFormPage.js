import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useHttp from "../../hook/use-http";
import { saveExcersice } from "../../lib/ExcersiceApi";
import ExcersiceForm from "../../components/Excersice/ExcersiceForm/ExcersiceForm";

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
