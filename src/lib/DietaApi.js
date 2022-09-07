import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function GetAllDieta() {
  const response = await fetch(`${CALL_API_ROUTE}/Dieta`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the diet");
  }

  const transformedData = [];
  for (const key in data.result) {
    const dietObject = {
      Id: key,
      ...data.result[key],
    };
    transformedData.push(dietObject);
  }

  return transformedData;
}

export async function GetObjectByIdDieta(IdDieta) {
  const response = await fetch(`${CALL_API_ROUTE}/Dieta/${IdDieta}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch this data with this id");
  }

  const dietObject = {
    Id: IdDieta,
    ...data,
  };

  return dietObject;
}

export async function SaveDieta(dietaData) {
  let urlApi = `${CALL_API_ROUTE}/Dieta`;
  let method = "POST";

  if (!dietaData.esNuevo) {
    urlApi = `${urlApi}/${dietaData.IdDieta}`;
    method = "PUT";
  }

  const response = await fetch(urlApi, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...dietaData }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not save the diet data");
  }

  const responseObject = {
    ...data,
  };

  return responseObject;
}

export async function DeleteDieta(IdDieta) {
  const response = await fetch(`${CALL_API_ROUTE}/Dieta/${IdDieta}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not delete the register");
  }

  const responseObject = {
    ...data,
  };

  return responseObject;
}
