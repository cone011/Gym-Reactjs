import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./RoutineDetailForm.module.css";
import { SelectBox } from "devextreme-react/select-box";
import { Modal } from "react-bootstrap";
import { SearchList } from "../../../util/FindItem";
import { getAllDays } from "../../../lib/DiaApi";
import { getAllExcersice } from "../../../lib/ExcersiceApi";

const RoutineDetailForm = (props) => {
  const { routineDetailObject, esNuevo, rowIndex } = props;
  const diaInputRef = useRef();
  const ejercicioInputRef = useRef();
  const observacionInputRef = useRef();
  const [listDia, SetListDia] = useState([]);
  const [listEjercicio, SetListEjercicio] = useState([]);

  const assigmentValue = useCallback(async () => {
    if (!esNuevo) {
      diaInputRef.current.value = dietDetailObject.IdDia;
      ejercicioInputRef.current.value = dietDetailObject.IdEjercicio;
      observacionInputRef.current.value = dietDetailObject.Concepto;
    }
    let diaList = await getAllDays();
    let ejercicioList = await getAllExcersice();
    SetListDia(diaList);
    SetListEjercicio(ejercicioList);
  }, [esNuevo, routineDetailObject]);

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  const onSelectedDiaValueChanged = (valueChanged) => {
    diaInputRef.current.value = valueChanged.value;
  };

  const onSelectedEjercicioValueChanged = (valueChanged) => {
    ejercicioInputRef.current.value = valueChanged.value;
  };

  const saveDetail = () => {
    if (diaInputRef.current.value === 0) {
      return;
    }
    if (ejercicioInputRef.current.value === 0) {
      return;
    }
    if (observacionInputRef.current.value === 0) {
      return;
    }
    const diaSeleted = SearchList(listDia, "IdDia", diaInputRef.current.value);
    const ejercicioSeleted = SearchList(
      listEjercicio,
      "IdEjercicio",
      ejercicioInputRef.current.value
    );

    let sendDietDetailData = {
      IdDia: diaInputRef.current.value,
      Dia: diaSeleted.Dia,
      IdEjercicio: ejercicioSeleted.current.value,
      Ejercicio: ejercicioSeleted.Nombre,
      Concepto: observacionInputRef.current.value,
      esNuevo: esNuevo,
      rowIndex: rowIndex,
    };

    if (!esNuevo && routineDetailObject.IdRutinaDetalle !== undefined) {
      sendDietDetailData = {
        ...sendDietDetailData,
        IdRutinaDetalle: routineDetailObject.IdRutinaDetalle,
      };
    }

    props.saveDietDetail({
      ...sendDietDetailData,
    });
  };

  return (
    <Modal show={props.showModal} onHide={props.modalShowHandler} size="lg">
      <Modal.Header closeButton />
      <Modal.Body>
        <section className={classes.routineDetail}>
          <h1>{esNuevo ? "Agregar Nuevo Detalle" : "Modificar detalle"}</h1>
          <form>
            <div className={classes.control}>
              <label htmlFor="date">Dia</label>
              <SelectBox
                dataSource={listDia}
                placeholder="Seleccione un dia"
                valueExpr="IdDia"
                displayExpr="Dia"
                searchEnabled={true}
                onValueChanged={onSelectedDiaValueChanged}
                ref={diaInputRef}
                defaultValue={esNuevo ? null : routineDetailObject.IdDia}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="date">Dia</label>
              <SelectBox
                dataSource={listEjercicio}
                placeholder="Seleccione un Ejercicio"
                valueExpr="IdEjercicio"
                displayExpr="Nombre"
                searchEnabled={true}
                onValueChanged={onSelectedEjercicioValueChanged}
                ref={ejercicioInputRef}
                defaultValue={esNuevo ? null : routineDetailObject.IdEjercicio}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="concepto">Concepto</label>
              <textarea ref={observacionInputRef} />
            </div>
            <div className={classes.control}>
              <div className={classes.actions}>
                <button
                  type="button"
                  onClick={saveDetail}
                  className={classes.toggle}
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default RoutineDetailForm;
