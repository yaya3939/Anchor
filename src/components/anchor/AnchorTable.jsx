import React, { useState } from "react";
import AnchorItem from "./AnchorItem";
import AnchorInput from "./AnchorInput";

function AnchorTable() {
  //-------------------------- anchorItems store --------------------------
  const [anchorItems, setAnchorItems] = useState([
    {
      title: "Example",
      color: { r: "244", g: "78", b: "59" },
      range: {},
      days: "TIME",
    }, //后期有数据库以后要改成根据items里是否有item显示或不显示
  ]);
  function addAnchor(event, anchorItem) {
    //make sure all input are required
    if (
      anchorItem.title !== "" &&
      JSON.stringify(anchorItem.color) !==
        JSON.stringify({ r: "255", g: "255", b: "255" })
    ) {
      setAnchorItems((prevItem) => {
        return [...prevItem, anchorItem];
      });
    } else {
      alert("Your anchor is not finished! Please check the title and color.");
    }
  }

  return (
    <div className="anchorTable">
      {/*  ------------------------input part--------------------------*/}
      <AnchorInput addAnchor={addAnchor} />

      {/*------------------------- anchorItem list -------------------------------*/}
      {anchorItems.map((item) => {
        return (
          <AnchorItem
            backgroundColor={{
              backgroundColor: `rgb(${item.color.r}, ${item.color.g}, ${item.color.b})`,
            }}
            ratingcolor={{
              "& .MuiRating-iconFilled": {
                color: `rgb(${item.color.r}, ${item.color.g}, ${item.color.b})`,
              },
            }}
            title={item.title}
            days={item.days}
          />
        );
      })}
    </div>
  );
}

export default AnchorTable;
