import {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import classes from "./ExcersiceList.module.css";
import DataGrid, {
  Column,
  SearchPanel,
  HeaderFilter,
  FilterRow,
  Button,
} from "devextreme-react/data-grid";
import Card from "../../UI/Card/Card";
import { useHistory } from "react-router-dom";
import { GetAllTypeExcersice } from "../../../lib/TypeExcersiceApi";
import { deleteExcersice } from "../../../lib/ExcersiceApi";
import LoadingForm from "../../UI/LoadingForm/LoadingForm";
import DeleteMessage from "../../UI/DeleteMessage/DeleteMessage";
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
    case "BEGIN ":
      return { isLoading: true, error: false, message: action.message };
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

const ExcersiceList = (props) => {
  const { excersiceList } = props;
  const [ListExcersice, SetListExcersice] = useState([]);
  const dataRef = useRef();
  const history = useHistory();
  const [httpLoading, dispatchLoading] = useReducer(loadingReducer, {
    isLoading: false,
    error: false,
    message: null,
  });
  const [httpDelete, dispatchDelete] = useReducer(deleteReducer, {
    isShowing: false,
    message: false,
    IdEliminar: false,
  });

  const assigmentValues = useCallback(() => {
    SetListExcersice(excersiceList);
  }, [excersiceList]);

  useEffect(() => {
    assigmentValues();
  }, [assigmentValues]);

  const editButtonHandler = async (eventValue) => {
    const auxObject = eventValue.row.data;
    const excersiceObject = auxObject;
    const listType = await GetAllTypeExcersice();

    history.push({
      pathname: "/edit-excersice",
      state: { esNuevo: false, excersiceObject, listType },
    });
  };

  const newButtonHandler = async () => {
    const listType = await GetAllTypeExcersice();
    history.push({
      pathname: "/new-excersice",
      state: { esNuevo: true, listType },
    });
  };

  const onModalErrorHandler = () => {
    if (httpLoading.error) {
      dispatchLoading({ type: "CLOSED" });
    }
  };

  const onModalDeleteHandler = () => {
    if (httpDelete.isShowing) {
      dispatchDelete({ type: "CLOSED" });
    }
  };

  const showDeleteExcersice = (eventValue) => {
    dispatchDelete({
      type: "BEGIN",
      message: "Desea eliminar este registro?",
      IdEliminar: eventValue.row.data.IdEjercicio,
    });
  };

  const onDeleteHanlder = useCallback(async () => {
    try {
      dispatchDelete({ type: "END" });
      dispatchLoading({ type: "BEGIN", message: "ELIMINANDO...." });
      console.log(httpDelete.IdEliminar);
      const deleteItem = await deleteExcersice(httpDelete.IdEliminar);
      console.log(deleteItem);
      if (deleteItem.message === "OK") {
        const newList = ListExcersice.filter(
          (item) => item.IdEjercicio !== httpDelete.IdEliminar
        );
        SetListExcersice(newList);
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
  }, [httpDelete, ListExcersice]);

  return (
    <Fragment>
      <div>
        <Card className={classes.tableCenteredExcersice}>
          <div className={classes.newExcersice} onClick={newButtonHandler}>
            <button>Nuevo Ejercicio</button>
          </div>
          <DataGrid
            dataSource={ListExcersice}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
            ref={dataRef}
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
            <Column type="buttons">
              <Button name="editar" cssClass="btn" onClick={editButtonHandler}>
                Editar
              </Button>
              <Button
                name="eliminar"
                cssClass="btn"
                onClick={showDeleteExcersice}
              >
                Eliminar
              </Button>
            </Column>
          </DataGrid>
        </Card>
      </div>
      {httpLoading.isLoading && (
        <LoadingForm
          showModal={httpLoading.isLoading}
          message={httpLoading.message}
        />
      )}
      {httpLoading.error && (
        <ErrorMessage
          showModal={httpLoading.error}
          message={httpLoading.message}
          modalHandler={onModalErrorHandler}
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
    </Fragment>
  );
};

export default ExcersiceList;
