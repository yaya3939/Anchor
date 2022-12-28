import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NaviBar from "./NaviBar";
import Footer from "./Footer";
import AnchorTable from "./AnchorTable";
import ItemTable from "./ItemTable";

function App() {
  return (
    <div className="mycontainer">
      <NaviBar />
      <ItemTable />
      <Footer />
    </div>
  );
}

export default App;
