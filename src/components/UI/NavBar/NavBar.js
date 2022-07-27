import React from "react";
import classes from "./NavBar.module.css";
import navbarItems from "../../data/NavbarItems";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
const Navbar = ({ toggle }) => {
  return (
    <nav>
      <Link to="/" className={classes.link}>
        <div className={classes.mobilMenuIcon}>
          <CgGym onClick={toggle} />
        </div>
        Gym ReactApp
      </Link>
      <div className={classes.menuItems}>
        {navbarItems.map((item, index) => (
          <Link className={classes.link} to={item.link} key={index}>
            {item.title}
          </Link>
        ))}
      </div>
      <div className={classes.icon}>
        <div className={classes.mobilMenuIcon}>
          <FaBars onClick={toggle} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
