import { Route, Switch, Redirect } from "react-router-dom";
import AllExcersice from "../Excersice/AllExcersice";
import Membership from "../../components/Membership/Membership";
import Home from "../Home/Home";
import AllTypeExcersice from "../../components/TypeExcersice/TypeExcersiceList/TypeExcersiceList";
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
    </Switch>
  );
};

export default Routes;
