import React from "react";
import classes from "./ExcersiceList.module.css";
import DataGrid, {
  Column,
  SearchPanel,
  HeaderFilter,
  FilterRow,
  Button,
} from "devextreme-react/data-grid";
import Card from "../../UI/Card/Card";
import { useHistory } from "react-router-dom";

const ExcersiceList = (props) => {
  const history = useHistory();

  const editButtonHandler = (eventValue) => {
    const auxObject = eventValue.row.data;
    const excersiceObject = auxObject;
    history.push({
      pathname: "/edit-excersice",
      state: { esNuevo: false, excersiceObject },
    });
  };

  const newButtonHandler = () => {
    history.push({ pathname: "/new-excersice", state: { esNuevo: true } });
  };

  return (
    <div>
      <Card className={classes.tableCenteredExcersice}>
        <div className={classes.newExcersice} onClick={newButtonHandler}>
          <button>Nuevo Ejercicio</button>
        </div>
        <DataGrid
          dataSource={props.excersiceList}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
        >
          <FilterRow visible={true} applyFilter={true} />
          <HeaderFilter visible={true} />
          <SearchPanel visible={true} highlightCaseSensitive={true} />
          <Column
            dataField="IdEjercicio"
            caption="#"
            dataType="number"
            alignment="left"
          />
          <Column
            dataField="Codigo"
            caption="Codigo"
            dataType="string"
            alignment="right"
          />
          <Column
            dataField="Nombre"
            caption="Nombre "
            dataType="string"
            alignment="right"
          />
          <Column
            dataField="TipoEjercicio"
            caption="Tipo Ejercicio "
            dataType="string"
            alignment="right"
          />
          <Column type="buttons">
            <Button name="editar" cssClass="btn" onClick={editButtonHandler}>
              Editar
            </Button>
          </Column>
        </DataGrid>
      </Card>
    </div>
  );
};

export default ExcersiceList;
