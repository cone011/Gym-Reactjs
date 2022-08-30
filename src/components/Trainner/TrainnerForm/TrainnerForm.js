import { useCallback, useEffect, useState, useRef } from "react";
import classes from "./TrainnerForm.module.css";

const TrainnerForm = (props) => {
  const { trainnerObject, esNuevo, IdUsuario } = props;
  const nameInputRef = useRef();
  const cedulaInputRef = useRef();
  const fechaNacInputRef = useRef();
  const edadInputRef = useRef();
  const direccionInputRef = useRef();
  const telefonoInputRef = useRef();
  const emailInputRef = useRef();
  const [isShowing, setIsShowing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

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
  }, [esNuevo, trainnerObject]);

  useEffect(() => {
    assigmentValues();
  }, [assigmentValues]);

  const modalHandler = () => {
    setIsShowing(!isShowing);
  };

  const showMessageError = (mensaje) => {
    setMessage(mensaje);
    setIsError(true);
    modalHandler();
  };

  const trainnerSubmitHandler = (event) => {
    event.preventDefault();
    if (nameInputRef.current.value.trim().length === 0) {
      showMessageError("Favor cargue su nombre");
      return;
    }

    if (cedulaInputRef.current.value.trim().length === 0) {
      showMessageError("Favor cargue su cedula");
      return;
    }

    if (edadInputRef.current.value === 0) {
      showMessageError("Favor de cargar su edad");
      return;
    }

    if (telefonoInputRef.current.value.trim().length === 0) {
      showMessageError("Favor cargar su numero de telefono");
      return;
    }

    if (direccionInputRef.current.value.trim().length === 0) {
      showMessageError("Favor cargar la direccion");
      return;
    }

    const sendDataObject = {
      Cedula: cedulaInputRef.current.value,
      Nombre: nameInputRef.current.value,
      FechaNacimiento: fechaNacInputRef.current.value,
      Edad: edadInputRef.current.value,
      Direccion: direccionInputRef.current.value,
      Telefono: telefonoInputRef.current.value,
      Email: emailInputRef.current.value,
      IdUsuario: IdUsuario,
    };

    props.onAddTrainner({
      ...sendDataObject,
    });
  };
};

export default TrainnerForm;
