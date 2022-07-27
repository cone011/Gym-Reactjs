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
      ...data,
    };
    transformedData.push(objectAlumno);
  }
  return transformedData;
}

export async function getSingleAlumn(IdAlumno) {
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

export async function deleteAlumno(IdAlumno) {
  const response = await fetch(`${CALL_API_ROUTE}/Alumno/${IdAlumno}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not delete the alumno");
  }

  return data;
}
