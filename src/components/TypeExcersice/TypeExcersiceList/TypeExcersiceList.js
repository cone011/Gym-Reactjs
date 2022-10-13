import {
  useReducer,
  Fragment,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { useHistory } from "react-router-dom";
import DeleteMessage from "../../UI/DeleteMessage/DeleteMessage";
import { DeleteTypeExcersice } from "../../../lib/TypeExcersiceApi";
import Card from "../../UI/Card/Card";
import LoadingForm from "../../UI/LoadingForm/LoadingForm";
import classes from "./TypeExcersiceList.module.css";
import DataGrid, {
  Column,
  SearchPanel,
  HeaderFilter,
  FilterRow,
  Button,
} from "devextreme-react/data-grid";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";

const deleteReducer = (curDelete, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isShowing: true, message: null, IdEliminar: null };
    case "CLOSED":
      return { ...curDelete, isShowing: false };
    case "END":
      return { ...curDelete, isShowing: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const loadingReducer = (curLoading, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isShowing: true, error: false, message: action.message };
    case "ERROR":
      return { isShowing: false, error: true, message: action.message };
    case "CLOSED":
      return { ...curLoading, error: false };
    case "END":
      return { ...curLoading, isShowing: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const TypeExcersiceList = (props) => {
  const { typeExcersiceList } = props;
  const [listType, SetListType] = useState([]);
  const history = useHistory();
  const [httpDelete, dispatchDelete] = useReducer(deleteReducer, {
    isShowing: false,
    message: null,
    IdEliminar: null,
  });
  const [httpLoading, dispatchLoading] = useReducer(loadingReducer, {
    isShowing: false,
    error: false,
    message: null,
  });
  const dataRef = useRef();
  let typeExcersiceObject;

  useEffect(() => {
    SetListType(typeExcersiceList);
  }, [typeExcersiceList]);

  const newButtonHandler = () => {
    history.push({ pathname: "/new-type-excersice", state: { esNuevo: true } });
  };

  const editButtonHandler = (eventValue) => {
    const aux = eventValue.row.data;
    typeExcersiceObject = aux;
    history.push({
      pathname: "/edit-type-excersice",
      state: { esNuevo: false, typeExcersiceObject },
    });
  };

  const showDeleteMessageHandler = (eventeValue) => {
    dispatchDelete({
      type: "BEGIN",
      message: "Desea eliminar este registro?",
      IdEliminar: eventeValue.row.data.IdTipoEjercicio,
    });
  };

  const onModalDeleteHandler = () => {
    if (httpDelete.isShowing) {
      dispatchDelete({ type: "CLOSED" });
    }
  };

  const onModalErrorHandler = () => {
    if (httpDelete.error) {
      dispatchDelete({ type: "CLOSED" });
    }
    if (httpLoading.error) {
      dispatchLoading({ type: "CLOSED" });
    }
  };

  const onDeleteHanlder = useCallback(async () => {
    dispatchDelete({ type: "END" });
    dispatchLoading({ type: "BEGIN", message: "ELIMINANDO...." });
    const deleteItem = await DeleteTypeExcersice(httpDelete.IdEliminar);
    if (deleteItem.mensaje === "OK") {
      const newList = listType.filter(
        (item) => item.IdTipoEjercicio !== httpDelete.IdEliminar
      );
      SetListType(newList);
      dataRef.current.instance.refresh();
      dispatchLoading({ type: "END" });
    } else {
      dispatchLoading({
        type: "ERROR",
        message: "No se pudo eliminar este registro",
      });
    }
  }, [listType, httpDelete]);

  return (
    <Fragment>
      <div>
        <Card className={classes.tableCenteredTypeExcersice}>
          <div className={classes.newTypeExcersice} onClick={newButtonHandler}>
            <button>Nuevo Tipo de Ejercicio</button>
          </div>
          <DataGrid
            dataSource={listType}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
            ref={dataRef}
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
            <Column type="buttons">
              <Button name="editar" cssClass="btn" onClick={editButtonHandler}>
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
          </DataGrid>
        </Card>
      </div>
      {(httpDelete.error || httpLoading.error) && (
        <ErrorMessage
          showModal={httpDelete.error}
          modalHandler={onModalErrorHandler}
          message={httpDelete.message}
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
      {httpLoading.isShowing && (
        <LoadingForm
          showModal={httpLoading.isShowing}
          message={httpLoading.message}
        />
      )}
    </Fragment>
  );
};

export default TypeExcersiceList;
