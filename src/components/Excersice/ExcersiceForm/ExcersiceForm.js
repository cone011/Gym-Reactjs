import { useRef, useEffect, useCallback, useReducer, Fragment } from "react";
import { SelectBox } from "devextreme-react/select-box";
import classes from "./ExcersiceForm.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";

const tipoEjercicioReducer = (curTipoEjercicio, action) => {
  switch (action.type) {
    case "BEGIN":
      return { error: false, message: null, objectType: null };
    case "ERROR":
      return { ...curTipoEjercicio, error: true, message: action.message };
    case "END":
      return { ...curTipoEjercicio, objectType: action.objectType };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const errorReducer = (curError, action) => {
  switch (action.type) {
    case "BEGIN":
      return { error: false, message: null };
    case "ERROR":
      return { error: true, message: action.message };
    case "END":
      return { ...curError, error: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const imageReducer = (curImageState, action) => {
  switch (action.type) {
    case "BEGIN":
      return {
        loading: true,
        error: false,
        isShow: false,
        imgExcersice: null,
        imgSend: null,
      };
    case "ERROR":
      return {
        ...curImageState,
        loading: false,
        error: true,
        imgExcersice: null,
        imgSend: null,
      };
    case "END":
      return {
        ...curImageState,
        loading: false,
        isShow: true,
        imgExcersice: action.imgExcersice,
        imgSend: action.imgSend,
      };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const ExcersiceForm = (props) => {
  const { excersiceObject, esNuevo, listType } = props;
  const codeInputForm = useRef();
  const descriptionInputForm = useRef();
  const IdTipoEjercicioInputForm = useRef();
  const [httpImage, dispatchImage] = useReducer(imageReducer, {
    loading: false,
    error: false,
    isShow: false,
    imgExcersice: null,
    imgSend: null,
  });
  const [httpError, dispatchError] = useReducer(errorReducer, {
    error: false,
    message: null,
  });
  const [httpType, dispatchType] = useReducer(tipoEjercicioReducer, {
    error: false,
    message: null,
    objectType: null,
  });

  const assigmentsValues = useCallback(() => {
    if (!esNuevo) {
      codeInputForm.current.value = excersiceObject.Codigo;
      descriptionInputForm.current.value = excersiceObject.Nombre;
      IdTipoEjercicioInputForm.current.value = excersiceObject.IdTipoEjercicio;
      httpImage.imgExcersice = excersiceObject.ImagenUrl;
    }
  }, [esNuevo, excersiceObject, httpImage]);

  useEffect(() => {
    assigmentsValues();
  }, [assigmentsValues]);

  const onSelectedValueChanged = (valueChanged) => {
    dispatchType({ type: "BEGIN" });
    IdTipoEjercicioInputForm.current.value = valueChanged.value;
    const typeObject = listType.find(
      (item) => item.IdTipoEjercicio === valueChanged.value
    );
    if (!typeObject) {
      dispatchType({
        type: "ERROR",
        message: "No se encontro ningun tipo de ejercicio",
      });
    }
    dispatchType({ type: "END", objectType: typeObject });
  };

  const onSelectedFileChanged = (value) => {
    dispatchImage({ type: "BEGIN" });
    let selectedFile = value.target.files[0];
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        dispatchImage({
          type: "END",
          imgExcersice: URL.createObjectURL(selectedFile),
          imgSend: selectedFile,
        });
      };
    }
  };

  const excersiceSubmitHandler = (event) => {
    event.preventDefault();

    dispatchError({ type: "BEGIN" });

    if (codeInputForm.current.value.trim().lenght === 0) {
      dispatchError({
        type: "ERROR",
        message: "No se encuentra asignado un codigo al registro",
      });
    }

    if (descriptionInputForm.current.value.trim().lenght === 0) {
      dispatchError({
        type: "ERROR",
        message: "No se encuentra cargado una descripcion",
      });
    }

    if (IdTipoEjercicioInputForm.current.value === 0) {
      dispatchError({
        type: "ERROR",
        message: "No se encuentra asignado un tipo de ejercicio al registro",
      });
    }

    dispatchError({ type: "END" });

    const formData = new FormData();
    formData.append("Codigo", codeInputForm.current.value);
    formData.append("Nombre", descriptionInputForm.current.value);
    formData.append("IdTipoEjercicio", httpType.IdTipoEjercicio);
    formData.append("TipoEjercicio", httpType.TipoEjercicio);
    formData.append("esNuevo", esNuevo);
    formData.append("image", httpImage.imgSend);

    if (!esNuevo) {
      formData.append("IdEjercicio", excersiceObject.IdEjercicio);
    }

    props.onSaveExcersice(formData);
  };

  const onModalErrorHandler = () => {
    dispatchError({ type: "CLOSED" });
  };

  return (
    <Fragment>
      <section className={classes.Excersice}>
        <h1>{props.esNuevo ? "Nuevo ejercicio" : "Modificar ejercicio"}</h1>
        <form onSubmit={excersiceSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="code">Codigo</label>
            <input type="text" id="code" required ref={codeInputForm} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Descripcion</label>
            <input
              type="text"
              id="description"
              required
              ref={descriptionInputForm}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="type">Tipo Ejercicio</label>
            <SelectBox
              dataSource={listType}
              placeholder="Seleccione un tipo de ejercicio"
              valueExpr="IdTipoEjercicio"
              displayExpr="Nombre"
              searchEnabled={true}
              defaultValue={esNuevo ? null : excersiceObject.TipoEjercicio}
              onValueChanged={onSelectedValueChanged}
              ref={IdTipoEjercicioInputForm}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="imagen">Imagen</label>
            <input
              type="file"
              className="form-control"
              id="image"
              required
              onChange={onSelectedFileChanged}
            />
          </div>
          <div className={classes.control}>
            {httpImage.loading && <LoadingSpinner />}
            {!httpImage.loading && !httpImage.error && httpImage.isShow && (
              <div className={classes.holder}>
                <img src={httpImage.imgExcersice} alt="img" />
              </div>
            )}
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
      {(httpError.error || httpType.error) && (
        <ErrorMessage
          showModal={httpError.error || httpType.error}
          modalHandler={onModalErrorHandler}
          message={httpError.message || httpType.message}
        />
      )}
    </Fragment>
  );
};

export default ExcersiceForm;
