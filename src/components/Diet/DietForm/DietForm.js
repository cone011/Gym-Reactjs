import { useEffect, useCallback, Fragment, useState, useRef } from "react";
import SearchAlumno from "../../Search/SearchAlumno/SearchAlumno";
import classes from "./DietForm.module.css";

const DietaForm = (props) => {
  const { dietData, esNuevo } = props;
  const [isShowingSearch, SetShowSearch] = useState(false);
  const [isShowing, SetIsShowing] = useState(false);
  const [isError, SetIsError] = useState(false);
  const [message, SetMessage] = useState("");
  const fechaInputRef = useRef();
  const alumnoInputRef = useRef();

  const assigmentValue = useCallback(() => {
    if (esNuevo) {
      fechaInputRef.current.value = dietData.fecha;
      alumnoInputRef.current.value = dietData.alumno;
    }
  }, [esNuevo, dietData]);

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  const moduleHandler = () => {
    SetShowSearch(!isShowingSearch);
  };

  const dietFormHandler = (event) => {
    event.preventHanlder();
  };

  const onShowSearchAlumno = () => {
    moduleHandler();
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
            <label htmlFor="alumno">Alumno</label>
            <input
              type="text"
              id="alumno"
              readOnly
              disabled
              ref={alumnoInputRef}
            />

            <div className={classes.actions}>
              <button
                type="button"
                className={classes.toggle}
                onClick={onShowSearchAlumno}
              >
                Buscar
              </button>
            </div>
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
      {isShowingSearch && (
        <SearchAlumno
          showModal={isShowingSearch}
          modalHandler={moduleHandler}
        />
      )}
    </Fragment>
  );
};

export default DietaForm;
