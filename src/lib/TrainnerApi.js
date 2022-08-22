import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function GetAllTrainner() {
  const response = await fetch(`${CALL_API_ROUTE}/trainner`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo obtener los datos de los entrenadores");
  }

  const transformedTrainnerData = [];

  for (const key in data.result) {
    const trainnerObject = {
      IdTrainner: key,
      ...data.result[key],
    };
    transformedTrainnerData.push(trainnerObject);
  }

  return transformedTrainnerData;
}

export async function GetTrainnerById(Id) {
  const response = await fetch(`${CALL_API_ROUTE}/trainner/${Id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo obtener el dato de este trainner");
  }

  const trainnerObject = {
    IdTrainner: Id,
    ...data,
  };

  return trainnerObject;
}

export async function SaveTrainner(trainnerData) {
  let urlApi = `${CALL_API_ROUTE}/trainner`;

  let method = "POST";

  if (!trainnerData.esNuevo) {
    urlApi = `${urlApi}/${trainnerData.IdTrainner}`;

    method = "PUT";
  }

  const response = await fetch(urlApi, {
    method: method,
    "Content-Type": "application/json",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo insertar/actualizar el dato");
  }

  const responseTrainner = {
    ...data,
  };

  return responseTrainner;
}

export async function DeleteTrainner(Id) {
  const response = await fetch(`${CALL_API_ROUTE}/trainner/${Id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo eliminar este registro");
  }

  const responseTrainner = {
    IdTrainner: Id,
    ...data,
  };

  return responseTrainner;
}
