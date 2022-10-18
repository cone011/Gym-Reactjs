import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import { useLocation, useHistory } from "react-router-dom";
import { SaveAlumno } from "../../lib/AlumnoApi";
import AlumnoForm from "../../components/Alumno/AlumnoForm/AlumnoForm";
import LoadingForm from "../../components/UI/LoadingForm/LoadingForm";

const AlumnoFormPage = () => {
  const { sendRequest, status } = useHttp(SaveAlumno);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (status === "completed") {
      history.push("/alumno");
    }
  }, [status, history]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingForm show={true} message={"SAVING....."} />
      </div>
    );
  }

  const saveAlumnoHandler = (alumnoData) => {
    sendRequest(alumnoData);
  };

  return (
    <AlumnoForm
      alumnoObject={location.state.alumnoObject}
      esNuevo={location.state.esNuevo}
      IdUsuario={1} //{location.state.IdUsuario}
      onSaveAlumnoHandler={saveAlumnoHandler}
    />
  );
};

export default AlumnoFormPage;
