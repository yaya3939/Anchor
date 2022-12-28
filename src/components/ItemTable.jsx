import React, { useState } from "react";
import Item from "./Item";
import { AddBox } from "@mui/icons-material";

function ItemTable() {
  const [clicked, setClicked] = useState(false);
  function addInput() {
    setClicked(true);
  }

  const [inputText, setInputText] = useState("");
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  const item1 = "welcome to anchor.";
  const item2 = "click +, input the todo item, and press enter key";
  const [items, setItems] = useState([item1, item2]);
  function handleEnter(event) {
    const enter = event.code;
    if (enter === "Enter") {
      setItems((prevItems) => {
        return [...prevItems, inputText];
      });
      console.log(items);
      setInputText("");
    }
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  function changeItem(id, event) {
    const changedValue = event.target.innerText;
    const changeItems = items.map((item, index) => {
      if (index === id) {
        return changedValue;
      } else {
        return item;
      }
    });
    setItems(changeItems);
    console.log(items);
    // 其实暂时来说这个function有没有都没影响，因为这个app都没有后台，
    // 刷新的话state都会重置，不刷新即使不更改state的信息，显示的也是更改的值
  }

  return (
    <div>
      <ol>
        {items.map((item, index) => {
          return (
            <Item
              key={index}
              id={index}
              text={item}
              change={changeItem}
              click={deleteItem}
            />
          );
        })}
        {clicked && (
          <li>
            <input
              className="itemInput"
              type="text"
              placeholder="What you gonna do?"
              value={inputText}
              onChange={handleChange}
              onKeyDown={handleEnter}
            />
          </li>
        )}
      </ol>
      <button id="addButton" onClick={addInput}>
        <AddBox />
      </button>
    </div>
  );
}

export default ItemTable;
