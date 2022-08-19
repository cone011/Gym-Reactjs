import { useRef, useEffect, useState } from "react";
import { SelectBox } from "devextreme-react/select-box";
import classes from "./ExcersiceForm.module.css";

const ExcersiceForm = (props) => {
  const codeInputForm = useRef();
  const descriptionInputForm = useRef();
  const IdTipoEjercicioInputForm = useRef();
  const TipoEjercicioInputForm = useRef();

  const assigmentsValues = () => {
    if (!props.esNuevo) {
      codeInputForm.current.value = props.excersiceObject.Codigo;
      descriptionInputForm.current.value = props.excersiceObject.Nombre;
    }
  };

  useEffect(() => {
    assigmentsValues();
  }, [assigmentsValues]);

  const excersiceSubmitHandler = (event) => {
    event.preventDefault();

    let IdEjercicio = null;
    const code = codeInputForm.current.value;
    const description = descriptionInputForm.current.value;
    const IdTipoEjercicio = IdTipoEjercicioInputForm.current.value;
    const TipoEjercicio = TipoEjercicioInputForm.current.value;

    if (!props.esNuevo) {
      IdEjercicio = props.excersiceObject.IdEjercicio;
    }

    props.onSaveTypeExcersice({
      Codigo: code,
      Nombre: description,
      IdEjercicio: IdEjercicio,
      esNuevo: props.excersiceObject.esNuevo,
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
          />
        </div>
        <div className={classes.control}>
          <div className={classes.actions}>
            <button type="submit" className={classes.toggle}>
              guardar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ExcersiceForm;
