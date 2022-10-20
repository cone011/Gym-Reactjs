import ReactDOM from "react-dom";
import { Modal } from "react-bootstrap";
import Card from "../Card/Card";
import classes from "./ShowMessageOut.module.css";

const ShowMessageOut = (message, callback) => {
  const container = document.createElement("div");
  container.setAttribute("custom-confirmation-navigation", "");
  document.body.appendChild(container);

  const closeModal = (callbackState) => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    callback(callbackState);
  };

  ReactDOM.render(
    <Modal show={true} size="lg" className={classes.messageOut}>
      <Modal.Header closeButton />
      <Modal.Body>
        <Card>{message}</Card>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={() => closeModal(false)}>
          Si
        </button>
        <button className="btn" onClick={() => closeModal(true)}>
          No
        </button>
      </Modal.Footer>
    </Modal>,
    container
  );
};

export default ShowMessageOut;
