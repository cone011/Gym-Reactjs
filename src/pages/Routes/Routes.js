import { Route, Switch, Redirect } from "react-router-dom";
import AllExcersice from "../Excersice/AllExcersice";
import Membership from "../../components/Membership/Membership";
import Home from "../Home/Home";
import AllTypeExcersice from "../TypeExcersice/AllTypeExcersice";
import ExcersiceFormPage from "../Excersice/ExcersiceFormPage";
import AllAlumno from "../Alumno/AllAlumno";
import AllDiet from "../Diet/AllDiet";
import AllRoutine from "../Routine/AllRoutine";
import Searching from "../../components/Search/Searching/Searching";
import AllUsers from "../Users/AllUsers";
import AuthForm from "../../components/Auth/AuthForm";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import TypeExcersiceForm from "../../components/TypeExcersice/TypeExcersiceForm/TypeExcersiceForm";
import DietaForm from "../../components/Diet/DietForm/DietForm";
import AlumnoForm from "../../components/Alumno/AlumnoForm/AlumnoForm";
import RoutineForm from "../../components/Routine/RoutineForm/RoutineForm";
const Routes = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/membership" exact>
        <Membership />
      </Route>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/type-excersice" exact>
        {authCtx.loggedIn && <AllTypeExcersice />}
        {!authCtx.loggedIn && <Redirect to="/home" />}
      </Route>
      <Route path="/excersice">
        {authCtx.loggedIn && <AllExcersice />}
        {!authCtx.loggedIn && <Redirect to="/home" />}
      </Route>
      <Route path="/form-excersice" exact>
        {authCtx.loggedIn && <ExcersiceFormPage />}
        {!authCtx.loggedIn && <Route to="/home" />}
      </Route>
      <Route path="/form-type-excersice" exact>
        {authCtx.loggedIn && <TypeExcersiceForm />}
        {!authCtx.loggedIn && <Redirect to="/home" />}
      </Route>
      <Route path="/alumno" exact>
        {authCtx.loggedIn && <AllAlumno />}
        {!authCtx.loggedIn && <Redirect to="/home" />}
      </Route>
      <Route path="/form-alumno" exact>
        {authCtx.loggedIn && <AlumnoForm />}
        {!authCtx.loggedIn && <Redirect to="/home" />}
      </Route>
      <Route path="/diet" exact>
        {authCtx.loggedIn && <AllDiet />}
        {!authCtx.loggedIn && <Redirect to="/home" />}
      </Route>
      <Route path="/form-diet" exact>
        {authCtx.loggedIn && <DietaForm />}
        {!authCtx.loggedIn && <Redirect to="/home" />}
      </Route>
      <Route path="/routine" exact>
        {authCtx.loggedIn && <AllRoutine />}
        {!authCtx.loggedIn && <Redirect to="/home" />}
      </Route>
      <Route path="/form-routine" exact>
        {authCtx.loggedIn && <RoutineForm />}
        {!authCtx.loggedIn && <Redirect to="/home" />}
      </Route>
      <Route path="/search-diet" exact>
        {authCtx.loggedIn && <Searching typeSearching={"DIET"} />}
        {!authCtx.loggedIn && <Redirect to="/home" />}
      </Route>
      <Route path="/search-routine" exact>
        {authCtx.loggedIn && <Searching typeSearching={"ROUTINE"} />}
        {!authCtx.loggedIn && <Redirect to="/home" />}
      </Route>
      <Route path="/users" exact>
        <AllUsers />
      </Route>
      <Route path="/login" exact>
        <AuthForm />
      </Route>
    </Switch>
  );
};

export default Routes;
