import React from "react";
import classes from "./TypeExcersiceList.module.css";
import Card from "../../UI/Card/Card";
import DataGrid, {
  Column,
  SearchPanel,
  HeaderFilter,
  FilterRow,
} from "devextreme-react/data-grid";
const TypeExcersiceList = (props) => {
  return (
    <div>
      <Card className={classes.tableCenteredTypeExcersice}>
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
        </DataGrid>
      </Card>
    </div>
  );
};

export default TypeExcersiceList;
