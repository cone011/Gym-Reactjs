import {
  useReducer,
  useCallback,
  useEffect,
  useState,
  Fragment,
  useRef,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SaveRoutine } from "../../../lib/RoutineApi";
import classes from "./RoutineForm.module.css";
import SearchAlumno from "../../Search/SearchAlumno/SearchAlumno";
import { GetAllTrainner } from "../../../lib/TrainnerApi";
import { GetObjectByIdRutina } from "../../../lib/RoutineDetailApi";
import { SearchList } from "../../../util/FindItem";
import { SelectBox } from "devextreme-react/select-box";
import RoutineDetailList from "../RoutineDetailList/RoutineDetailList";
import LoadingForm from "../../UI/LoadingForm/LoadingForm";
import ShowConfirmMessage from "../../UI/ShowConfirmMessage/ShowConfirmMessage";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";

const loadingReducer = (curLoading, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isLoading: true, error: false, message: action.message };
    case "ERROR":
      return { isLoading: false, error: true, message: action.message };
    case "CLOSED":
      return { ...curLoading, error: true };
    case "END":
      return { ...curLoading, isLoading: false };
    default:
      throw new Error("No se puede realizar la accion que no existe");
  }
};

const confirmReducer = (curConfirm, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isShowing: true, message: action.message };
    case "END":
      return { ...curConfirm, isShowing: false };
    default:
      throw new Error("No se puede realizar la accion que no existe");
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

const RoutineForm = () => {
  const history = useHistory();
  const location = useLocation();
  const { routineObject, esNuevo } = location.state;
  const [listTrainner, SetTrainnerList] = useState([]);
  const [httpSearch, dispatchSearch] = useReducer(searchReducer, {
    isLoading: false,
    isShowing: false,
    isError: false,
    message: null,
  });
  const fechaInputRef = useRef();
  const alumnoInputRef = useRef();
  const trainnerInputRef = useRef();
  const [httpLoading, dispatchLoading] = useReducer(loadingReducer, {
    sLoading: false,
    error: false,
    message: null,
  });
  const [httpConfirm, dispatchConfirm] = useReducer(confirmReducer, {
    isShowing: false,
    message: null,
  });

  const assigmentValue = useCallback(async () => {
    if (!esNuevo) {
      fechaInputRef.current.value = new Date(routineObject.Fecha)
        .toISOString()
        .substring(0, 10);
      alumnoInputRef.current.value = routineObject.Alumno;
      trainnerInputRef.current.value = routineObject.IdTrainner;
      routineObject.routineDetalleList = await GetObjectByIdRutina(
        routineObject.IdRutina
      );
      httpSearch.alumnoDataSelected = {
        IdAlumno: routineObject.IdAlumno,
        Nombre: routineObject.Alumno,
      };
    } else {
      fechaInputRef.current.value = new Date().toISOString().substring(0, 10);
    }
    let response = await GetAllTrainner();
    SetTrainnerList(response);
  }, [esNuevo, routineObject, httpSearch]);

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  const modalShowHandler = () => {
    dispatchSearch({ type: "CLOSED" });
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

  const onSubmitFormHandler = useCallback(
    async (event) => {
      event.preventDefault();

      dispatchLoading({ type: "BEGIN", message: "SAVING...." });

      try {
        const trainnerSeleceted = SearchList(
          listTrainner,
          "IdTrainner",
          trainnerInputRef.current.value
        );

        let sendRoutineData = {
          IdAlumno: httpSearch.alumnoDataSelected.IdAlumno,
          Alumno: httpSearch.alumnoDataSelected.Nombre,
          Fecha: new Date(fechaInputRef.current.value)
            .toISOString()
            .substring(0, 10),
          IdTrainner: trainnerSeleceted.IdTrainner,
          Trainner: trainnerSeleceted.Nombre,
          RutinaDetalle: routineObject.routineDetalleList,
          esNuevo: esNuevo,
        };

        if (!esNuevo) {
          sendRoutineData = {
            ...sendRoutineData,
            IdRutina: routineObject.IdRutina,
          };
        }

        const dataReponse = await SaveRoutine(sendRoutineData);

        if (dataReponse.message === "OK") {
          dispatchLoading({ type: "END" });
          dispatchConfirm({
            type: "BEGIN",
            message: "Se persistio la rutina correctamente",
          });
        } else {
          dispatchConfirm({
            type: "ERROR",
            message: "No se pudo  persistir la rutina",
          });
        }
      } catch (err) {
        dispatchLoading({ type: "ERROR", message: err.message });
      }
    },
    [httpSearch, listTrainner, esNuevo, routineObject]
  );

  const onErrorHandler = () => {
    if (httpLoading.error) {
      dispatchLoading({ type: "CLOSED" });
    }
  };

  const onConfirmHandler = () => {
    if (httpConfirm.isShowing) {
      dispatchConfirm({ type: "END" });
      history.push("/routine");
    }
  };

  return (
    <Fragment>
      <section className={classes.Routine}>
        <h1>{esNuevo ? "Nueva Rutina" : "Modificar Rutina"}</h1>
        <form onSubmit={onSubmitFormHandler}>
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
              defaultValue={esNuevo ? null : routineObject.IdTrainner}
              onValueChanged={onSelectedTrainnerChanged}
            />
          </div>
          <RoutineDetailList
            routineDetalleList={routineObject.routineDetalleList}
            isEditable={true}
          />
          <div className={classes.control}>
            <div className={classes.actions}>
              <button type="submit" className={classes.toggle}>
                Guardar
              </button>
            </div>
          </div>
        </form>
      </section>
      {httpSearch.isShowingSearch && (
        <SearchAlumno
          showModal={httpSearch.isShowingSearch}
          modalHandler={modalShowHandler}
          onAlumnoSelectedValue={onAlumnoSelected}
        />
      )}
      {httpLoading.isLoading && (
        <LoadingForm
          showModal={httpLoading.isLoading}
          message={httpLoading.message}
        />
      )}
      {httpConfirm.isShowing && (
        <ShowConfirmMessage
          showModal={httpConfirm.isShowing}
          message={httpConfirm.message}
          modalHandler={onConfirmHandler}
          onclose={onConfirmHandler}
        />
      )}
      {httpLoading.error && (
        <ErrorMessage
          showModal={httpLoading.error}
          message={httpLoading.message}
          modalHandler={onErrorHandler}
        />
      )}
    </Fragment>
  );
};

export default RoutineForm;
