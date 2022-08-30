import { useRef, useEffect, useCallback } from "react";
import classes from "./TypeExcersiceForm.module.css";

const TypeExcersiceForm = (props) => {
  const { esNuevo, typeExcersiceObject } = props;
  const codeInputForm = useRef();
  const descriptionInputForm = useRef();

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
    let IdTipoEjercicio = null;
    if (!esNuevo) {
      IdTipoEjercicio = typeExcersiceObject.IdTipoEjercicio;
    }
    const code = codeInputForm.current.value;
    const description = descriptionInputForm.current.value;
    props.onSaveTypeExcersice({
      Codigo: code,
      Descripcion: description,
      IdTipoEjercicio: IdTipoEjercicio,
      esNuevo: esNuevo,
    });
  };

  return (
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
  );
};

export default TypeExcersiceForm;
