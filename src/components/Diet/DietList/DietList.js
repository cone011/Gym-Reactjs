import {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
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
import DeleteMessage from "../../UI/DeleteMessage/DeleteMessage";
import { DeleteDieta } from "../../../lib/DietaApi";

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
  const { dietList } = props;
  const [listDiet, SetListDiet] = useState([]);
  const dataRef = useRef();
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

  const assigmentValues = useCallback(() => {
    SetListDiet(dietList);
  }, [dietList]);

  useEffect(() => {
    assigmentValues();
  }, [assigmentValues]);

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

  const showDeleteMessageHandler = (eventeValue) => {
    dispatchDelete({
      type: "BEGIN",
      message: "Desea eliminar este registro?",
      IdEliminar: eventeValue.row.data.IdDieta,
    });
  };

  const onModalErrorHandler = () => {
    if (httpDelete.error) {
      dispatchDelete({ type: "CLOSED" });
    }
    if (httpLoading.error) {
      dispatchLoading({ type: "CLOSED" });
    }
  };

  const onModalDeleteHandler = () => {
    if (httpDelete.isShowing) {
      dispatchDelete({ type: "CLOSED" });
    }
  };

  const onDeleteHanlder = useCallback(async () => {
    try {
      dispatchDelete({ type: "END" });
      dispatchLoading({ type: "BEGIN", message: "ELIMINANDO...." });
      const deleteItem = await DeleteDieta(httpDelete.IdEliminar);
      if (deleteItem.message === "OK") {
        const newList = listDiet.filter(
          (item) => item.IdDieta !== httpDelete.IdEliminar
        );
        SetListDiet(newList);
        dataRef.current.instance.refresh();
        dispatchLoading({ type: "END" });
      } else {
        dispatchLoading({
          type: "ERROR",
          message: "No se pudo eliminar este registro",
        });
      }
    } catch (err) {
      dispatchLoading({ type: "ERROR", message: err.message });
    }
  }, [httpDelete, listDiet]);

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
            dataSource={listDiet}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
            ref={dataRef}
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
                <Button
                  name="eliminar"
                  cssClass="btn"
                  onClick={showDeleteMessageHandler}
                >
                  Eliminar
                </Button>
              </Column>
            )}
          </DataGrid>
        </Card>
      </div>
      {(httpLoading.error || httpDelete.isShowing) && (
        <ErrorMessage
          showModal={httpLoading.error || httpDelete.isShowing}
          modalHandler={onModalErrorHandler}
          message={httpLoading.message || httpDelete.message}
        />
      )}
      {httpDelete.isShowing && (
        <DeleteMessage
          showModal={httpDelete.isShowing}
          message={httpDelete.message}
          modalHandler={onModalDeleteHandler}
          onEliminar={onDeleteHanlder}
        />
      )}
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
