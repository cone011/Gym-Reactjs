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
      esNuevo: true,
    });
  };

  const modalShowHandler = () => {
    dispatchDietaDetail({ type: "CLOSED" });
  };

  const onSaveDietDetail = (dietDetailData) => {
    dispatchDietaDetail({ type: "CLOSED" });
    console.log(dietDetailData);
    props.dietaDetalleList.push(dietDetailData);
    dataGridRef.current.instance.refresh();
  };

  return (
    <Fragment>
      <div>
        <Card className={classes.tableCenteredDietDetail}>
          <div className={classes.newDietField}>
            <button type="button" onClick={onShowDietaDetail}>
              Nuevo Detalle
            </button>
          </div>
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
            <Column dataField="IdDia" caption="#" dataType="number" />
            <Column dataField="IdFormaComida" caption="#" dataType="number" />
            <Column dataField="Concepto" caption="Concepto" dataType="string" />
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
        />
      )}
    </Fragment>
  );
};

export default DietaDetailList;
