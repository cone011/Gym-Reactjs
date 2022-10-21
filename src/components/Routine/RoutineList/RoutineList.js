import {
  useState,
  useCallback,
  useRef,
  Fragment,
  useReducer,
  useEffect,
} from "react";
import classes from "./RoutineList.module.css";
import { useHistory } from "react-router-dom";
import Card from "../../UI/Card/Card";
import DataGrid, {
  Column,
  Selection,
  HeaderFilter,
  FilterRow,
  Button,
} from "devextreme-react/data-grid";
import DeleteMessage from "../../UI/DeleteMessage/DeleteMessage";
import LoadingForm from "../../UI/LoadingForm/LoadingForm";
import ShowConfirmMessage from "../../UI/ShowConfirmMessage/ShowConfirmMessage";
import { DeleteRoutine } from "../../../lib/RoutineApi";

const loadingReducer = (curLoading, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isLoading: true, error: false, message: action.message };
    case "ERROR":
      return { isLoading: false, error: true, message: action.message };
    case "CLOSED":
      return { ...curLoading, error: false };
    case "END":
      return { ...curLoading, isLoading: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const deleteReducer = (curDelete, action) => {
  switch (action.type) {
    case "BEGIN":
      return {
        isShowing: true,
        message: action.message,
        IdEliminar: action.IdEliminar,
      };
    case "CLOSED":
      return { ...curDelete, isShowing: false };
    case "END":
      return { ...curDelete, isShowing: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const confirmReducer = (curConfirm, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isShowing: true, message: action.message };
    case "CLOSED":
      return { ...curConfirm, message: action.message };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const RoutineList = (props) => {
  const { routineList, isEditable } = props;
  const [ListRoutine, SetListRoutine] = useState([]);
  const history = useHistory();
  const dataRef = useRef();
  const [httpLoading, dispatchLoading] = useReducer(loadingReducer, {
    isLoading: false,
    error: false,
    message: null,
  });
  const [httpDelete, dispatchDelete] = useReducer(deleteReducer, {
    isShowing: false,
    message: null,
    IdEliminar: null,
  });
  const [httpConfirm, dispatchConfirm] = useReducer(confirmReducer, {
    isShowing: false,
    message: null,
  });

  const assigmentValues = useCallback(() => {
    SetListRoutine(routineList);
  }, [routineList]);

  useEffect(() => {
    assigmentValues();
  }, [assigmentValues]);

  const editButtonHandler = (eventValue) => {
    history.push({
      pathname: "/form-routine",
      state: {
        esNuevo: false,
        routineObject: {
          ...eventValue.row.data,
        },
      },
    });
  };

  const newButtonHandler = () => {
    history.push({
      pathname: "/form-routine",
      state: {
        esNuevo: true,
        routineObject: {
          IdRutina: null,
          IdAlumno: null,
          Almuno: null,
          IdTrainner: null,
          Trainner: null,
          Fecha: null,
          routineDetalleList: [],
        },
      },
    });
  };

  const onModalDeleteHandler = () => {
    if (httpDelete.isShowing) {
      dispatchDelete({ type: "CLOSED" });
    }
  };

  const onEliminarRoutine = useCallback(async () => {
    dispatchDelete({ type: "END" });
    dispatchLoading({ type: "BEGIN", message: "ELIMINANDO...." });
    try {
      const deleteItem = await DeleteRoutine(httpDelete.IdEliminar);
      if (deleteItem.message === "OK") {
        const newList = ListRoutine.filter(
          (item) => item.IdRutina !== httpDelete.IdEliminar
        );
        SetListRoutine(newList);
        dataRef.current.instance.refresh();
        dispatchLoading({ type: "END" });
        dispatchConfirm({
          type: "BEGIN",
          message: "Se pudo eliminar el registro de forma correcta",
        });
      }
    } catch (err) {
      dispatchLoading({ type: "ERROR", message: err.message });
    }
  }, [httpDelete, ListRoutine]);

  const ConfirmModalHandler = () => {
    dispatchConfirm({ type: "CLOSED" });
  };

  return (
    <Fragment>
      <div>
        <Card className={classes.tableCenteredRoutine}>
          {isEditable && (
            <div className={classes.newRoutine} onClick={newButtonHandler}>
              <button>Nueva Rutina</button>
            </div>
          )}
          <DataGrid
            dataSource={ListRoutine}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
            ref={dataRef}
          >
            <Selection mode="single" />
            <FilterRow visible={true} applyFilter={true} />
            <HeaderFilter visible={true} />
            <Column dataField="IdRutina" caption="#" dataType="number" />
            <Column dataField="Alumno" caption="Alumno" dataType="string" />
            <Column dataField="Trainner" caption="Trainner" dataType="string" />
            <Column dataField="Fecha" caption="Fecha" dataType="date" />
            {isEditable && (
              <Column type="buttons">
                <Button
                  cssClass="btn"
                  name="editar"
                  onClick={editButtonHandler}
                >
                  Editar
                </Button>
                <Button cssClass="btn" name="eliminar">
                  Eliminar
                </Button>
              </Column>
            )}
          </DataGrid>
        </Card>
      </div>
      {httpDelete.isShowing && (
        <DeleteMessage
          showModal={httpDelete.isShowing}
          message={httpDelete.message}
          modalHandler={onModalDeleteHandler}
          onEliminar={onEliminarRoutine}
        />
      )}
      {httpLoading.isLoading && (
        <LoadingForm
          showModal={httpLoading.isShowing}
          message={httpLoading.message}
        />
      )}
      {httpConfirm.isShowing && (
        <ShowConfirmMessage
          showModal={httpConfirm.isShowing}
          message={httpConfirm.message}
          modalHandler={ConfirmModalHandler}
          onClose={ConfirmModalHandler}
        />
      )}
    </Fragment>
  );
};

export default RoutineList;
