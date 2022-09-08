import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function GetAllRoutine() {
  const response = await fetch(`${CALL_API_ROUTE}/Rutina`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the routine");
  }

  const transformedData = [];

  for (const key in data.result) {
    const routineObject = {
      IdRutina: key,
      ...data.result[key],
    };
    transformedData.push(routineObject);
  }
  return transformedData;
}

export async function GetRoutineById(IdRutina) {
  const response = await fetch(`${CALL_API_ROUTE}/Rutina/${IdRutina}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch this id");
  }

  const routineObject = {
    IdRutina: IdRutina,
    ...data.response,
  };

  return routineObject;
}

export async function GetRutinaByToday(IdAlumno) {
  const response = await fetch(`${CALL_API_ROUTE}/Rutina-Diaria/${IdAlumno}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the routine of this id");
  }

  const transformedData = [];

  for (const key in data.result) {
    const routineObject = {
      IdRutina: key,
      ...data.result[key],
    };
    transformedData.push(routineObject);
  }

  return transformedData;
}

export async function GetRutinaBySemanaActual(IdAlumno) {
  const response = await fetch(`${CALL_API_ROUTE}/Rutina-Semana/${IdAlumno}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the routine of this id");
  }

  const transformedData = [];

  for (const key in data.result) {
    const routineObject = {
      IdRutina: key,
      ...data.result[key],
    };
    transformedData.push(routineObject);
  }

  return transformedData;
}

export async function GetRutinaByDate(
  FechaInicio,
  FechaFin,
  IdAlumno,
  IdTrainner
) {
  const response = await fetch(
    `${CALL_API_ROUTE}/search-rutina/${FechaInicio}/${FechaFin}/${IdAlumno}/${IdTrainner}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the data");
  }

  const transformedData = [];

  for (const key in data.result) {
    const routineObject = {
      IdRutina: key,
      ...data.result[key],
    };
    transformedData.push(routineObject);
  }

  return transformedData;
}

export async function SaveRoutine(routineData) {
  let urlApi = `${CALL_API_ROUTE}/Rutina`;
  let method = "POST";

  console.log(routineData);

  if (!routineData.esNuevo) {
    urlApi = `${urlApi}/${routineData.IdRutina}`;
    method = "PUT";
  }

  const response = await fetch(urlApi, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...routineData }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not save the routine data");
  }

  const responseObject = {
    ...data,
  };

  return responseObject;
}

export async function DeleteRoutine(IdRutina) {
  const response = await fetch(`${CALL_API_ROUTE}/Rutina/${IdRutina}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not delete the data");
  }

  const responseData = {
    ...data.result,
  };

  return responseData;
}
