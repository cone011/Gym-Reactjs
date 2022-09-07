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

export async function DeleteRutine(IdRutina) {
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
