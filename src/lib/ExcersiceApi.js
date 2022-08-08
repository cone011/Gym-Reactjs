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
