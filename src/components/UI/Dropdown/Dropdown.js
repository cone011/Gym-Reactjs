import React from "react";

const Dropdown = (props) => {
  return (
    <label>
      {props.label}
      <select value={props.value} onChange={props.onChange}>
        {props.list.map((item) => (
          <option value={item.IdTipoEjercicio}>{item.Nombre}</option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
