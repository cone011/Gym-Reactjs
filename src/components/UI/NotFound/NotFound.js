import classes from "./NotFound.module.css";
import Card from "../Card/Card";

const NotFound = () => {
  return (
    <Card className={classes.notFound}>
      <p>Page not found!</p>
    </Card>
  );
};

export default NotFound;
