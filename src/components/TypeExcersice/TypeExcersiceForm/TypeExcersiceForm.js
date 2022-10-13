import { useRef, useEffect, useCallback, useReducer, Fragment } from "react";
import classes from "./TypeExcersiceForm.module.css";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";

const errorReducer = (curError, action) => {
  switch (action.type) {
    case "BEGIN":
      return { error: false, message: null };
    case "ERROR":
      return { error: true, message: action.message };
    case "CLOSED":
      return { ...curError, error: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const TypeExcersiceForm = (props) => {
  const { esNuevo, typeExcersiceObject } = props;
  const codeInputForm = useRef();
  const descriptionInputForm = useRef();
  const [httpError, dispatchError] = useReducer(errorReducer, {
    error: false,
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

  const typeExcersiceSubmitHandler = (event) => {
    event.preventDefault();

    dispatchError({ type: "BEGIN" });

    if (codeInputForm.current.value.trim().length === 0) {
      dispatchError({
        type: "ERROR",
        message: "No se encuentra un codigo asginado al registro",
      });
    }

    if (descriptionInputForm.current.value.trim().length === 0) {
      dispatchError({
        type: "ERROR",
        message: "No se encuentra una descripcion asginada al registro",
      });
    }

    dispatchError({ type: "END" });

    let sendData = {
      Codigo: codeInputForm.current.value,
      Descripcion: descriptionInputForm.current.value,
      esNuevo: esNuevo,
    };

    if (!esNuevo) {
      sendData = {
        ...sendData,
        IdTipoEjercicio: typeExcersiceObject.IdTipoEjercicio,
      };
    }

    props.onSaveTypeExcersice({ ...sendData });
  };

  const onModalErrorHandler = () => {
    dispatchError({ type: "CLOSED" });
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
      {httpError.error && (
        <ErrorMessage
          showModal={httpError.error}
          modalHandler={onModalErrorHandler}
          message={httpError.message}
        />
      )}
    </Fragment>
  );
};

export default TypeExcersiceForm;
