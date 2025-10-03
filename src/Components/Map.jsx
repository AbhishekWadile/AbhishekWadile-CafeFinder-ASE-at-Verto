import React, { useRef } from "react";
import cafeData from "../indian_cafes_5000_sample.json";
import "../Styles/mapstyles.css";
import "leaflet/dist/leaflet.css";
import locationImage from "../images/placeholder.png";
import userlocationImage from "../images/user_location (2).png";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { icon, Icon } from "leaflet";
import useGeoLocation from "../hooks/useGeoLocation";
import Spinner from "./Spinner";

function Map() {
  const mapRef = useRef();
  const ZOOM_LEVEL = 9;
  const customIcon = new Icon({
    iconUrl: locationImage,
    iconSize: [38, 38],
  });
  const usercustomIcon = new Icon({
    iconUrl: userlocationImage,
    iconSize: [38, 38],
  });

  const location = useGeoLocation();

  // const showMyLocation = () =>{
  //   if(location.loaded && !location.error){
  //     mapRef.current.leaflateElement.flyTo(
  //       [location.coordinates.lat,location.coordinates.lng],
  //       ZOOM_LEVEL,
  //       {animation:true}
  //     );
  //   }else{
  //     alert(location.error.message);
  //   }
  // }

  return (
    <div className="border-[1px] font-sans flex flex-col gap-3 justify-center items-center md:min-h-[80vh]">
      <p className="font-semibold text-4xl md:text-3xl text-[#2d1f18] uppercase">Near By Cafe</p>

      <div className="border-[1px] shadow-2xl flex justify-center items-center h-[60vh] w-[90%] rounded-lg">
        { location.coordinates.lat && location.coordinates.lng?

        <MapContainer
          center={[location.coordinates.lat, location.coordinates.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            location.loaded && !location.error && (
              <Marker icon={usercustomIcon} position={[location.coordinates.lat,location.coordinates.lng]}></Marker>
            )
          }

          {cafeData.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>
                <div className="text-sm">
                  <h2 className="font-bold">{marker.name}</h2>
                  <p>{marker.description}</p>

                  {/* Show image if available */}
                  {marker.images && marker.images[0] && (
                    <img
                      src={marker.images[0]}
                      alt={marker.name}
                      className="mt-2 w-32 h-24 object-cover rounded"
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>:<Spinner/>
        }
      </div>
    </div>
  );
}

export default Map;
