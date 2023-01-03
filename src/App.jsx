import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NaviBar from "./components/NaviBar";
import Footer from "./components/Footer";
import AnchorTable from "./components/anchor/AnchorTable";
import ItemTable from "./components/ItemTable";

function App() {
  return (
    <div className="mycontainer">
      <NaviBar />
      <AnchorTable />
      <ItemTable />
      <Footer />
    </div>
  );
}

export default App;
