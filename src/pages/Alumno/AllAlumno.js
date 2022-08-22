import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { GetAllAlumno } from "../../lib/AlumnoApi";
import AlumnoList from "../../components/Alumno/AlumnoList/AlumnoList";

const AllAlumno = () => {
  const {
    sendRequest,
    status,
    data: loadedAlumno,
    error,
  } = useHttp(GetAllAlumno, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  return <AlumnoList alumnoData={loadedAlumno} />;
};

export default AllAlumno;
