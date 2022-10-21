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
import { useState } from "react";
import { useReducer } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";

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

const RoutineList = (props) => {
  const { routineList } = props;
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

  return (
    <div>
      <Card className={classes.tableCenteredRoutine}>
        {props.isEditable && (
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
          {props.isEditable && (
            <Column type="buttons">
              <Button cssClass="btn" name="editar" onClick={editButtonHandler}>
                Editar
              </Button>
            </Column>
          )}
        </DataGrid>
      </Card>
    </div>
  );
};

export default RoutineList;
