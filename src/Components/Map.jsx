import React, { useEffect, useRef, useState } from "react";
import cafeData from "../data/indian_cafes_5000_sample.json";
import "../Styles/mapstyles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import useGeoLocation from "../hooks/useGeoLocation";
import Spinner from "./Spinner";
import useHaverSinKm from "../hooks/useHaverSinKm";
import locationImage from "../images/placeholder.png";
import userlocationImage from "../images/user_location (2).png";

function Map() {
  const mapRef = useRef();
  const useHaver = useHaverSinKm();
  const location = useGeoLocation();
  const [userPos, setUserPos] = useState(null);
  const [nearbyCafes, setNearbyCafes] = useState([]);

  const userIcon = new Icon({ iconUrl: userlocationImage, iconSize: [38, 38] });
  const cafeIcon = new Icon({ iconUrl: locationImage, iconSize: [38, 38] });

  useEffect(() => {
    if (location.loaded && !location.error) {
      setUserPos([location.coordinates.lat, location.coordinates.lng]);
    }
  }, [location]);

  useEffect(() => {
    if (!userPos) return;

    const cafes = cafeData
      .map((cafe) => {
        const distance = useHaver(userPos[0], userPos[1], cafe.latitude, cafe.longitude);
        return { ...cafe, distanceKm: distance };
      })
      .filter((cafe) => cafe.distanceKm <= 5)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    setNearbyCafes(cafes);
  }, [userPos]);

  if (!location.loaded) return <Spinner />;
  if (location.error)
    return (
      <div className="flex flex-col justify-center items-center mt-20">
        <p className="text-red-500 font-semibold">Error: {location.error}</p>
      </div>
    );

  return (
    <div className="border-[1px] font-sans flex flex-col gap-3 justify-center items-center md:min-h-[80vh]">
      <p className="font-semibold text-4xl md:text-3xl text-[#2d1f18] uppercase">
        Nearby Cafes
      </p>

      <div className="border-[1px] shadow-2xl flex justify-center items-center h-[60vh] w-[90%] rounded-lg">
        {userPos ? (
          <MapContainer
            center={userPos}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* User Location */}
            <Marker position={userPos} icon={userIcon} />

            {/* Nearby Cafes */}
            {nearbyCafes.map((cafe, index) => (
              <Marker
                key={cafe["cafe-id"]}
                position={[cafe.latitude, cafe.longitude]}
                icon={cafeIcon}
              >
                <Popup>
                  <div className="text-sm">
                    <h2 className="font-bold">{cafe.name}</h2>
                    <p>{cafe.description}</p>
                    {cafe.images && cafe.images[0] && (
                      <img
                        src={cafe.images[0]}
                        alt={cafe.name}
                        className="mt-2 w-32 h-24 object-cover rounded"
                      />
                    )}
                    <p className="mt-1 text-sm">Distance: {cafe.distanceKm.toFixed(2)} km</p>
                  </div>
                </Popup>
                {/* Only nearest cafe Polyline */}
                {index === 0 && <Polyline positions={[userPos, [cafe.latitude, cafe.longitude]]} />}
              </Marker>
            ))}

            {nearbyCafes.length === 0 && (
              <p className="absolute top-2 left-2 bg-white p-2 rounded shadow">
                No cafes found within 5 km
              </p>
            )}
          </MapContainer>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Map;
