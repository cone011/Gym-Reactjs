import { Route, Switch } from "react-router-dom";
import AllExcersice from "../Excersice/AllExcersice";
import Membership from "../../components/Membership/Membership";
import Service from "../../components/Services/Services";
import AllTypeExcersice from "../../components/TypeExcersice/TypeExcersiceList/TypeExcersiceList";
const Routes = () => {
  return (
    <Switch>
      <Route path="/membership" exact>
        <Membership />
      </Route>
      <Route path="/services" exact>
        <Service />
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
