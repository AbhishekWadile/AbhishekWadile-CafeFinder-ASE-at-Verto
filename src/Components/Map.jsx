import React, { useEffect, useRef, useState } from "react";
import cafeData from "../data/indian_cafes_5000_sample.json";
import "../Styles/mapstyles.css";
import "leaflet/dist/leaflet.css";
import locationImage from "../images/placeholder.png";
import userlocationImage from "../images/user_location (2).png";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import useGeoLocation from "../hooks/useGeoLocation";
import Spinner from "./Spinner";
import useHaverSinKm from "../hooks/useHaverSinKm";

function Map() {
  const mapRef = useRef();
  const useHaver = useHaverSinKm();
  const [userPos, setUserPos] = useState(null);
  const [nearestCafe, setNearestCafe] = useState(null);

  const location = useGeoLocation(); // auto-prompt hook

  const customIcon = new Icon({ iconUrl: locationImage, iconSize: [38, 38] });
  const userIcon = new Icon({ iconUrl: userlocationImage, iconSize: [38, 38] });

  // set user position when location is loaded
  useEffect(() => {
    if (location.loaded && !location.error) {
      setUserPos([location.coordinates.lat, location.coordinates.lng]);
    }
  }, [location]);

  // calculate nearest cafe within 5 km
  useEffect(() => {
    if (!userPos) return;

    let nearest = null;
    let minDistance = Infinity;

    for (const cafe of cafeData) {
      const distance = useHaver(userPos[0], userPos[1], cafe.latitude, cafe.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = { ...cafe, distanceKm: distance };
      }
    }

    if (nearest && nearest.distanceKm <= 5) {
      setNearestCafe(nearest);
    } else {
      setNearestCafe(null);
    }
  }, [userPos]);

  // Loading state
  if (!location.loaded) return <Spinner />;

  // Error state
  if (location.error)
    return (
      <div className="flex flex-col justify-center items-center mt-20">
        <p className="text-red-500 font-semibold">Error: {location.error}</p>
      </div>
    );

  return (
    <div className="border-[1px] font-sans flex flex-col gap-3 justify-center items-center md:min-h-[80vh]">
      <p className="font-semibold text-4xl md:text-3xl text-[#2d1f18] uppercase">
        Near By Cafe
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

            {/* Nearest Cafe */}
            {nearestCafe && (
              <>
                <Marker position={[nearestCafe.latitude, nearestCafe.longitude]} icon={customIcon}>
                  <Popup>
                    <div className="text-sm">
                      <h2 className="font-bold">{nearestCafe.name}</h2>
                      <p>{nearestCafe.description}</p>
                      {nearestCafe.images && nearestCafe.images[0] && (
                        <img
                          src={nearestCafe.images[0]}
                          alt={nearestCafe.name}
                          className="mt-2 w-32 h-24 object-cover rounded"
                        />
                      )}
                      <p className="mt-1 text-sm">
                        Distance: {nearestCafe.distanceKm.toFixed(2)} km
                      </p>
                    </div>
                  </Popup>
                </Marker>

                <Polyline positions={[userPos, [nearestCafe.latitude, nearestCafe.longitude]]} />
              </>
            )}

            {/* No cafes within 5 km */}
            {!nearestCafe && (
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
