import classes from "./DietList.module.css";
import Card from "../../UI/Card/Card";
import DataGrid, {
  Column,
  Selection,
  HeaderFilter,
  FilterRow,
  GroupPanel,
  MasterDetail,
  Button,
} from "devextreme-react/data-grid";
import { useHistory } from "react-router-dom";
import DietFormPage from "../../../pages/Diet/DietFormPage";

const DietList = (props) => {
  const history = useHistory();

  const newButtonHandler = () => {
    history.push({
      pathname: "/new-diet",
      state: {
        esNuevo: true,
        dietData: {
          IdAlumno: null,
          Almuno: null,
          IdTrainner: null,
          Trainner: null,
          FechaCarga: null,
          dietaDetalleList: [],
        },
      },
    });
  };

  return (
    <div>
      <Card>
        <div className={classes.newDiet} onClick={newButtonHandler}>
          <button>Nuevo Subscriptor</button>
        </div>
      </Card>
    </div>
  );
};

export default DietList;
