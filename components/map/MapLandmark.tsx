"use client";

import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

const iconUrl =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

type LatLng = [number, number];
type LocationMarkerProps = {
  position: LatLng | null;
  setPosition: (position: LatLng) => void;
};

function LocationMarker({ position, setPosition }: LocationMarkerProps) {
  useMapEvents({
    click(e) {
      const newLocation: LatLng = [e.latlng.lat, e.latlng.lng];
      setPosition(newLocation);
    },
  });

  return position ? (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}

function MapLandmark({
  location,
}: {
  location?: { lat: number; lng: number };
}) {
  const defaultLocation: LatLng = [14, 100];
  const [position, setPosition] = useState<LatLng | null>(null);

  // ตั้งค่าเริ่มต้นให้ตำแหน่งหากมี location ส่งเข้ามา
  useEffect(() => {
    if (location) {
      setPosition([location.lat, location.lng]);
    }
  }, [location]);

  return (
    <>
      <h1 className="mt-4 font-semibold">Where are you?</h1>
      <input type="hidden" name="lat" value={position ? position[0] : ""} />
      <input type="hidden" name="lng" value={position ? position[1] : ""} />
      <MapContainer
        className="h-[50vh] rounded-lg z-0 relative mb-2 mt-2"
        center={position || defaultLocation}
        zoom={7}
        scrollWheelZoom={true}
      >
        {position && (
          <Marker position={position} icon={markerIcon}>
            <Popup>
              Selected Location: <br />
              Lat: {position[0]}, Lng: {position[1]}
            </Popup>
          </Marker>
        )}

        <LocationMarker position={position} setPosition={setPosition} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}
export default MapLandmark;
