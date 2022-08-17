import { Fragment } from "react";
import NavbarUI from "../UI/Navbar/Navbar";
const Layout = (props) => {
  return (
    <Fragment>
      <NavbarUI />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
