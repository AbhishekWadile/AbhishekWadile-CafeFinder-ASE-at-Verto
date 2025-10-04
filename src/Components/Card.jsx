import React, { useState, useEffect } from "react";
import cafeData from "../data/indian_cafes_5000_sample.json";
import Stars from "./Stars";
import useGeoLocation from "../hooks/useGeoLocation";
import useHaverSinKm from "../hooks/useHaverSinKm";
import Spinner from "./Spinner";

function Card() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [nearby, setNearby] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useGeoLocation();
  const useHaver = useHaverSinKm();

  useEffect(() => {
    if (!location?.coordinates?.lat || !location?.coordinates?.lng) return;

    const { lat, lng } = location.coordinates;

    const nearbyCafes = cafeData
      .map((cafe) => {
        const d = useHaver(lat, lng, cafe.latitude, cafe.longitude);
        return { ...cafe, distanceKm: d };
      })
      .filter((cafe) => cafe.distanceKm <= 5)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    setNearby(nearbyCafes);
    setLoading(false);
  }, [location]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white/80 z-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid font-[Poppins] grid-cols-1 px-[3vh] md:px-[20vh] sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {nearby.length > 0 ? (
        nearby.map((cafe, index) => (
          <div
            key={cafe["cafe-id"]}
            className="group relative rounded-2xl overflow-hidden hover:cursor-pointer shadow-lg min-h-[60vh] md:min-h-[58vh]"
          >
            <div
              className="w-full h-full bg-cover bg-center transition-all duration-300"
              style={{
                backgroundImage: `url(${
                  cafe.images?.[0] || "https://picsum.photos/800/600"
                })`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

              <div
                className={`absolute flex flex-col justify-center bottom-0 w-full p-4 text-white transition-all duration-300 ${
                  hoveredIndex === index ? "bottom-1/4" : "bottom-0"
                }`}
              >
                <h2 className="md:text-xl text-4xl font-bold">{cafe.name}</h2>
                <p className="md:text-base text-xl opacity-90">
                  {cafe.description}
                </p>
                <div className="">
                  <Stars stars={cafe.rating} />
                </div>
                <p className="text-sm opacity-80 mt-2">
                  Distance: {cafe.distanceKm.toFixed(2)} km
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg font-semibold w-full">
          No cafes found within 5 km
        </p>
      )}
    </div>
  );
}

export default Card;
