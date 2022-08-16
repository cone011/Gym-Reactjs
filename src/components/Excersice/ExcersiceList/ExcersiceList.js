import React from "react";
import classes from "./ExcersiceList.module.css";
import DataGrid, {
  Column,
  SearchPanel,
  HeaderFilter,
  FilterRow,
} from "devextreme-react/data-grid";
import Card from "../../UI/Card/Card";

const ExcersiceList = (props) => {
  return (
    <div>
      <Card className={classes.tableCenteredExcersice}>
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
        </DataGrid>
      </Card>
    </div>
  );
};

export default ExcersiceList;
