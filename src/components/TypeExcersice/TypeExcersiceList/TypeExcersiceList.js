import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./TypeExcersiceList.module.css";
import Card from "../../UI/Card/Card";
import DataGrid, {
  Column,
  SearchPanel,
  HeaderFilter,
  FilterRow,
  Button,
} from "devextreme-react/data-grid";

const TypeExcersiceList = (props) => {
  const history = useHistory();
  let typeExcersiceObject;

  const newButtonHandler = () => {
    history.push({ pathname: "/new-excersice", state: { esNuevo: true } });
  };

  const editButtonHandler = (eventValue) => {
    const aux = eventValue.row.data;
    typeExcersiceObject = aux;
    history.push({
      pathname: "/edit-excersice",
      state: { esNuevo: false, typeExcersiceObject },
    });
  };

  return (
    <div>
      <Card className={classes.tableCenteredTypeExcersice}>
        <div className={classes.newTypeExcersice} onClick={newButtonHandler}>
          <button>Nuevo Tipo de Ejercicio</button>
        </div>
        <DataGrid
          dataSource={props.typeExcersiceList}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
        >
          <FilterRow visible={true} applyFilter={true} />
          <HeaderFilter visible={true} />
          <SearchPanel visible={true} highlightCaseSensitive={true} />
          <Column
            dataField="IdTipoEjercicio"
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

export default TypeExcersiceList;
