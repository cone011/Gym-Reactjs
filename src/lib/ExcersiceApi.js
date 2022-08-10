import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function getAllExcersice() {
  const response = await fetch(`${CALL_API_ROUTE}/Ejercicio`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the excersice data");
  }

  const transformedData = [];

  for (const key in data) {
    const objectExcersice = {
      IdEjercicio: key,
      ...data[key],
    };
    transformedData.push(objectExcersice);
  }
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

export async function saveExcersice(
  esNuevo,
  Codigo,
  Descripcion,
  IdTipoEjercicio,
  IdEjercicio
) {
  let method = "POST";
  let callApi = `${CALL_API_ROUTE}/Ejercicio`;

  if (!esNuevo) {
    method = "PUT";
    callApi = `${callApi}/${IdEjercicio}`;
  }

  const response = await fetch(`${callApi}`, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: {
      Codigo: Codigo,
      Descripcion: Descripcion,
      IdEjercicio: IdEjercicio,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo realizar la operacion correctamente");
  }

  const excersiceObject = {
    IdEjercicio: IdEjercicio,
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
