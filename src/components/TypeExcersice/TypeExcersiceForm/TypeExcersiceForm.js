import { useRef, useEffect } from "react";
import classes from "./TypeExcersiceForm.module.css";

const TypeExcersiceForm = (props) => {
  const codeInputForm = useRef();
  const descriptionInputForm = useRef();

  const assigmentsValues = () => {
    if (!props.esNuevo) {
      codeInputForm.current.value = props.typeExcersiceObject.Codigo;
      descriptionInputForm.current.value = props.typeExcersiceObject.Nombre;
    }
  };

  useEffect(() => {
    assigmentsValues();
  }, [assigmentsValues]);

  const typeExcersiceSubmitHandler = (event) => {
    event.preventDefault();
    let IdTipoEjercicio = null;
    if (!props.esNuevo) {
      IdTipoEjercicio = props.typeExcersiceObject.IdTipoEjercicio;
    }
    const code = codeInputForm.current.value;
    const description = descriptionInputForm.current.value;
    props.onSaveTypeExcersice({
      Codigo: code,
      Descripcion: description,
      IdTipoEjercicio: IdTipoEjercicio,
      esNuevo: props.esNuevo,
    });
  };

  return (
    <section className={classes.typeExcersice}>
      <h1>
        {props.esNuevo
          ? "Nuevo tipo de ejercicio"
          : "Modificar tipo de ejercicio"}
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
