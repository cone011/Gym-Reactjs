import { useRef, useEffect, useCallback } from "react";
import { SelectBox } from "devextreme-react/select-box";
import classes from "./ExcersiceForm.module.css";

const ExcersiceForm = (props) => {
  const { excersiceObject, esNuevo } = props;
  const codeInputForm = useRef();
  const descriptionInputForm = useRef();
  const IdTipoEjercicioInputForm = useRef();
  let TipoEjercicio;

  const assigmentsValues = useCallback(() => {
    if (!esNuevo) {
      codeInputForm.current.value = excersiceObject.Codigo;
      descriptionInputForm.current.value = excersiceObject.Nombre;
      IdTipoEjercicioInputForm.current.value = excersiceObject.IdTipoEjercicio;
      TipoEjercicio = excersiceObject.TipoEjercicio;
    }
  }, [esNuevo, excersiceObject, TipoEjercicio]);

  useEffect(() => {
    assigmentsValues();
  }, [assigmentsValues]);

  const onSelectedValueChanged = (valueChanged) => {
    IdTipoEjercicioInputForm.current.value = valueChanged.value;
    const typeObject = props.listType.find(
      (item) => item.IdTipoEjercicio === valueChanged.value
    );
    TipoEjercicio = typeObject.Nombre;
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
    props.onSaveExcersice({
      Codigo: code,
      Nombre: description,
      IdTipoEjercicio: IdTipoEjercicio,
      TipoEjercicio: TipoEjercicio,
      IdEjercicio: IdEjercicio,
      esNuevo: props.esNuevo,
    });
  };

  return (
    <section className={classes.Excersice}>
      <h1>
        {props.esNuevo
          ? "Nuevo tipo de ejercicio"
          : "Modificar tipo de ejercicio"}
      </h1>
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
            onValueChanged={onSelectedValueChanged}
            ref={IdTipoEjercicioInputForm}
          />
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
