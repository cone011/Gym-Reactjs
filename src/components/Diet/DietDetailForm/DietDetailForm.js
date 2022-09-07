import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./DietDetailForm.module.css";
import { GetAllFormaComida } from "../../../lib/FormaComidaApi";
import { getAllDays } from "../../../lib/DiaApi";
import { SelectBox } from "devextreme-react/select-box";
import { Modal } from "react-bootstrap";
import { SearchList } from "../../../util/FindItem";

const DietDetailForm = (props) => {
  const { dietDetailObject, esNuevo, rowIndex } = props;
  const diaInputRef = useRef();
  const formaComidaInputRef = useRef();
  const conceptoInputRef = useRef();
  const [listDia, SetListDia] = useState([]);
  const [listFormaComida, SetListFormaComida] = useState([]);

  const assigmentValue = useCallback(async () => {
    if (!esNuevo) {
      diaInputRef.current.value = dietDetailObject.IdDia;
      formaComidaInputRef.current.value = dietDetailObject.IdFormaComida;
      conceptoInputRef.current.value = dietDetailObject.Concepto;
    }
    let diaList = await getAllDays();
    let formaComidaList = await GetAllFormaComida();
    SetListDia(diaList);
    SetListFormaComida(formaComidaList);
  }, [esNuevo, dietDetailObject]);

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  const onSelectedDiaValueChanged = (valueChanged) => {
    diaInputRef.current.value = valueChanged.value;
  };

  const onSelectedFormaComidaValueChanged = (valueChanged) => {
    formaComidaInputRef.current.value = valueChanged.value;
  };

  const saveDetail = () => {
    if (diaInputRef.current.value === 0) {
      return;
    }
    if (formaComidaInputRef.current.value === 0) {
      return;
    }
    if (conceptoInputRef.current.value === 0) {
      return;
    }
    const diaSeleted = SearchList(listDia, "IdDia", diaInputRef.current.value);
    const comidaSeleted = SearchList(
      listFormaComida,
      "IdFormaComida",
      formaComidaInputRef.current.value
    );

    let sendDietDetailData = {
      IdDia: diaInputRef.current.value,
      Dia: diaSeleted.Dia,
      IdFormaComida: formaComidaInputRef.current.value,
      FormaComida: comidaSeleted.Nombre,
      Concepto: conceptoInputRef.current.value,
      esNuevo: esNuevo,
      rowIndex: rowIndex,
    };

    if (!esNuevo && dietDetailObject.IdDietaDetalle !== undefined) {
      sendDietDetailData = {
        ...sendDietDetailData,
        IdDietaDetalle: dietDetailObject.IdDietaDetalle,
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
        <section className={classes.dietDetail}>
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
                defaultValue={esNuevo ? null : dietDetailObject.IdDia}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="date">Dia</label>
              <SelectBox
                dataSource={listFormaComida}
                placeholder="Seleccione un forma de comida"
                valueExpr="IdFormaComida"
                displayExpr="Nombre"
                searchEnabled={true}
                onValueChanged={onSelectedFormaComidaValueChanged}
                ref={formaComidaInputRef}
                defaultValue={esNuevo ? null : dietDetailObject.IdFormaComida}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="concepto">Concepto</label>
              <textarea ref={conceptoInputRef} />
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

export default DietDetailForm;
