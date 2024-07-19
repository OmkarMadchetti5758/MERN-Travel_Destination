import React from "react";
import ReactDOM from "react-dom";

// import "./Backdrop.css";

export default function Backdrop(props) {
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-opacity-50 z-10" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
}
