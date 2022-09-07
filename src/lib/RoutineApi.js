import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function GetAllRoutine() {
  const response = await fetch(`${CALL_API_ROUTE}/`);
}
