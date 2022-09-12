import { useRef, useEffect, useCallback, useReducer, Fragment } from "react";
import classes from "./AlumnoForm.module.css";

const alumnoReducer = (curAlumno, action) => {
  switch (action.type) {
    case "BEGIN":
      return { isShowing: true, error: false, message: null };
    case "ERROR":
      return { isShowing: false, error: true, message: action.message };
    case "CLOSED":
      return { ...curAlumno, isShowing: false };
    case "END":
      return { ...curAlumno, isShowing: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const AlumnoForm = (props) => {
  const { alumnoObject, esNuevo, IdUsuario } = props;
  const nameInputRef = useRef();
  const cedulaInputRef = useRef();
  const fechaNacInputRef = useRef();
  const edadInputRef = useRef();
  const direccionInputRef = useRef();
  const telefonoInputRef = useRef();
  const emailInputRef = useRef();
  const [httpAlumno, dispatchAlumno] = useReducer(alumnoReducer, {
    isShowing: false,
    error: false,
    message: null,
  });

  const assigmentValues = useCallback(() => {
    if (!esNuevo) {
      nameInputRef.current.value = alumnoObject.name;
      cedulaInputRef.current.value = alumnoObject.cedula;
      fechaNacInputRef.current.value = alumnoObject.fechaNacmiento;
      edadInputRef.current.value = alumnoObject.edad;
      direccionInputRef.current.value = alumnoObject.direccion;
      telefonoInputRef.current.value = alumnoObject.telefono;
      emailInputRef.current.value = alumnoObject.email;
    }
  }, [esNuevo, alumnoObject]);

  useEffect(() => {
    assigmentValues();
  }, [assigmentValues]);

  const modalHandler = () => {
    dispatchAlumno({ type: "CLOSED" });
  };

  const alumnoSubmitHandler = (event) => {
    event.preventDefault();

    dispatchAlumno({ type: "BEGIN" });

    if (nameInputRef.current.value.trim().length === 0) {
      dispatchAlumno({ type: "ERROR", message: "Favor cargue su nombre" });
      return;
    }

    if (cedulaInputRef.current.value.trim().length === 0) {
      dispatchAlumno({ type: "ERROR", message: "Favor cargue su cedula" });
      return;
    }

    if (edadInputRef.current.value === 0) {
      dispatchAlumno({ type: "ERROR", message: "Favor de cargar su edad" });
      return;
    }

    if (telefonoInputRef.current.value.trim().length === 0) {
      dispatchAlumno({
        type: "ERROR",
        message: "Favor cargar su numero de telefono",
      });
      return;
    }

    if (direccionInputRef.current.value.trim().length === 0) {
      dispatchAlumno({ type: "ERROR", message: "Favor cargar la direccion" });
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
    };

    if (!esNuevo) {
      sendDataObject = {
        ...sendDataObject,
        IdAlumno: alumnoObject.IdAlumno,
      };
    }

    dispatchAlumno({ type: "END " });

    props.onAddAlumno({
      ...sendDataObject,
    });
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
    </Fragment>
  );
};

export default AlumnoForm;
