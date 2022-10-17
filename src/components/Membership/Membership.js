import { Link } from "react-router-dom";
import InfoMembership from "../data/InfoMembership";
import classes from "./Membership.module.css";

const Membership = () => {
  return (
    <div className={classes.membershipContainer}>
      <h1 className={classes.sectionTitle}>Select your membership plan</h1>
      <ul className={classes.membershipBoxes}>
        {InfoMembership.map((data) => (
          <li key={data.id}>
            <h3 className={classes.type}>{data.type}</h3>
            <p>{data.period}</p>
            <p>{data.description}</p>
            <button className={`${classes.btnM} ${classes.btnMembership}`}>
              <Link to="/sign-up">Get it NOW!</Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Membership;
