import React from "react";
import classes from "./AlumnoList.module.css";
import DataGrid, {
  Column,
  SearchPanel,
  HeaderFilter,
  FilterRow,
  Button,
} from "devextreme-react/data-grid";
import Card from "../../UI/Card/Card";

const AlumnoList = (props) => {
  return (
    <div>
      <Card className={classes.tableCenteredAlumno}>
        <DataGrid
          dataSource={props.alumnoData}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
        >
          <FilterRow visible={true} applyFilter={true} />
          <HeaderFilter visible={true} />
          <SearchPanel visible={true} highlightCaseSensitive={true} />
        </DataGrid>
      </Card>
    </div>
  );
};

export default AlumnoList;
