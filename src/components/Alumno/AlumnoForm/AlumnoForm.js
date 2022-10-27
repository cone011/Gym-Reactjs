import { useRef, useEffect, useCallback, useReducer, Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SaveAlumno } from "../../../lib/AlumnoApi";
import classes from "./AlumnoForm.module.css";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import LoadingForm from "../../UI/LoadingForm/LoadingForm";
import ShowConfirmMessage from "../../UI/ShowConfirmMessage/ShowConfirmMessage";

const loadingReducer = (curLoading, action) => {
  switch (action.type) {
    case "BEGIN":
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

const confirmReducer = (curConfirm, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isShowing: true, message: action.message };
    case "END":
      return { ...curConfirm, isShowing: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const AlumnoForm = () => {
  const history = useHistory();
  const location = useLocation();
  const { alumnoObject, esNuevo, IdUsuario } = location.state;
  const nameInputRef = useRef();
  const cedulaInputRef = useRef();
  const fechaNacInputRef = useRef();
  const edadInputRef = useRef();
  const direccionInputRef = useRef();
  const telefonoInputRef = useRef();
  const emailInputRef = useRef();
  const [httpLoading, dispatchLoading] = useReducer(loadingReducer, {
    isLoading: false,
    error: false,
    message: null,
  });
  const [httpConfirm, dispatchConfirm] = useReducer(confirmReducer, {
    isShowing: false,
    message: null,
  });

  const assigmentValues = useCallback(() => {
    if (!esNuevo) {
      nameInputRef.current.value = alumnoObject.Nombre;
      cedulaInputRef.current.value = alumnoObject.Cedula;
      fechaNacInputRef.current.value = new Date(alumnoObject.FechaNacimiento)
        .toISOString()
        .substring(0, 10);
      edadInputRef.current.value = alumnoObject.Edad;
      direccionInputRef.current.value = alumnoObject.Direccion;
      telefonoInputRef.current.value = alumnoObject.Telefono;
      emailInputRef.current.value = alumnoObject.Email;
    } else {
      fechaNacInputRef.current.value = new Date()
        .toISOString()
        .substring(0, 10);
    }
  }, [esNuevo, alumnoObject]);

  useEffect(() => {
    assigmentValues();
  }, [assigmentValues]);

  const modalHandler = () => {
    if (httpLoading.error) {
      dispatchLoading({ type: "CLOSED" });
    }
  };

  const alumnoSubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();

      dispatchLoading({ type: "BEGIN", message: "SAVING......" });

      try {
        if (nameInputRef.current.value.trim().length === 0) {
          dispatchLoading({ type: "ERROR", message: "Favor cargue su nombre" });
          return;
        }

        if (cedulaInputRef.current.value.trim().length === 0) {
          dispatchLoading({ type: "ERROR", message: "Favor cargue su cedula" });
          return;
        }

        if (edadInputRef.current.value === 0) {
          dispatchLoading({
            type: "ERROR",
            message: "Favor de cargar su edad",
          });
          return;
        }

        if (telefonoInputRef.current.value.trim().length === 0) {
          dispatchLoading({
            type: "ERROR",
            message: "Favor cargar su numero de telefono",
          });
          return;
        }

        if (direccionInputRef.current.value.trim().length === 0) {
          dispatchLoading({
            type: "ERROR",
            message: "Favor cargar la direccion",
          });
          return;
        }
        let sendDataObject = {
          Cedula: cedulaInputRef.current.value,
          Nombre: nameInputRef.current.value,
          FechaNacimiento: fechaNacInputRef.current.value,
          Edad: edadInputRef.current.value,
          Direccion: direccionInputRef.current.value,
          Telefono: telefonoInputRef.current.value,
          Email: emailInputRef.current.value,
          IdUsuario: IdUsuario,
          esNuevo: esNuevo,
        };

        if (!esNuevo) {
          sendDataObject = {
            ...sendDataObject,
            IdAlumno: alumnoObject.IdAlumno,
          };
        }

        console.log(sendDataObject);

        const dataResponse = await SaveAlumno(sendDataObject);

        if (dataResponse.message === "OK") {
          dispatchLoading({ type: "END" });
          dispatchConfirm({
            type: "BEGIN",
            message: "El alumno fue persistido corrrectamente",
          });
        } else {
          dispatchLoading({
            type: "ERROR",
            message: "El alumno no fue persistido correctamente",
          });
        }
      } catch (err) {
        dispatchLoading({ type: "ERROR", message: err.message });
      }
    },
    [IdUsuario, esNuevo, alumnoObject]
  );

  const onConfirmHandler = () => {
    if (httpConfirm.isShowing) {
      dispatchConfirm({ type: "END" });
      history.push("/alumno");
    }
  };

  return (
    <Fragment>
      <section className={classes.alumno}>
        <h1>{esNuevo ? "Nueva Alumno" : "Modificar Alumno"}</h1>
        <form onSubmit={alumnoSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="cedula">Cedula</label>
            <input type="text" id="cedula" required ref={cedulaInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" required ref={nameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              required
              pattern="\d{4}-\d{2}-\d{2}"
              ref={fechaNacInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="edad">Edad</label>
            <input type="number" id="edad" required ref={edadInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="telefono">Telefono</label>
            <input type="text" id="telefono" required ref={telefonoInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="direccion">Direccion</label>
            <textarea id="direccion" ref={direccionInputRef} />
          </div>
          <div className={classes.control}>
            <div className={classes.actions}>
              <button type="submit" className={classes.toggle}>
                Guardar
              </button>
            </div>
          </div>
        </form>
      </section>
      {httpLoading.error && (
        <ErrorMessage
          showModal={httpLoading.error}
          message={httpLoading.message}
          modalHandler={modalHandler}
        />
      )}
      {httpLoading.isLoading && (
        <LoadingForm
          showModal={httpLoading.isLoading}
          message={httpLoading.message}
        />
      )}
      {httpConfirm.isShowing && (
        <ShowConfirmMessage
          showModal={httpConfirm.isShowing}
          message={httpConfirm.message}
          modalHandler={onConfirmHandler}
          onClose={onConfirmHandler}
        />
      )}
    </Fragment>
  );
};

export default AlumnoForm;
