import classes from "./DeleteMessage.module.css";
import { Modal } from "react-bootstrap";
import Card from "../Card/Card";

const DeleteMessage = (props) => {
  return (
    <Modal
      show={props.showModal}
      onHide={props.modalHandler}
      size="lg"
      className={classes.singlePost}
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <Card>{props.message}</Card>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={props.onEliminar}>
          Eliminar
        </button>
        <button className="btn" onClick={props.modalHandler}>
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMessage;
