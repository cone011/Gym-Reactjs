import { Fragment } from "react";
import classes from "./LoadingForm.module.css";
import { Modal } from "react-bootstrap";
import Card from "../Card/Card";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const LoadingForm = (props) => {
  return (
    <Modal show={props.showModal} size="lg" className={classes.singlePost}>
      <Modal.Header />
      <Modal.Body>
        <Fragment>
          <Card>
            <div className="centered">
              <h1>{props.message}</h1>
              <LoadingSpinner />
            </div>
          </Card>
        </Fragment>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingForm;
