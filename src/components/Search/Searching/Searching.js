import React, {
  useEffect,
  useCallback,
  useReducer,
  Fragment,
  useState,
  useRef,
} from "react";
import classes from "./Searching.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import { GetAllTrainner } from "../../../lib/TrainnerApi";
import DietList from "../../Diet/DietList/DietList";
import RoutineList from "../../Routine/RoutineList/RoutineList";
import SearchAlumno from "../SearchAlumno/SearchAlumno";
import { GetRutinaByDate } from "../../../lib/RoutineApi";
import { SearchList } from "../../../util/FindItem";
import { SelectBox } from "devextreme-react/select-box";

const searchReducer = (curSearching, action) => {
  switch (action.type) {
    case "BEGIN":
      return {
        isSearching: false,
        showFilter: action.showFilter,
        error: false,
        message: null,
        isShowing: false,
        typeSearching: action.typeSearching,
        dataShow: null,
      };
    case "SEARCHING":
      return {
        ...curSearching,
        isSearching: true,
      };
    case "ERROR":
      return { ...curSearching, error: true, message: action.message };
    case "END":
      return {
        ...curSearching,
        isSearching: false,
        isShowing: true,
        dataShow: action.dataShow,
      };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const alumnoSearchReducer = (curAlumno, action) => {
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
        ...curAlumno,
        isShowingSearch: false,
        error: true,
        message: action.message,
      };
    case "CLOSED":
      return { ...curAlumno, isShowingSearch: false };
    case "END":
      return {
        ...curAlumno,
        isShowingSearch: false,
        alumnoDataSelected: action.alumnoDataSelected,
      };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const Searching = (props) => {
  const { typeSearching } = props;
  const fechaInicioInputRef = useRef();
  const fechaFinInputRef = useRef();
  const alumnoInputRef = useRef();
  const trainnerInputRef = useRef();
  const [httpSearching, dispatchSearching] = useReducer(searchReducer, {
    isSearching: false,
    showFilter: false,
    error: false,
    message: null,
    isShowing: false,
    typeSearching: null,
    dataShow: null,
  });
  const [httpAlumno, dispatchAlumno] = useReducer(alumnoSearchReducer, {
    isShowingSearch: false,
    error: false,
    message: null,
    alumnoDataSelected: null,
  });
  const [listTrainner, SetListTrainner] = useState([]);

  const onShowSearchAlumno = () => {
    dispatchAlumno({ type: "BEGIN" });
  };

  const modalShowHandler = () => {
    dispatchAlumno({ type: "CLOSED" });
  };

  const onSelectedTrainnerChanged = (valueChanged) => {
    trainnerInputRef.current.value = valueChanged.value;
  };

  const onAlumnoSelected = (alumnoDataSelected) => {
    alumnoInputRef.current.value = alumnoDataSelected.Nombre;
    dispatchAlumno({ type: "END", alumnoDataSelected: alumnoDataSelected });
  };

  const loadedTrainner = useCallback(async () => {
    fechaInicioInputRef.current.value = new Date()
      .toISOString()
      .substring(0, 10);
    fechaFinInputRef.current.value = new Date().toISOString().substring(0, 10);
    let list = await GetAllTrainner();
    SetListTrainner(list);
  }, []);

  const assigmentValues = useCallback(async () => {
    switch (typeSearching) {
      case "DIET":
      case "ROUTINE":
        dispatchSearching({
          type: "BEGIN",
          typeSearching: typeSearching,
          showFilter: true,
        });
        loadedTrainner();
        break;
      case "STUDENT":
        dispatchSearching({ type: "BEGIN", typeSearching: typeSearching });
        break;
      default:
        throw new Error("No se pudo realizar la accion");
    }
  }, [typeSearching, loadedTrainner]);

  useEffect(() => {
    assigmentValues();
  }, [assigmentValues]);

  const onShowResult = async () => {
    dispatchSearching({ type: "SEARCHING" });

    const fechaInicio = new Date(fechaInicioInputRef.current.value)
      .toISOString()
      .substring(0, 10);

    const fechaFin = new Date(fechaFinInputRef.current.value)
      .toISOString()
      .substring(0, 10);

    let result;

    let IdAlumno = null;
    let IdTrainner = null;

    if (httpAlumno.alumnoDataSelected) {
      IdAlumno = httpAlumno.alumnoDataSelected.IdAlumno;
    }

    if (trainnerInputRef.current.value > 0) {
      const trainnerSeleceted = SearchList(
        listTrainner,
        "IdTrainner",
        trainnerInputRef.current.value
      );

      IdTrainner = trainnerSeleceted.IdTrainner;
    }

    switch (httpSearching.typeSearching) {
      case "DIET":
        dispatchSearching({
          type: "END",
          dataShow: <DietList dietList={result} isEditable={false} />,
        });
        break;
      case "ROUTINE":
        result = await GetRutinaByDate(
          fechaInicio,
          fechaFin,
          IdAlumno,
          IdTrainner
        );
        dispatchSearching({
          type: "END",
          dataShow: <RoutineList routineList={result} isEditable={false} />,
        });
        break;
      default:
        throw new Error("No se pudo realizar la accion");
    }
  };

  return (
    <Fragment>
      <section className={classes.searching}>
        <h1>Busqueda</h1>
        <div className={classes.control}>
          <label htmlFor="fechaInicio">Fecha Inicio</label>
          <input
            type="date"
            id="fechaInicio"
            required
            pattern="\d{4}-\d{2}-\d{2}"
            ref={fechaInicioInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="fechaFin">Fecha Fin</label>
          <input
            type="date"
            id="fechaFin"
            pattern="\d{4}-\d{2}-\d{2}"
            required
            ref={fechaFinInputRef}
          />
        </div>
        {httpSearching.showFilter && (
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
                onClick={onShowSearchAlumno}
                className={classes.toggle}
              >
                Buscar Alumno
              </button>
            </div>
          </div>
        )}
        {httpSearching.showFilter && (
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
        )}
        <div className={classes.control}>
          <div className={classes.actions}>
            <button
              type="button"
              onClick={onShowResult}
              className={classes.toggle}
            >
              Buscar
            </button>
          </div>
        </div>
      </section>
      {httpAlumno.isShowingSearch && (
        <SearchAlumno
          showModal={httpAlumno.isShowingSearch}
          modalHandler={modalShowHandler}
          onAlumnoSelectedValue={onAlumnoSelected}
        />
      )}
      {httpSearching.isSearching && <LoadingSpinner />}
      {!httpSearching.isSearching &&
        !httpSearching.error &&
        httpSearching.isShowing &&
        httpSearching.dataShow}
    </Fragment>
  );
};

export default Searching;
