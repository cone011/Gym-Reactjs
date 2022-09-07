import { Fragment, useReducer, useRef } from "react";
import classes from "./DietDetailList.module.css";
import Card from "../../UI/Card/Card";
import DataGrid, {
  Column,
  Selection,
  HeaderFilter,
  FilterRow,
  Button,
} from "devextreme-react/data-grid";
import DietDetailForm from "../DietDetailForm/DietDetailForm";

const dietDetailReducer = (curDietDetail, action) => {
  switch (action.type) {
    case "BEGIN":
      return {
        isShowDetail: true,
        error: false,
        message: null,
        esNuevo: action.esNuevo,
        rowIndex: action.rowIndex,
        dietaDetailSelected: action.dietaDetailSelected,
      };
    case "ERROR":
      return { ...curDietDetail, error: true, message: action.message };
    case "CLOSED":
      return { ...curDietDetail, isShowDetail: false };
    case "END":
      return {
        ...curDietDetail,
        isShowDetail: false,
        dietaDetailSelected: action.dietaDetailSelected,
      };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const DietaDetailList = (props) => {
  const dataGridRef = useRef();
  const [httpDietaDetail, dispatchDietaDetail] = useReducer(dietDetailReducer, {
    isShowDetail: false,
    error: false,
    message: null,
    dietaDetailSelected: null,
  });

  const onShowDietaDetail = () => {
    dispatchDietaDetail({
      type: "BEGIN",
      dietaDetailSelected: null,
      rowIndex: null,
      esNuevo: true,
    });
  };

  const onModifyDietDetail = (eventValue) => {
    dispatchDietaDetail({
      type: "BEGIN",
      dietaDetailSelected: eventValue.row.data,
      rowIndex: eventValue.row.rowIndex,
      esNuevo: false,
    });
  };

  const modalShowHandler = () => {
    dispatchDietaDetail({ type: "CLOSED" });
  };

  const onSaveDietDetail = (dietDetailData) => {
    dispatchDietaDetail({ type: "CLOSED" });

    if (dietDetailData.esNuevo) {
      props.dietaDetalleList.push(dietDetailData);
    } else {
      props.dietaDetalleList[dietDetailData.rowIndex] = {
        IdDia: dietDetailData.IdDia,
        Dia: dietDetailData.Dia,
        IdFormaComida: dietDetailData.IdFormaComida,
        FormaComida: dietDetailData.FormaComida,
        Concepto: dietDetailData.Concepto,
        esNuevo: dietDetailData.esNuevo,
      };

      if (
        dietDetailData.IdDieta !== undefined ||
        dietDetailData.IdDietaDetalle !== undefined
      ) {
        props.dietaDetalleList[dietDetailData.rowIndex] = {
          ...props.dietaDetalleList[dietDetailData.rowIndex],
          IdDieta: dietDetailData.IdDieta,
          IdDietaDetalle: dietDetailData.IdDietaDetalle,
        };
      }
    }

    dataGridRef.current.instance.refresh();
  };

  return (
    <Fragment>
      <div>
        <Card className={classes.tableCenteredDietDetail}>
          {props.isEditable && (
            <div className={classes.newDietField}>
              <button type="button" onClick={onShowDietaDetail}>
                Nuevo Detalle
              </button>
            </div>
          )}
          <DataGrid
            dataSource={props.dietaDetalleList}
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
              dataField="FormaComida"
              caption="Forma Comida"
              dataType="string"
            />
            <Column dataField="Concepto" caption="Concepto" dataType="string" />
            {props.isEditable && (
              <Column type="buttons">
                <Button
                  name="editar"
                  cssClass="btn"
                  onClick={onModifyDietDetail}
                >
                  Editar
                </Button>
              </Column>
            )}
          </DataGrid>
        </Card>
      </div>
      {httpDietaDetail.isShowDetail && (
        <DietDetailForm
          showModal={httpDietaDetail.isShowDetail}
          modalShowHandler={modalShowHandler}
          dietDetailObject={httpDietaDetail.dietaDetailSelected}
          esNuevo={httpDietaDetail.esNuevo}
          saveDietDetail={onSaveDietDetail}
          rowIndex={httpDietaDetail.rowIndex}
        />
      )}
    </Fragment>
  );
};

export default DietaDetailList;
