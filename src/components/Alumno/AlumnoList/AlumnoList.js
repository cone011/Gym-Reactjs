import classes from "./AlumnoList.module.css";
import DataGrid, {
  Column,
  Selection,
  HeaderFilter,
  FilterRow,
  Button,
} from "devextreme-react/data-grid";
import Card from "../../UI/Card/Card";
import { useHistory } from "react-router-dom";

const AlumnoList = (props) => {
  const history = useHistory();

  const newButtonHandler = () => {
    history.push({
      pathname: "/new-alumno",
      state: {
        esNuevo: true,
        alumnoObject: {
          IdAlumno: null,
          Nombre: null,
          FechaNacimiento: null,
          Cedula: null,
          Edad: null,
          Direccion: null,
          Telefono: null,
          Email: null,
        },
      },
    });
  };

  const editValueHandler = (eventValue) => {
    history.push({
      pathname: "/edit-alumno",
      state: {
        esNuevo: false,
        alumnoObject: {
          ...eventValue.row.data,
        },
      },
    });
  };

  return (
    <div>
      <Card className={classes.tableCenteredAlumno}>
        {!props.isSearching && (
          <div className={classes.newAlumno} onClick={newButtonHandler}>
            <button>Nueva Alumno</button>
          </div>
        )}
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
          {!props.isSearching && (
            <Column type="buttons">
              <Button name="editar" cssClass="btn" onClick={editValueHandler}>
                Editar
              </Button>
            </Column>
          )}
        </DataGrid>
      </Card>
    </div>
  );
};

export default AlumnoList;
