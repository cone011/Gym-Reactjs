import React from "react";
import classes from "./AlumnoList.module.css";
import DataGrid, {
  Column,
  Selection,
  HeaderFilter,
  FilterRow,
  Button,
} from "devextreme-react/data-grid";
import Card from "../../UI/Card/Card";

const AlumnoList = (props) => {
  const selectedValueHandler = (eventValue) => {
    props.onValueSelected({ ...eventValue.row.data });
  };

  return (
    <div>
      <Card className={classes.tableCenteredAlumno}>
        <DataGrid
          dataSource={props.alumnoData}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
        >
          <Selection mode="single" />
          <FilterRow visible={true} applyFilter={true} />
          <HeaderFilter visible={true} />
          <Column
            dataField="IdAlumno"
            caption="#"
            dataType="number"
            visible={false}
          />
          <Column
            dataField="IdUsuario"
            caption="Id User."
            dataType="number"
            visible={false}
          />
          <Column dataField="Cedula" caption="CI." dataType="string" />
          <Column dataField="Nombre" caption="Nombre" dataType="string" />
          {!props.isSearching && (
            <Column dataField="Telefono" caption="Telefono" dataType="string" />
          )}
          {!props.isSearching && (
            <Column dataField="Email" caption="Email" dataType="string" />
          )}
          {props.isSearching && (
            <Column type="buttons">
              <Button
                name="editar"
                cssClass="btn"
                onClick={selectedValueHandler}
              >
                Seleccionar
              </Button>
            </Column>
          )}
        </DataGrid>
      </Card>
    </div>
  );
};

export default AlumnoList;
