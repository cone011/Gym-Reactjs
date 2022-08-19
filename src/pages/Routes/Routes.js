import { Route, Switch, Redirect } from "react-router-dom";
import AllExcersice from "../Excersice/AllExcersice";
import Membership from "../../components/Membership/Membership";
import Home from "../Home/Home";
import AllTypeExcersice from "../TypeExcersice/AllTypeExcersice";
import TypeExcersiceFormPage from "../TypeExcersice/TypeExcersiceFormPage";
import ExcersiceFormPage from "../Excersice/ExcersiceFormPage";
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
    </Switch>
  );
};

export default Routes;
