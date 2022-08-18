import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useHttp from "../../hook/use-http";
import { SaveTypeExcersice } from "../../lib/TypeExcersiceApi";
import TypeExcersiceForm from "../../components/TypeExcersice/TypeExcersiceForm/TypeExcersiceForm";

const TypeExcersiceFormPage = () => {
  const { sendRequest, status } = useHttp(SaveTypeExcersice);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (status === "completed") {
      history.push("/");
    }
  }, [status, history]);

  const SaveTypeExcersiceHandler = (typeExcersiceData) => {
    sendRequest(typeExcersiceData);
  };

  return (
    <TypeExcersiceForm
      esNuevo={location.state.esNuevo}
      typeExcersiceObject={location.state.typeExcersiceObject}
      onSaveTypeExcersice={SaveTypeExcersiceHandler}
    />
  );
};

export default TypeExcersiceFormPage;
