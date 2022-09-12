import { Route, Switch, Redirect } from "react-router-dom";
import AllExcersice from "../Excersice/AllExcersice";
import Membership from "../../components/Membership/Membership";
import Home from "../Home/Home";
import AllTypeExcersice from "../TypeExcersice/AllTypeExcersice";
import TypeExcersiceFormPage from "../TypeExcersice/TypeExcersiceFormPage";
import ExcersiceFormPage from "../Excersice/ExcersiceFormPage";
import AllAlumno from "../Alumno/AllAlumno";
import AllDiet from "../Diet/AllDiet";
import DietFormPage from "../Diet/DietFormPage";
import RoutineFormPage from "../Routine/RoutineFormPage";
import AllRoutine from "../Routine/AllRoutine";
import Searching from "../../components/Search/Searching/Searching";
import AlumnoFormPage from "../Alumno/AlumnoFormPage";
import AllUsers from "../Users/AllUsers";
import AuthForm from "../../components/Auth/AuthForm";
const Routes = () => {
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
        <AllTypeExcersice />
      </Route>
      <Route path="/excersice" exact>
        <AllExcersice />
      </Route>
      <Route path="/new-excersice" exact>
        <ExcersiceFormPage />
      </Route>
      <Route path="/edit-excersice" exact>
        <ExcersiceFormPage />
      </Route>
      <Route path="/new-type-excersice" exact>
        <TypeExcersiceFormPage />
      </Route>
      <Route path="/edit-type-excersice" exact>
        <TypeExcersiceFormPage />
      </Route>
      <Route path="/alumno" exact>
        <AllAlumno />
      </Route>
      <Route path="/diet" exact>
        <AllDiet />
      </Route>
      <Route path="/new-diet" exact>
        <DietFormPage />
      </Route>
      <Route path="/edit-diet" exact>
        <DietFormPage />
      </Route>
      <Route path="/routine" exact>
        <AllRoutine />
      </Route>
      <Route path="/new-routine" exact>
        <RoutineFormPage />
      </Route>
      <Route path="/edit-routine" exact>
        <RoutineFormPage />
      </Route>
      <Route path="/search-diet" exact>
        <Searching typeSearching={"DIET"} />
      </Route>
      <Route path="/search-routine" exact>
        <Searching typeSearching={"ROUTINE"} />
      </Route>
      <Route path="/new-alumno" exact>
        <AlumnoFormPage />
      </Route>
      <Route path="/edit-alumno" exact>
        <AlumnoFormPage />
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
