import { CALL_API_ROUTE } from "../components/data/ApiRoute";

export async function GetAllTypeExcersice() {
  const response = await fetch(`${CALL_API_ROUTE}/TipoEjercicio`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se encontro datos sobre los tipos de ejercicio");
  }

  const transformedData = [];

  for (const key in data.posts) {
    const typeExcersiceObject = {
      IdTipoEjercicio: key,
      ...data.posts[key],
    };
    transformedData.push(typeExcersiceObject);
  }
  return transformedData;
}

export async function GetTypeExcersiceById(IdTipoEjercicio) {
  const response = await fetch(
    `${CALL_API_ROUTE}/TipoEjercicio/${IdTipoEjercicio}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se encontro ningun tipo de ejercicio con este id");
  }

  const typeExcersiceObject = {
    IdTipoEjercicio: IdTipoEjercicio,
    ...data,
  };
  return typeExcersiceObject;
}

export async function SaveTypeExcersice(
  esNuevo,
  Codigo,
  Descripcion,
  IdTipoEjercicio
) {
  let method = "POST";
  let callApi = `${CALL_API_ROUTE}/TipoEjericicio`;

  if (!esNuevo) {
    method = "PUT";
    callApi = `${callApi}/${IdTipoEjercicio}`;
  }

  const response = await fetch(`${callApi}`, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: {
      Codigo: Codigo,
      Descripcion: Descripcion,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo realizar la operacion correctamente");
  }

  const typeExcersiceObject = {
    IdTipoEjercicio: IdTipoEjercicio,
    ...data,
  };
  return typeExcersiceObject;
}

export async function DeleteTypeExcersice(IdEjercicio) {
  const response = await fetch(
    `${CALL_API_ROUTE}/TipoEjercicio/${IdEjercicio}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo eliminar este tipo de ejercicio");
  }

  const typeExcersiceObject = {
    ...data,
  };

  return typeExcersiceObject;
}
