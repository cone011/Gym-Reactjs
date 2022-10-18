import { Modal } from "react-bootstrap";
import Card from "../Card/Card";
import classes from "./ShowConfirmMessage.module.css";

const ShowConfirmMessage = (props) => {
  return (
    <Modal
      show={props.showModal}
      onHide={props.modalHandler}
      size="lg"
      className={classes.confirmMessage}
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <Card>{props.message}</Card>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={props.onClose}>
          OK
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowConfirmMessage;
