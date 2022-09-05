import { useRef, useEffect, useCallback, useReducer, useState } from "react";
import { SelectBox } from "devextreme-react/select-box";
import classes from "./ExcersiceForm.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

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
  const { excersiceObject, esNuevo } = props;
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
  const [TipoEjercicio, SetTipoEjercicio] = useState("");

  const assigmentsValues = useCallback(() => {
    if (!esNuevo) {
      codeInputForm.current.value = excersiceObject.Codigo;
      descriptionInputForm.current.value = excersiceObject.Nombre;
      IdTipoEjercicioInputForm.current.value = excersiceObject.IdTipoEjercicio;
      httpImage.imgExcersice = excersiceObject.ImagenUrl;
      console.log(httpImage.imgExcersice);
    }
  }, [esNuevo, excersiceObject, httpImage]);

  useEffect(() => {
    assigmentsValues();
  }, [assigmentsValues]);

  const onSelectedValueChanged = (valueChanged) => {
    IdTipoEjercicioInputForm.current.value = valueChanged.value;
    const typeObject = props.listType.find(
      (item) => item.IdTipoEjercicio === valueChanged.value
    );
    SetTipoEjercicio(typeObject.Nombre);
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

    let IdEjercicio = null;
    const code = codeInputForm.current.value;
    const description = descriptionInputForm.current.value;
    const IdTipoEjercicio = IdTipoEjercicioInputForm.current.value;

    if (!esNuevo) {
      IdEjercicio = excersiceObject.IdEjercicio;
    }

    const formData = new FormData();
    formData.append("Codigo", code);
    formData.append("Nombre", description);
    formData.append("IdTipoEjercicio", IdTipoEjercicio);
    formData.append("TipoEjercicio", TipoEjercicio);
    formData.append("IdEjercicio", IdEjercicio);
    formData.append("esNuevo", esNuevo);
    formData.append("image", httpImage.imgSend);

    props.onSaveExcersice(formData);
  };

  return (
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
            dataSource={props.listType}
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
  );
};

export default ExcersiceForm;
