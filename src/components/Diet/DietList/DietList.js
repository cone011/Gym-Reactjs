import { Fragment, useReducer } from "react";
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
import LoadingForm from "../../UI/LoadingForm/LoadingForm";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";

const deleteReducer = (curDelete, action) => {
  switch (action.type) {
    case "BEGIN":
      return {
        isShowing: true,
        message: action.message,
        IdEliminar: action.IdEliminar,
      };
    case "CLOSED":
      return { ...curDelete, isShowing: false };
    case "END":
      return { ...curDelete, isShowing: false };

    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const loadingReducer = (curLoading, action) => {
  switch (action) {
    case "BEGIN":
      return { isLoading: true, error: false, message: null };
    case "ERROR":
      return { isLoading: false, error: true, message: action.message };
    case "CLOSED":
      return { ...curLoading, error: false };
    case "END":
      return { ...curLoading, isLoading: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const DietList = (props) => {
  const history = useHistory();
  const [httpLoading, dispatchLoading] = useReducer(loadingReducer, {
    isLoading: false,
    error: false,
    message: null,
  });
  const [httpDelete, dispatchDelete] = useReducer(deleteReducer, {
    isShowing: true,
    message: null,
    IdEliminar: null,
  });

  const editDietButtonHandler = (eventValue) => {
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
    <Fragment>
      <div>
        <Card className={classes.tableCenteredDiet}>
          {props.isEditable && (
            <div className={classes.newDiet} onClick={newButtonHandler}>
              <button>Nueva Dieta</button>
            </div>
          )}
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
            {props.isEditable && (
              <Column type="buttons">
                <Button
                  name="editar"
                  cssClass="btn"
                  onClick={editDietButtonHandler}
                >
                  Editar
                </Button>
              </Column>
            )}
          </DataGrid>
        </Card>
      </div>
      {httpLoading.isLoading && (
        <LoadingForm
          showModal={httpLoading.isLoading}
          message={httpLoading.message}
        />
      )}
    </Fragment>
  );
};

export default DietList;
