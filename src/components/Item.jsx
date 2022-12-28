import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function Item(props) {
  return (
    <li>
      <div
        className="itemP"
        contentEditable
        onInput={(event) => props.change(props.id, event)}
      >
        {/* 这个方式可以使得changeItem这个EVENT handler能加入除event外的参数，
        但也会使得每次这个组件渲染时都会创建一个新的callback
        instance，后期可以想一下怎么改进. freecodecamp给的一个方案：use property
        initializer syntax & currying， 但是实际使用会出现error:this is
        undefined. */}
        {props.text}
      </div>

      <button
        id="itemCheck"
        onClick={() => {
          props.click(props.id);
        }}
      >
        <CheckCircleOutlineIcon />
      </button>
    </li>
  );
}

export default Item;
