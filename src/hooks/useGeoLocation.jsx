import { useState, useEffect } from "react";

function useGeoLocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ loaded: true, error: "Geolocation not supported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          loaded: true,
          coordinates: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          error: null,
        });
      },
      (err) => {
        setLocation({ loaded: true, error: err.message });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return location;
}

export default useGeoLocation;
