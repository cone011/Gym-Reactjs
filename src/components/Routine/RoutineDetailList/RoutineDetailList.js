import React, { useReducer, Fragment, useRef } from "react";
import classes from "./RoutineDetailList.module.css";
import Card from "../../UI/Card/Card";
import DataGrid, {
  Column,
  Selection,
  HeaderFilter,
  FilterRow,
  Button,
} from "devextreme-react/data-grid";
import RoutineDetailForm from "../RoutineDetailForm/RoutineDetailForm";

const routineDetailReducer = (curRoutineDetail, action) => {
  switch (action.type) {
    case "BEGIN":
      return {
        isShowDetail: true,
        error: false,
        message: null,
        esNuevo: action.esNuevo,
        rowIndex: action.rowIndex,
        routineDetailSelected: action.routineDetailSelected,
      };
    case "ERROR":
      return { ...curRoutineDetail, error: true, message: action.message };
    case "CLOSED":
      return { ...curRoutineDetail, isShowDetail: false };
    case "END":
      return {
        ...curRoutineDetail,
        isShowDetail: true,
        routineDetailSelected: action.routineDetailSelected,
      };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const RoutineDetailList = React.memo((props) => {
  const [httpRoutine, dispatchRoutine] = useReducer(routineDetailReducer, {
    isShowDetail: false,
    error: false,
    message: null,
    esNuevo: true,
    rowIndex: null,
    routineDetailSelected: null,
  });
  const dataGridRef = useRef();

  const modalShowHandler = () => {
    dispatchRoutine({ type: "CLOSED" });
  };

  const onShowDietaDetail = () => {
    dispatchRoutine({
      type: "BEGIN",
      routineDetailSelected: null,
      rowIndex: null,
      esNuevo: true,
    });
  };

  const onModifyRoutineDetail = (eventValue) => {
    dispatchRoutine({
      type: "BEGIN",
      routineDetailSelected: eventValue.row.data,
      rowIndex: eventValue.row.rowIndex,
      esNuevo: false,
    });
  };

  const onSaveRoutineDetail = (routineDetailData) => {
    dispatchRoutine({ type: "CLOSED" });
    if (routineDetailData.esNuevo) {
      props.routineDetalleList.push(routineDetailData);
    } else {
      props.routineDetalleList[routineDetailData.rowIndex] = {
        IdDia: routineDetailData.IdDia,
        Dia: routineDetailData.Dia,
        IdEjercicio: routineDetailData.IdEjercicio,
        Ejercicio: routineDetailData.Ejercicio,
        Observacion: routineDetailData.Observacion,
        esNuevo: routineDetailData.esNuevo,
      };

      if (
        routineDetailData.IdRutina !== undefined ||
        routineDetailData.IdRutinaDetalle !== undefined
      ) {
        props.routineDetalleList[routineDetailData.rowIndex] = {
          ...props.routineDetalleList[routineDetailData.rowIndex],
          IdRutina: routineDetailData.IdRutina,
          IdRutinaDetalle: routineDetailData.IdRutinaDetalle,
        };
      }
    }

    dataGridRef.current.instance.refresh();
  };

  return (
    <Fragment>
      <div>
        <Card className={classes.tableCenteredRutineDetail}>
          {props.isEditable && (
            <div className={classes.newRutineField}>
              <button type="button" onClick={onShowDietaDetail}>
                Nueva Rutina Detalle
              </button>
            </div>
          )}
          <DataGrid
            dataSource={props.routineDetalleList}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
            ref={dataGridRef}
          >
            <Selection mode="single" />
            <FilterRow visible={true} applyFilter={true} />
            <HeaderFilter visible={true} />
            <Column dataField="Dia" caption="Dia" dataType="string" />
            <Column
              dataField="Ejercicio"
              caption="Ejercicio"
              dataType="string"
            />
            <Column
              dataField="Observacion"
              caption="Observacion"
              dataType="string"
            />
            {props.isEditable && (
              <Column type="buttons">
                <Button
                  name="editar"
                  cssClass="btn"
                  onClick={onModifyRoutineDetail}
                >
                  Editar
                </Button>
              </Column>
            )}
          </DataGrid>
        </Card>
      </div>
      {httpRoutine.isShowDetail && (
        <RoutineDetailForm
          showModal={httpRoutine.isShowDetail}
          modalShowHandler={modalShowHandler}
          routineDetailObject={httpRoutine.routineDetailSelected}
          esNuevo={httpRoutine.esNuevo}
          saveRoutineDetail={onSaveRoutineDetail}
          rowIndex={httpRoutine.rowIndex}
        />
      )}
    </Fragment>
  );
});

export default RoutineDetailList;
