import {
  useEffect,
  useCallback,
  useState,
  Fragment,
  useState,
  useRef,
} from "react";
import classes from "./DietaForm.module.css";

const DietaForm = (props) => {
  const { dietData, esNuevo } = props;
  const [isShowing, SetIsShowing] = useState(false);
  const [isError, SetIsError] = useState(false);
  const [message, SetMessage] = useState("");
  const fechaInputRef = useRef();

  const dietFormHandler = (event) => {
    event.preventHanlder();
  };

  return (
    <Fragment>
      <section className={classes.diet}>
        <h1>{esNuevo ? "Nueva Dieta" : "Modificar Dieta"}</h1>
        <form onSubmit={dietFormHandler}>
          <div className={classes.control}>
            <label htmlFor="fecha">Fecha</label>
            <input type="date" id="fecha" required ref={fechaInputRef} />
          </div>

          <div className={classes.control}>
            <label htmlFor="alumno">Alumno/Paciente</label>
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
    </Fragment>
  );
};

export default DietaForm;
