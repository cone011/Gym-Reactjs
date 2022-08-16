import { useRef } from "react";
import classes from "./ExcersiceForm.module.css";

const ExcersiceForm = (props) => {
  const codeInputForm = useRef();
  const descriptionInputForm = useRef();

  const excersiceSubmitHandler = (event) => {
    event.preventDefault();

    const code = codeInputForm.current.value;
    const description = descriptionInputForm.current.value;
  };

  return (
    <section className={classes.typeExcersice}>
      <h1>
        {props.esNuevo
          ? "Nuevo tipo de ejercicio"
          : "Modificar tipo de ejercicio"}
      </h1>
      <form onSubmit={excersiceSubmitHandler}>
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
              guardar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ExcersiceForm;
