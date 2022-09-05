import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function GetAllFormaComida() {
  const response = await fetch(`${CALL_API_ROUTE}/FormaComida`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the data");
  }

  const transformedData = [];
  for (const key in data.result) {
    const formaComidaObject = {
      IdFormaComida: key,
      ...data.result[key],
    };
    transformedData.push(formaComidaObject);
  }
  return transformedData;
}
