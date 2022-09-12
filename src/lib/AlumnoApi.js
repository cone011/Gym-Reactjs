import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function GetAllAlumno() {
  const response = await fetch(`${CALL_API_ROUTE}/Alumno`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the list of data");
  }

  const transformedData = [];

  for (const key in data.result) {
    const objectAlumno = {
      id: key,
      ...data.result[key],
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

export async function GetSearchAlumno(sqlSearch) {
  const response = await fetch(`${CALL_API_ROUTE}/Alumno-search/${sqlSearch}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could find any data with this value");
  }

  const transformedData = [];

  for (const key in data.result) {
    const alumnoObject = {
      IdAlumno: key,
      ...data.result[key],
    };
    transformedData.push(alumnoObject);
  }

  return transformedData;
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...alumnoData }),
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
