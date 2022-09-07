import classes from "./DietList.module.css";
import Card from "../../UI/Card/Card";
import DataGrid, {
  Column,
  Selection,
  HeaderFilter,
  FilterRow,
  MasterDetail,
  Button,
} from "devextreme-react/data-grid";
import { useHistory } from "react-router-dom";
import DietDetailPage from "../../../pages/Diet/DietDetailPage";

const DietList = (props) => {
  const history = useHistory();

  const editDietButtonHandler = (eventValue) => {
    console.log(eventValue.row.data);
    history.push({
      pathname: "/edit-diet",
      state: {
        esNuevo: false,
        dietData: {
          ...eventValue.row.data,
          dietaDetalleList: [],
        },
      },
    });
  };

  const showDietDetail = (value) => {
    return (
      <DietDetailPage
        IdDietDetail={value.data.data.IdDieta}
        isEditable={false}
      />
    );
  };

  const newButtonHandler = () => {
    history.push({
      pathname: "/new-diet",
      state: {
        esNuevo: true,
        dietData: {
          IdDieta: null,
          IdAlumno: null,
          Almuno: null,
          IdTrainner: null,
          Trainner: null,
          FechaCarga: null,
          dietaDetalleList: [],
        },
      },
    });
  };

  return (
    <div>
      <Card className={classes.tableCenteredDiet}>
        <div className={classes.newDiet} onClick={newButtonHandler}>
          <button>Nueva Dieta</button>
        </div>
        <DataGrid
          dataSource={props.dietList}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
        >
          <Selection mode="single" />
          <FilterRow visible={true} applyFilter={true} />
          <HeaderFilter visible={true} />
          <MasterDetail enabled={true} component={showDietDetail} />
          <Column dataField="IdDieta" caption="#" dataType="number" />
          <Column dataField="Alumno" caption="Alumno" dataType="string" />
          <Column dataField="Trainner" caption="Trainner" dataType="string" />
          <Column dataField="FechaCarga" caption="Fecha" dataType="date" />
          <Column type="buttons">
            <Button
              name="editar"
              cssClass="btn"
              onClick={editDietButtonHandler}
            >
              Editar
            </Button>
          </Column>
        </DataGrid>
      </Card>
    </div>
  );
};

export default DietList;
