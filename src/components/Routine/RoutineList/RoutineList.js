import classes from "./RoutineList.module.css";
import { useHistory } from "react-router-dom";
import Card from "../../UI/Card/Card";
import DataGrid, {
  Column,
  Selection,
  HeaderFilter,
  FilterRow,
  MasterDetail,
  Button,
} from "devextreme-react/data-grid";

const RoutineList = (props) => {
  const history = useHistory();

  const editButtonHandler = (eventValue) => {
    history.push({
      pathname: "/edit-routine",
      state: {
        esNuevo: false,
        routineObject: {
          ...eventValue.row.data,
        },
      },
    });
  };

  const newButtonHandler = () => {
    history.push({
      pathname: "/new-routine",
      state: {
        esNuevo: true,
        routineObject: {
          IdRutina: null,
          IdAlumno: null,
          Almuno: null,
          IdTrainner: null,
          Trainner: null,
          Fecha: null,
          routineDetalleList: [],
        },
      },
    });
  };

  return (
    <div>
      <Card className={classes.tableCenteredRoutine}>
        {props.isEditable && (
          <div className={classes.newRoutine} onClick={newButtonHandler}>
            <button>Nueva Rutina</button>
          </div>
        )}
        <DataGrid
          dataSource={props.routineList}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
        >
          <Selection mode="single" />
          <FilterRow visible={true} applyFilter={true} />
          <HeaderFilter visible={true} />
          {/*<MasterDetail enabled={true} component={showDietDetail} />*/}
          <Column dataField="IdRutina" caption="#" dataType="number" />
          <Column dataField="Alumno" caption="Alumno" dataType="string" />
          <Column dataField="Trainner" caption="Trainner" dataType="string" />
          <Column dataField="Fecha" caption="Fecha" dataType="date" />
          {props.isEditable && (
            <Column type="buttons">
              <Button cssClass="btn" name="editar" onClick={editButtonHandler}>
                Editar
              </Button>
            </Column>
          )}
        </DataGrid>
      </Card>
    </div>
  );
};

export default RoutineList;
