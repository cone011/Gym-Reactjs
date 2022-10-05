import { Modal } from "react-bootstrap";
import Card from "../Card/Card";
import classes from "./ErrorMessage.module.css";

const ErrorMessage = (props) => {
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
    </Modal>
  );
};

export default ErrorMessage;
