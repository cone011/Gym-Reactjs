import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./DietDetailForm.module.css";
import { GetAllFormaComida } from "../../../lib/FormaComidaApi";
import { getAllDays } from "../../../lib/DiaApi";
import { SelectBox } from "devextreme-react/select-box";
import { Modal } from "react-bootstrap";

const DietDetailForm = (props) => {
  const { dietDetailObject, esNuevo } = props;
  const diaInputRef = useRef();
  const formaComidaInputRef = useRef();
  const conceptoInputRef = useRef();
  const [listDia, SetListDia] = useState([]);
  const [listFormaComida, SetListFormaComida] = useState([]);

  const assigmentValue = useCallback(async () => {
    let diaList = await getAllDays();
    let formaComidaList = await GetAllFormaComida();
    SetListDia(diaList);
    SetListFormaComida(formaComidaList);
  }, []);

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  const onSelectedDiaValueChanged = (valueChanged) => {
    diaInputRef.current.value = valueChanged.value;
    let result = listDia.filter((item) => item.IdDia === valueChanged.value);
    dietDetailObject = {
      ...dietDetailObject,
      IdDia: result[0].IdDia,
      Dia: result[0].Dia,
    };
  };

  const onSelectedFormaComidaValueChanged = (valueChanged) => {
    formaComidaInputRef.current.value = valueChanged.value;
    let result = listFormaComida.filter(
      (item) => item.IdFormaComida === valueChanged.value
    );
    dietDetailObject = {
      ...dietDetailObject,
      IdFormaComida: result[0].IdFormaComida,
      FormaComida: result[0].FormaComida,
    };
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
    props.saveDietDetail({
      IdDia: diaInputRef.current.value,
      IdFormaComida: formaComidaInputRef.current.value,
      Concepto: conceptoInputRef.current.value,
      esNuevo: esNuevo,
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
