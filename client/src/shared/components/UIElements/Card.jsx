import React from "react";

// import './Card.css';

export default function Card(props) {
  return (
    <div
      className={`relative m-0 rounded-lg p-4 bg-cyan-950 mt-8 flex flex-col ${props.className}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
