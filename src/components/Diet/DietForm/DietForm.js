import {
  useEffect,
  useCallback,
  Fragment,
  useRef,
  useReducer,
  useState,
} from "react";
import SearchAlumno from "../../Search/SearchAlumno/SearchAlumno";
import classes from "./DietForm.module.css";
import { GetAllTrainner } from "../../../lib/TrainnerApi";
import { SelectBox } from "devextreme-react/select-box";
import DietaDetailList from "../DietDetailList/DietDetailList";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import { SearchList } from "../../../util/FindItem";

const dietaReducer = (curDieta, action) => {
  switch (action.type) {
    case "BEGIN":
      return {
        isLoading: true,
        isShowing: false,
        isError: false,
        message: null,
      };
    case "ERROR":
      return {
        isLoading: false,
        isShowing: true,
        isError: true,
        message: action.message,
      };
    case "END":
      return { ...curDieta, isLoading: false };
    case "CLOSED":
      return { ...curDieta, isShowing: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const searchReducer = (curSearch, action) => {
  switch (action.type) {
    case "BEGIN":
      return {
        isShowingSearch: true,
        error: false,
        message: null,
        alumnoDataSelected: null,
      };
    case "ERROR":
      return {
        ...curSearch,
        error: true,
        message: "No se pudo obtener los datos del alumno",
      };
    case "CLOSED":
      return { ...curSearch, isShowingSearch: false };
    case "END":
      return {
        ...curSearch,
        isShowingSearch: false,
        alumnoDataSelected: action.alumnoDataSelected,
      };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const DietaForm = (props) => {
  const { dietData, esNuevo } = props;
  const [httpSearch, dispatchSearch] = useReducer(searchReducer, {
    isShowingSearch: false,
    error: false,
    message: null,
    alumnoDataSelected: null,
  });
  const [httpDieta, dispatchDieta] = useReducer(dietaReducer, {
    isLoading: false,
    isShowing: false,
    isError: false,
    message: null,
  });
  const [listTrainner, SetTrainnerList] = useState([]);
  const fechaInputRef = useRef();
  const alumnoInputRef = useRef();
  const trainnerInputRef = useRef();

  const assigmentValue = useCallback(async () => {
    if (!esNuevo) {
      fechaInputRef.current.value = dietData.fecha;
      alumnoInputRef.current.value = dietData.alumno;
    }
    let response = await GetAllTrainner();
    SetTrainnerList(response);
  }, [esNuevo, dietData]);

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  const modalShowHandler = () => {
    dispatchSearch({ type: "CLOSED" });
  };

  const dietFormHandler = (event) => {
    event.preventDefault();

    dispatchDieta({ type: "BEGIN" });

    if (alumnoInputRef.current.value === 0) {
      dispatchDieta({
        type: "ERROR",
        message: "No hay un alumno asignado a este registro",
      });
      return;
    }

    if (trainnerInputRef.current.value === 0) {
      dispatchDieta({
        type: "ERROR",
        message: "No se asigno un entrenador",
      });
      return;
    }

    if (dietData.length === 0 || dietData === null) {
      dispatchDieta({
        type: "ERROR",
        message: "No hay detalles en este registro",
      });
      return;
    }

    dispatchDieta({ type: "END" });

    const trainnerSeleceted = SearchList(
      listTrainner,
      "IdTrainner",
      trainnerInputRef.current.value
    );

    let sendDietData = {
      IdAlumno: httpSearch.alumnoDataSelected.IdAlumno,
      Alumno: httpSearch.alumnoDataSelected.Nombre,
      FechaCarga: fechaInputRef.current.value,
      IdTrainner: trainnerSeleceted.IdTrainner,
      Trainner: trainnerSeleceted.Nombre,
      DietaDetalleList: dietData.dietaDetalleList,
      esNuevo: esNuevo,
    };

    props.OnsaveDiet({ ...sendDietData });
  };

  const onShowSearchAlumno = () => {
    dispatchSearch({ type: "BEGIN" });
  };

  const onAlumnoSelected = (alumnoDataSelected) => {
    alumnoInputRef.current.value = alumnoDataSelected.Nombre;
    dispatchSearch({ type: "END", alumnoDataSelected: alumnoDataSelected });
  };

  const onSelectedTrainnerChanged = (valueChanged) => {
    trainnerInputRef.current.value = valueChanged.value;
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

            <div className={classes.actionsSearch}>
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
            <label htmlFor="trainner">Trainner</label>
            <SelectBox
              dataSource={listTrainner}
              placeholder="Seleccione un trainner"
              valueExpr="IdTrainner"
              displayExpr="Nombre"
              searchEnabled={true}
              ref={trainnerInputRef}
              onValueChanged={onSelectedTrainnerChanged}
            />
          </div>
          <DietaDetailList dietaDetalleList={dietData.dietaDetalleList} />
          <div className={classes.control}>
            <div className={classes.actions}>
              <button type="submit" className={classes.toggle}>
                Guardar
              </button>
            </div>
          </div>
        </form>
      </section>
      {httpDieta.isShowing && <LoadingSpinner />}
      {httpSearch.isShowingSearch && (
        <SearchAlumno
          showModal={httpSearch.isShowingSearch}
          modalHandler={modalShowHandler}
          onAlumnoSelectedValue={onAlumnoSelected}
        />
      )}
    </Fragment>
  );
};

export default DietaForm;
