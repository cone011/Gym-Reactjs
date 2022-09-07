import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function GetAllDietDetail() {
  const response = await fetch(`${CALL_API_ROUTE}/DietaDetalle`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the detail");
  }

  const transformedData = [];

  for (const key in data.result) {
    const dietDetailObject = {
      IdDietaDetalle: key,
      ...data.result[key],
    };
    transformedData.push(dietDetailObject);
  }
  return transformedData;
}

export async function GetDietDetailById(IdDieta) {
  const response = await fetch(`${CALL_API_ROUTE}/Dieta-Detalle/${IdDieta}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the detail of this id");
  }

  const transformedData = [];

  for (const key in data.result) {
    const dietDetailObject = {
      IdDietaDetalle: key,
      ...data.result[key],
    };
    transformedData.push(dietDetailObject);
  }
  return transformedData;
}

export async function GetDietDetail(IdDietaDetalle) {
  const response = await fetch(
    `${CALL_API_ROUTE}/DietaDetalle/${IdDietaDetalle}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the data of this id");
  }

  const dietDetailObject = {
    IdDietaDetalle: IdDietaDetalle,
    ...data.result,
  };

  return dietDetailObject;
}
