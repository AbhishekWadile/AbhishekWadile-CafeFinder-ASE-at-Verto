import React from "react";
import { IoCafeSharp } from "react-icons/io5";

function Spinner() {
  return (
    <div className="flex items-center justify-center h-auto bg-transparent">
      <IoCafeSharp style={{ color: "#4b392f" }}  className="text-6xl text-brown-600 animate-bounce" />
    </div>
  );
}

export default Spinner;
