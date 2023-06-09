import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import localforage from "localforage";
import { useLoaderData } from "react-router-dom";
import InputArea from "../utils/InputArea";

export async function loader() {
  const getItem = await localforage.getItem("items");
  return getItem;
}

function TodoList() {
  let loadItems = useLoaderData();

  const [items, setItems] = useState([]);
  const [displayInput, setdisplayInput] = useState(false);

  useEffect(() => {
    if (loadItems) {
      setItems([...loadItems]);
    }
  }, [loadItems]);

  useEffect(() => {
    async function set() {
      await localforage.setItem("items", items);
    }
    set();
  }, [items]);

  async function handleEnter(event, inputText) {
    const enter = event.code;
    if (enter === "Enter" && inputText) {
      setItems((prevItems) => {
        return [...prevItems, inputText];
      });
    }
  }

  async function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="cloudedGlass todoBlock">
      <ol className="todoList">
        {items.map((item, index) => {
          return (
            <li key={index}>
              <button
                className="transparent text-gray1 pointer"
                onClick={() => {
                  deleteItem(index);
                }}
              >
                <CheckCircleOutlineIcon />
              </button>
              <div className="itemP">{item}</div>
            </li>
          );
        })}
        {displayInput && (
          <li>
            <button className="invisible">
              <CheckCircleOutlineIcon />
            </button>
            <InputArea
              className="itemInput inputBlock"
              placeholder="What you gonna do?"
              onKeyUp={handleEnter}
            />
          </li>
        )}
      </ol>
      <button
        className="btn text-bold todoBtn"
        onClick={() => setdisplayInput(!displayInput)}
      >
        Todo
      </button>
    </div>
  );
}

export default TodoList;
