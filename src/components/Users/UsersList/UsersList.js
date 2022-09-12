import classes from "./UsersList.module.css";
import DataGrid, {
  Column,
  Selection,
  HeaderFilter,
  FilterRow,
  Button,
} from "devextreme-react/data-grid";
import Card from "../../UI/Card/Card";

const UserList = (props) => {
  return (
    <div>
      <Card className={classes.tableCenteredUser}>
        <DataGrid
          dataSource={props.userData}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
        >
          <Selection mode="single" />
          <FilterRow visible={true} applyFilter={true} />
          <HeaderFilter visible={true} />
          <Column
            dataField="IdUsuario"
            caption="#"
            dataType="number"
            visible={false}
          />
          <Column dataField="User" caption="User." dataType="string" />
          <Column dataField="EsTrainner" caption="Trainner." dataType="bit" />
          {!props.isSearching && (
            <Column type="buttons">
              <Button name="editar" cssClass="btn">
                Editar
              </Button>
            </Column>
          )}
        </DataGrid>
      </Card>
    </div>
  );
};

export default UserList;
