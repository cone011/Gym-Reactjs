import { useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hook/use-http";
import { useLocation, useHistory } from "react-router-dom";
import { SaveAlumno } from "../../lib/AlumnoApi";
import AlumnoForm from "../../components/Alumno/AlumnoForm/AlumnoForm";
import LoadingForm from "../../components/UI/LoadingForm/LoadingForm";

const AlumnoFormPage = () => {
  const authCtx = useContext(AuthContext);
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
      IdUsuario={authCtx.userData.IdUsuario}
      onSaveAlumnoHandler={saveAlumnoHandler}
    />
  );
};

export default AlumnoFormPage;
