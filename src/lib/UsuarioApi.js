import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function GetAllUsuario() {
  const response = await fetch(`${CALL_API_ROUTE}/Usuario`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch the duser data");
  }

  const transformedData = [];

  for (const key in data.result) {
    const userObject = {
      IdUsuario: key,
      ...data.result[key],
    };
    transformedData.push(userObject);
  }
  return transformedData;
}

export async function GetObjectByIdUsuario(IdUsuario) {
  const response = await fetch(`${CALL_API_ROUTE}/Usuario/${IdUsuario}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch  the user");
  }

  const userObject = {
    IdUsuario: IdUsuario,
    ...data,
  };

  return userObject;
}

export async function GetValidUsuario(Usuario, Password) {
  const response = await fetch(`${CALL_API_ROUTE}/valid-usuario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Usuario: Usuario, Contraseña: Password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch this user login");
  }

  const userReponse = {
    ...data.result,
  };

  return userReponse;
}

export async function saveUsuario(userData) {
  let urlApi = `${CALL_API_ROUTE}/Usuario`;
  let method = "POST";

  if (!userData.esNuevo) {
    urlApi = `${urlApi}/${userData.IdUsuario}`;
    method = "PUT";
  }

  const response = await fetch(urlApi, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...userData }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not save the user");
  }

  const responseObject = {
    ...data,
  };

  return responseObject;
}

export async function DeleteUsuario(IdUsuario) {
  const response = await fetch(`${CALL_API_ROUTE}/Usuario/${IdUsuario}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not delete the user");
  }

  const responseObject = {
    IdUsuario: IdUsuario,
    ...data,
  };

  return responseObject;
}
