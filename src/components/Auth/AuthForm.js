import { Fragment, useCallback, useReducer, useRef } from "react";
import classes from "./AuthForm.module.css";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { GetValidUsuario } from "../../lib/UsuarioApi";

const authReducer = (curAuth, actions) => {
  switch (actions.type) {
    case "BEGIN":
      return { isLoading: true, error: false, message: null };
    case "ERROR":
      return { isLoading: false, error: true, message: actions.message };
    case "CLOSED":
      return { ...curAuth, error: false, message: null };
    case "END":
      return { ...curAuth, isLoading: false };
    default:
      throw new Error("No se pudo realizar la accion");
  }
};

const AuthForm = () => {
  const userInputRef = useRef();
  const passwordInputRef = useRef();
  const [httpAuth, dispatchAuth] = useReducer(authReducer, {
    isLoading: false,
    error: false,
    message: null,
  });
  const submitHandler = useCallback(async (event) => {
    event.preventDefault();

    dispatchAuth({ type: "BEGIN" });

    if (userInputRef.current.value.trim().length === 0) {
      dispatchAuth({
        type: "ERROR",
        message: "No se encuentra cargado el usuario",
      });
      return;
    }

    if (passwordInputRef.current.value.trim().length === 0) {
      dispatchAuth({
        type: "ERROR",
        message: "No se encuentra cargado la contraseña",
      });
      return;
    }

    const usuario = userInputRef.current.value;

    const password = passwordInputRef.current.value;

    const response = await GetValidUsuario(usuario, password);

    console.log(response);

    dispatchAuth({ type: "END" });
  }, []);

  return (
    <Fragment>
      <section className={classes.auth}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="user">Usuario</label>
            <input type="text" id="user" required ref={userInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
            <div className={classes.actions}>
              <button type="submit" className={classes.toggle}>
                Login
              </button>
            </div>
          </div>
        </form>
      </section>
      {httpAuth.isLoading && <LoadingSpinner />}
    </Fragment>
  );
};

export default AuthForm;
