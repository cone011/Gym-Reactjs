import { useRef, useEffect, useCallback, useReducer, Fragment } from "react";
import classes from "./TypeExcersiceForm.module.css";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import { SaveTypeExcersice } from "../../../lib/TypeExcersiceApi";
import LoadingForm from "../../UI/LoadingForm/LoadingForm";
import ShowConfirmMessage from "../../UI/ShowConfirmMessage/ShowConfirmMessage";
import { useHistory, useLocation } from "react-router-dom";

const loadingReducer = (curLoading, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isLoading: true, error: false, message: action.message };
    case "ERROR":
      return { isLoading: false, error: true, message: action.message };
    case "CLOSED":
      return { ...curLoading, error: true, message: action.message };
    case "END":
      return { ...curLoading, isLoading: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const confirmReducer = (curConfirm, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isShowing: true, message: action.message };
    case "END":
      return { ...curConfirm, isShowing: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const TypeExcersiceForm = () => {
  const location = useLocation();
  const history = useHistory();
  const { esNuevo, typeExcersiceObject } = location.state;
  const codeInputForm = useRef();
  const descriptionInputForm = useRef();
  const [httpLoading, dispatchLoading] = useReducer(loadingReducer, {
    isLoading: false,
    error: false,
    message: null,
  });
  const [httpConfirm, dispatchConfirm] = useReducer(confirmReducer, {
    isShowing: false,
    message: null,
  });

  const assigmentsValues = useCallback(() => {
    if (!esNuevo) {
      codeInputForm.current.value = typeExcersiceObject.Codigo;
      descriptionInputForm.current.value = typeExcersiceObject.Nombre;
    }
  }, [esNuevo, typeExcersiceObject]);

  useEffect(() => {
    assigmentsValues();
  }, [assigmentsValues]);

  const typeExcersiceSubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();

      dispatchLoading({ type: "BEGIN", message: "SAVING....." });

      try {
        if (codeInputForm.current.value.trim().length === 0) {
          dispatchLoading({
            type: "ERROR",
            message: "No se encuentra un codigo asginado al registro",
          });
        }

        if (descriptionInputForm.current.value.trim().length === 0) {
          dispatchLoading({
            type: "ERROR",
            message: "No se encuentra una descripcion asginada al registro",
          });
        }

        dispatchLoading({ type: "END" });

        let sendData = {
          Codigo: codeInputForm.current.value,
          Nombre: descriptionInputForm.current.value,
          esNuevo: esNuevo,
        };

        if (!esNuevo) {
          sendData = {
            ...sendData,
            IdTipoEjercicio: typeExcersiceObject.IdTipoEjercicio,
          };
        }

        const datarReponse = await SaveTypeExcersice(sendData);

        if (datarReponse.message === "OK") {
          dispatchLoading({ type: "END" });
          dispatchConfirm({
            type: "BEGIN",
            message: "Se guardo con exito el tipo de ejercicio",
          });
        }
      } catch (err) {
        dispatchLoading({ type: "ERROR", message: err.message });
      }
    },
    [esNuevo, typeExcersiceObject]
  );

  const onModalErrorHandler = () => {
    dispatchLoading({ type: "CLOSED" });
  };

  const onModalConfirmHandler = () => {
    if (httpConfirm.isShowing) {
      dispatchConfirm({ type: "END" });
      history.push("/type-excersice");
    }
  };

  return (
    <Fragment>
      <section className={classes.typeExcersice}>
        <h1>
          {esNuevo ? "Nuevo tipo de ejercicio" : "Modificar tipo de ejercicio"}
        </h1>
        <form onSubmit={typeExcersiceSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="code">Codigo</label>
            <input type="text" id="code" required ref={codeInputForm} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Descripcion</label>
            <input
              type="text"
              id="description"
              required
              ref={descriptionInputForm}
            />
          </div>
          <div className={classes.control}>
            <div className={classes.actions}>
              <button type="submit" className={classes.toggle}>
                Guardar
              </button>
            </div>
          </div>
        </form>
      </section>
      {httpLoading.isLoading && (
        <LoadingForm
          showModal={httpLoading.isLoading}
          message={httpLoading.message}
        />
      )}
      {httpLoading.error && (
        <ErrorMessage
          showModal={httpLoading.error}
          message={httpLoading.message}
          modalHandler={onModalErrorHandler}
        />
      )}
      {httpConfirm.isShowing && (
        <ShowConfirmMessage
          showModal={httpConfirm.isShowing}
          message={httpConfirm.message}
          modalHandler={onModalConfirmHandler}
          onClose={onModalConfirmHandler}
        />
      )}
    </Fragment>
  );
};

export default TypeExcersiceForm;
