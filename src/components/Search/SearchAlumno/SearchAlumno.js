import { useRef, useReducer, useState, useCallback } from "react";
import classes from "./SearchAlumno.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import { GetSearchAlumno } from "../../../lib/AlumnoApi";
import AlumnoList from "../../Alumno/AlumnoList/AlumnoList";
import { Modal } from "react-bootstrap";

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: false, isShowing: false };
    case "RESPONSE":
      return { ...curHttpState, loading: false, isShowing: true };
    case "ERROR":
      return { ...curHttpState, error: true, isShowing: false };
    case "CLEAR":
      return { ...curHttpState, error: false, isShowing: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const SearchAlumno = (props) => {
  const searchValueInputRef = useRef();
  const [listSearch, setListSearch] = useState();
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: false,
    isShowing: false,
  });

  const onSearchAlumnoHandler = useCallback(async () => {
    dispatchHttp({ type: "SEND" });

    try {
      if (searchValueInputRef.current.value === 0) {
        return;
      }

      const searchValue = searchValueInputRef.current.value;

      const result = await GetSearchAlumno(searchValue);

      setListSearch(result);

      dispatchHttp({ type: "RESPONSE" });
    } catch (err) {
      dispatchHttp({ type: "ERROR" });
    }
  }, []);

  const valueSelected = (alumnoData) => {
    props.onAlumnoSelectedValue({ ...alumnoData });
  };

  return (
    <Modal
      show={props.showModal}
      onHide={props.modalHandler}
      size="lg"
      className={classes.singlePost}
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <section className={classes.searchForm}>
          <h1>Ingrese el alumno a buscar</h1>
          <form>
            <div className={classes.control}>
              <label htmlFor="search">Alumno</label>
              <input
                type="text"
                id="search"
                required
                ref={searchValueInputRef}
              />
            </div>
            <div className={classes.control}>
              <div className={classes.actions}>
                <button
                  type="button"
                  onClick={onSearchAlumnoHandler}
                  className={classes.toggle}
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>
          {httpState.loading && <LoadingSpinner />}
          {!httpState.loading && !httpState.error && httpState.isShowing && (
            <AlumnoList
              alumnoData={listSearch}
              isSearching={true}
              onValueSelected={valueSelected}
            />
          )}
          {httpState.error && (
            <div className="centered">
              <h1>Error</h1>
            </div>
          )}
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default SearchAlumno;
