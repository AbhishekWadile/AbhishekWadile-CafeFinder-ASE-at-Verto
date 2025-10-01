import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex font-[Poppins] justify-between items-center px-6 md:px-20 font-semibold border-b h-[8vh] md:h-[10vh]">

      <div className="text-2xl md:text-3xl text-[#4b392f]">Cafeco.</div>

      <ul className="hidden md:flex gap-12 text-[#4b392f]">
        <li className="hover:text-[#2d1f18] hover:cursor-pointer">Home</li>
        <li className="hover:text-[#2d1f18] hover:cursor-pointer">About</li>
        <li className="hover:text-[#2d1f18] hover:cursor-pointer">Offer</li>
      </ul>

      <div
        className="md:hidden flex flex-col gap-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-6 h-0.5 bg-[#4b392f]"></span>
        <span className="w-6 h-0.5 bg-[#4b392f]"></span>
        <span className="w-6 h-0.5 bg-[#4b392f]"></span>
      </div>

      {isOpen && (
        <ul className="absolute top-[8vh] left-0 w-full duration-300 bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden">
          <li className="text-[#4b392f] hover:text-[#2d1f18]">Home</li>
          <li className="text-[#4b392f] hover:text-[#2d1f18]">About</li>
          <li className="text-[#4b392f] hover:text-[#2d1f18]">Offer</li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
