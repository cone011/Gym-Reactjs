import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import AuthContext from "../../../store/auth-context";
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
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import LoadingForm from "../../UI/LoadingForm/LoadingForm";
import ShowConfirmMessage from "../../UI/ShowConfirmMessage/ShowConfirmMessage";
import DeleteMessage from "../../UI/DeleteMessage/DeleteMessage";

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
  switch (action.type) {
    case "BEGIN":
      return { isShowing: true, error: false, message: action.type };
    case "ERROR":
      return { isShowing: false, error: true, message: action.type };
    case "CLOSED":
      return { ...curLoading, error: false };
    case "END":
      return { ...curLoading, isSearching: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const confirmReducer = (curConfirm, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isShowing: true, message: action.message };
    case "CLOSED":
      return { ...curConfirm, isShowing: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const AlumnoList = (props) => {
  const authCtx = useContext(AuthContext);
  const { isSearching, alumnoData } = props;
  const [ListAlumno, SetListAlumno] = useState([]);
  const dataRef = useRef();
  const history = useHistory();
  const [httpLoading, dispatchLoading] = useReducer(loadingReducer, {
    isShowing: false,
    error: false,
    message: null,
  });
  const [httpDelete, dispatchDelete] = useReducer(deleteReducer, {
    isShowing: false,
    message: null,
    IdEliminar: null,
  });
  const [httpConfirm, dispatchConfirm] = useReducer(confirmReducer, {
    isShowing: false,
    message: null,
  });

  const assigmentValues = useCallback(() => {
    SetListAlumno(alumnoData);
  }, [alumnoData]);

  useEffect(() => {
    assigmentValues();
  }, [assigmentValues]);

  const newButtonHandler = () => {
    console.log(authCtx.userData);
    history.push({
      pathname: "/form-alumno",
      state: {
        esNuevo: true,
        IdUsuario: authCtx.userData.IdUsuario,
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
      pathname: "/form-alumno",
      state: {
        esNuevo: false,
        IdUsuario: authCtx.userData.IdUsuario,
        alumnoObject: {
          ...eventValue.row.data,
        },
      },
    });
  };

  const showDeleteAlumno = (eventValue) => {
    dispatchDelete({
      type: "BEGIN",
      message: "Desea eliminar a este alumno?",
      IdEliminar: eventValue.row.data.IdAlumno,
    });
  };

  const onModalDeleteHandler = () => {
    if (httpDelete.isShowing) {
      dispatchDelete({ type: "CLOSED" });
    }
  };

  const onModalErrorHandler = () => {
    if (httpLoading.error) {
      dispatchLoading({ type: "CLOSED" });
    }
  };

  const onModalConfirmHandler = () => {
    if (httpConfirm.isShowing) {
      dispatchConfirm({ type: "CLOSED" });
    }
  };

  const onDeleteAlumnoHandler = useCallback(async () => {}, []);

  return (
    <Fragment>
      <div>
        <Card className={classes.tableCenteredAlumno}>
          {!isSearching && (
            <div className={classes.newAlumno} onClick={newButtonHandler}>
              <button>Nueva Alumno</button>
            </div>
          )}
          <DataGrid
            dataSource={ListAlumno}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
            ref={dataRef}
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
            {!isSearching && (
              <Column
                dataField="Telefono"
                caption="Telefono"
                dataType="string"
              />
            )}
            {!isSearching && (
              <Column dataField="Email" caption="Email" dataType="string" />
            )}
            {!isSearching && (
              <Column type="buttons">
                <Button name="editar" cssClass="btn" onClick={editValueHandler}>
                  Editar
                </Button>
                <Button
                  name="eliminar"
                  cssClass="btn"
                  onClick={showDeleteAlumno}
                >
                  Eliminar
                </Button>
              </Column>
            )}
          </DataGrid>
        </Card>
      </div>
      {httpLoading.error && (
        <ErrorMessage
          showModal={httpLoading.error}
          message={httpLoading.message}
          modalHandler={onModalErrorHandler}
        />
      )}
      {httpLoading.isShowing && (
        <LoadingForm
          showModal={httpLoading.isShowing}
          message={httpLoading.message}
        />
      )}
      {httpDelete.isShowing && (
        <DeleteMessage
          showModal={httpDelete.isShowing}
          message={httpDelete.message}
          modalHandler={onModalDeleteHandler}
          onEliminar={onDeleteAlumnoHandler}
        />
      )}
      {httpConfirm.isShowing && (
        <ShowConfirmMessage
          showModal={httpConfirm.isShowing}
          message={httpConfirm.message}
          modalHandler={onModalConfirmHandler}
          onClose={onModalConfirmHandler}
        />
      )}
    </Fragment>
  );
};

export default AlumnoList;
