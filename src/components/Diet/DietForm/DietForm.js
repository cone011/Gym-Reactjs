import {
  useEffect,
  useCallback,
  Fragment,
  useRef,
  useReducer,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SaveDieta } from "../../../lib/DietaApi";
import SearchAlumno from "../../Search/SearchAlumno/SearchAlumno";
import classes from "./DietForm.module.css";
import { GetAllTrainner } from "../../../lib/TrainnerApi";
import { GetDietDetailById } from "../../../lib/DietaDetalleApi";
import { SelectBox } from "devextreme-react/select-box";
import DietaDetailList from "../DietDetailList/DietDetailList";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import { SearchList } from "../../../util/FindItem";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import LoadingForm from "../../UI/LoadingForm/LoadingForm";
import ShowConfirmMessage from "../../UI/ShowConfirmMessage/ShowConfirmMessage";

const loadingReducer = (curLoading, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isLoading: true, error: false, message: action.message };
    case "ERROR":
      return { isLoading: false, error: true, message: action.message };
    case "END":
      return { ...curLoading, isLoading: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const confirmReducer = (curConfirm, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isShowing: true, message: action.message };
    case "END":
      return { ...curConfirm, isShowing: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

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

const DietaForm = () => {
  const history = useHistory();
  const location = useLocation();
  const { dietData, esNuevo } = location.state;
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
  const [httpLoading, dispatchLoading] = useReducer(loadingReducer, {
    isLoading: false,
    error: false,
    message: null,
  });
  const [httpConfirm, dispatchConfirm] = useReducer(confirmReducer, {
    isShowing: false,
    message: null,
  });
  const [listTrainner, SetTrainnerList] = useState([]);
  const fechaInputRef = useRef();
  const alumnoInputRef = useRef();
  const trainnerInputRef = useRef();

  const assigmentValue = useCallback(async () => {
    if (!esNuevo) {
      fechaInputRef.current.value = new Date(dietData.FechaCarga)
        .toISOString()
        .substring(0, 10);
      alumnoInputRef.current.value = dietData.Alumno;
      dietData.dietaDetalleList = await GetDietDetailById(dietData.IdDieta);
      httpSearch.alumnoDataSelected = {
        IdAlumno: dietData.IdAlumno,
        Nombre: dietData.Alumno,
      };
      trainnerInputRef.current.value = dietData.IdTrainner;
    } else {
      fechaInputRef.current.value = new Date().toISOString().substring(0, 10);
    }
    let response = await GetAllTrainner();
    SetTrainnerList(response);
  }, [esNuevo, dietData, httpSearch]);

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  const modalShowHandler = () => {
    dispatchSearch({ type: "CLOSED" });
  };

  const modalShowErrorHandler = () => {
    dispatchDieta({ type: "CLOSED" });
  };

  const dietFormHandler = useCallback(
    async (event) => {
      event.preventDefault();

      dispatchLoading({ type: "BEGIN", message: "GUARDANDO...." });

      try {
        if (alumnoInputRef.current.value === 0) {
          dispatchLoading({
            type: "ERROR",
            message: "No hay un alumno asignado a este registro",
          });
          return;
        }

        if (trainnerInputRef.current.value === 0) {
          dispatchLoading({
            type: "ERROR",
            message: "No se asigno un entrenador",
          });
          return;
        }

        if (dietData.length === 0 || dietData === null) {
          dispatchLoading({
            type: "ERROR",
            message: "No hay detalles en este registro",
          });
          return;
        }

        const trainnerSeleceted = SearchList(
          listTrainner,
          "IdTrainner",
          trainnerInputRef.current.value
        );

        let sendDietData = {
          IdAlumno: httpSearch.alumnoDataSelected.IdAlumno,
          Alumno: httpSearch.alumnoDataSelected.Nombre,
          FechaCarga: new Date(fechaInputRef.current.value)
            .toISOString()
            .substring(0, 10),
          IdTrainner: trainnerSeleceted.IdTrainner,
          Trainner: trainnerSeleceted.Nombre,
          DietaDetalleList: dietData.dietaDetalleList,
          esNuevo: esNuevo,
        };

        if (!esNuevo) {
          sendDietData = {
            ...sendDietData,
            IdDieta: dietData.IdDieta,
          };
        }

        const dataReponse = await SaveDieta(sendDietData);

        if (dataReponse.message === "OK") {
          dispatchLoading({ type: "END" });
          dispatchConfirm({
            type: "BEGIN",
            message: "La dieta se persistio de forma correcta",
          });
        } else {
          dispatchLoading({
            type: "ERROR",
            message: "La dieta no se pudo persistir de forma correcta",
          });
        }
      } catch (err) {
        dispatchLoading({ type: "ERROR", message: err.message });
      }
    },
    [listTrainner, httpSearch, esNuevo, dietData]
  );

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

  const onConfirmModal = () => {
    if (httpConfirm.isShowing) {
      dispatchConfirm({ type: "END" });
      history.push("/diet");
    }
  };

  return (
    <Fragment>
      <section className={classes.diet}>
        <h1>{esNuevo ? "Nueva Dieta" : "Modificar Dieta"}</h1>
        <form onSubmit={dietFormHandler}>
          <div className={classes.control}>
            <label htmlFor="fecha">Fecha</label>
            <input
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              id="fecha"
              required
              ref={fechaInputRef}
            />
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
              defaultValue={esNuevo ? null : dietData.IdTrainner}
              onValueChanged={onSelectedTrainnerChanged}
            />
          </div>
          <DietaDetailList
            dietaDetalleList={dietData.dietaDetalleList}
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
      {httpDieta.isShowing && <LoadingSpinner />}
      {httpDieta.error && (
        <ErrorMessage
          showModal={httpDieta.error}
          modalHandler={modalShowErrorHandler}
          message={httpDieta.message}
        />
      )}
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
          modalHandler={onConfirmModal}
          onClose={onConfirmModal}
        />
      )}
    </Fragment>
  );
};

export default DietaForm;
