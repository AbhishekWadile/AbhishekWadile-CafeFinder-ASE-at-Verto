import React from "react";

function Footer() {
  return (
    <>
      <div className="w-[100%] md:w-[90%] h-[70vh] flex flex-col md:flex-row md:ml-[10vh] justify-around md:justify-center md:items-center">
        <div className="text-[#2d1f18] w-[100%] md:w-[60%] h-[15vh] justify-start pl-[4vh] md:h-full flex md:flex md:justify-start md:items-start font-poppins font-semibold text-5xl md:text-7xl pt-[7vh] md:pt-[10vh]">
          Cafeco.
        </div>
        <div className="md:w-[40%] md:h-[70%] h-[60vh] flex justify-start">
          <ul className="font-poppins pl-[5vh] md:pl-0 text-[#2d1f18] font-semibold flex flex-col gap-[3vh] justify-center">
            <a href="#" className="hover:cursor-pointer">
              Home
            </a>
            <a href="#" className="hover:cursor-pointer">
              About
            </a>
            <a href="#" className="hover:cursor-pointer">
              Privacy Policy
            </a>
            <a href="#" className="hover:cursor-pointer">
              Help
            </a>
          </ul>
        </div>
      </div>
      <div className="flex font-poppins justify-center items-center w-[100%] h-[15vh] border border-black">
        <div>
          <div>
            <p class="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} Cafeco. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
