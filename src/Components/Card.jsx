import React, { useState } from "react";
import cafeData from "../indian_cafes_5000_sample.json"; 
import Stars from "./Stars";

function Card() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div className="grid font-[Poppins] grid-cols-1 px-[3vh] md:px-[20vh] sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {cafeData.map((cafe, index) => (
        <div 
          key={cafe['cafe-id']} 
          className="group relative rounded-2xl overflow-hidden hover:cursor-pointer shadow-lg min-h-[60vh] md:min-h-[58vh]"
        >
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-300"
            style={{
              backgroundImage: `url(${cafe.images?.[0] || 'https://picsum.photos/800/600'})`, 
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            
            <div className={`absolute flex flex-col justify-center bottom-0 w-full p-4 text-white transition-all duration-300 ${
              hoveredIndex === index ? "bottom-1/4" : "bottom-0" 
            }`}>
              <h2 className="md:text-xl text-4xl font-bold">{cafe.name}</h2>
              <p className="md:text-base text-xl opacity-90">{cafe.description}</p>
              <div className=""><Stars stars={cafe.rating}/></div>
              {/* <p>{Array.isArray(cafe.menu) ? cafe.menu.join(", ") : cafe.menu}</p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;