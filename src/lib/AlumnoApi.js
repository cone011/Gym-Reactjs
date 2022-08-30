import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function GetAllAlumno() {
  const response = await fetch(`${CALL_API_ROUTE}/Alumno`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the list of data");
  }

  const transformedData = [];

  for (const key in data) {
    const objectAlumno = {
      id: key,
      ...data[key],
    };
    transformedData.push(objectAlumno);
  }
  return transformedData;
}

export async function getSingleAlumno(IdAlumno) {
  const response = await fetch(`${CALL_API_ROUTE}/Alumno/${IdAlumno}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the alumno");
  }

  const objectAlumno = {
    id: IdAlumno,
    ...data,
  };

  return objectAlumno;
}

export async function SaveAlumno(alumnoData) {
  let urlApi = `${CALL_API_ROUTE}/Alumno`;

  let method = "POST";

  if (!alumnoData.esNuevo) {
    urlApi = `${urlApi}/${alumnoData.IdAlumno}`;

    method = "PUT";
  }

  const response = await fetch(urlApi, {
    method: method,
    "Content-Type": "application/json",
    body: JSON.stringify({
      IdUsuario: alumnoData.IdUsuario,
      Cedula: alumnoData.Cedula,
      Nombre: alumnoData.Nombre,
      FechaNacimiento: alumnoData.FechaNacimiento,
      Edad: alumnoData.Edad,
      Direccion: alumnoData.Direccion,
      Telefono: alumnoData.Telefono,
      Email: alumnoData.Email,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo realizar la accion");
  }

  const responseAlumno = {
    ...data,
  };

  return responseAlumno;
}

export async function DeleteAlumno(IdAlumno) {
  const response = await fetch(`${CALL_API_ROUTE}/Alumno/${IdAlumno}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not delete the alumno");
  }

  const responseData = {
    ...data,
  };

  return responseData;
}
