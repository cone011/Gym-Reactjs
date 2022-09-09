import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function GetAllRutinaDetalle() {
  const response = await fetch(`${CALL_API_ROUTE}/RutinaDetalle`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message, "Could not fetch the routine detail");
  }

  const transformedData = [];

  for (const key in data.result) {
    const routineDetailObject = {
      IdRutinaDetalle: key,
      ...data.result[key],
    };
    transformedData.push(routineDetailObject);
  }

  return transformedData;
}

export async function GetObjectByIdRutinaDetalle(IdRutinaDetalle) {
  const response = await fetch(
    `${CALL_API_ROUTE}/RutinaDetalle/${IdRutinaDetalle}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message, "Could not fetch the routine detail");
  }

  const routineDetailObject = {
    ...data.result,
  };

  return routineDetailObject;
}

export async function GetObjectByIdRutina(IdRutina) {
  const response = await fetch(`${CALL_API_ROUTE}/RutinaBase/${IdRutina}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message, "Could not fetch the routine detail");
  }

  const transformedData = [];

  for (const key in data.result) {
    const routineDetailObject = {
      IdRutinaDetalle: key,
      ...data.result[key],
    };
    transformedData.push(routineDetailObject);
  }

  return transformedData;
}

export async function DeleteRutinaDetalle(IdRutinaDetalle) {
  const response = await fetch(
    `${CALL_API_ROUTE}/RutinaDetalle/${IdRutinaDetalle}`,
    { method: "DELETE" }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message, "Could not delete the routine detail");
  }

  const responseObject = {
    ...data,
  };

  return responseObject;
}
