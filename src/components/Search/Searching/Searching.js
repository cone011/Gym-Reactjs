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
import { GetRutinaByDate } from "../../../lib/RoutineApi";

const searchReducer = (curSearching, action) => {
  switch (action.type) {
    case "BEGIN":
      return {
        isSearching: false,
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

const Searching = (props) => {
  const { typeSearching } = props;
  const fechaInicioInputRef = useRef();
  const fechaFinInputRef = useRef();
  const alumnoInputRef = useRef();
  const trainnerInputRef = useRef();
  const [httpSearching, dispatchSearching] = useReducer(searchReducer, {
    isSearching: false,
    error: false,
    message: null,
    isShowing: false,
    typeSearching: null,
    dataShow: null,
  });
  const [listTrainner, SetListTrainner] = useState([]);

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
        dispatchSearching({ type: "BEGIN", typeSearching: typeSearching });
        loadedTrainner();
        break;
      case "ROUTINE":
        dispatchSearching({ type: "BEGIN", typeSearching: typeSearching });
        loadedTrainner();
        break;
      case "STUDENT":
        dispatchSearching({ type: "BEGIN", typeSearching: typeSearching });
        break;
      default:
        throw new Error("No se pudo realizar la accion");
    }
  }, [typeSearching, dispatchSearching, loadedTrainner]);

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

    console.log(fechaInicio);

    console.log(fechaFin);

    let result;

    switch (httpSearching.typeSearching) {
      case "DIET":
        dispatchSearching({
          type: "END",
          dataShow: <DietList dietList={result} isEditable={false} />,
        });
        break;
      case "ROUTINE":
        result = await GetRutinaByDate(fechaInicio, fechaFin, null, null);
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
      {httpSearching.isSearching && <LoadingSpinner />}
      {!httpSearching.isSearching &&
        !httpSearching.error &&
        httpSearching.isShowing &&
        httpSearching.dataShow}
    </Fragment>
  );
};

export default Searching;
