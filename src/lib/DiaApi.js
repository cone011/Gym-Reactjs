import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function getAllDays() {
  const response = await fetch(`${CALL_API_ROUTE}/Dia`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get the days");
  }

  const transformedData = [];

  for (const key in data.result) {
    const objectDia = {
      IdDia: key,
      ...data.result[key],
    };
    transformedData.push(objectDia);
  }
  return transformedData;
}
