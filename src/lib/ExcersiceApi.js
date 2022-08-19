import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function getAllExcersice() {
  const response = await fetch(`${CALL_API_ROUTE}/Ejercicio`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the excersice data");
  }

  const transformedData = [];

  for (const key in data.result) {
    const objectExcersice = {
      IdEjercicio: key,
      ...data.result[key],
    };
    transformedData.push(objectExcersice);
  }

  return transformedData;
}

export async function getSingleExcersice(IdEjercicio) {
  const response = await fetch(`${CALL_API_ROUTE}/Ejercicio/${IdEjercicio}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the excersice");
  }

  const objectExcersice = {
    IdEjercicio: IdEjercicio,
    ...data,
  };

  return objectExcersice;
}

export async function saveExcersice(excersiceData) {
  console.log(excersiceData);
  let method = "POST";
  let callApi = `${CALL_API_ROUTE}/Ejercicio`;

  if (!excersiceData.esNuevo) {
    method = "PUT";
    callApi = `${callApi}/${excersiceData.IdEjercicio}`;
  }

  const response = await fetch(`${callApi}`, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Codigo: excersiceData.Codigo,
      Nombre: excersiceData.Nombre,
      IdTipoEjercicio: excersiceData.IdTipoEjercicio,
      TipoEjercicio: excersiceData.TipoEjercicio,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo realizar la operacion correctamente");
  }

  const excersiceObject = {
    ...data,
  };
  return excersiceObject;
}

export async function deleteExcersice(IdEjercicio) {
  const response = await fetch(`${CALL_API_ROUTE}/Ejercicio/${IdEjercicio}`, {
    method: "DELETE",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not delete the excersice");
  }

  return data;
}
