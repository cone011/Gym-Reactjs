import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import { useLocation, useHistory } from "react-router-dom";
import { SaveAlumno } from "../../lib/AlumnoApi";

const AlumnoFormPage = () => {
  const { sendRequest, status } = useHttp(SaveAlumno);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (status === "completed") {
      history.push("/alumno");
    }
  }, [status, history]);

  const saveAlumnoHandler = (alumnoData) => {
    sendRequest(alumnoData);
  };
};

export default AlumnoFormPage;
