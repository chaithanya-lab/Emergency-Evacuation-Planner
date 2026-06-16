import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

function MapView() {
  return (
    <div>
      <MapContainer
        center={[17.3850, 78.4867]}
        zoom={15}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px"
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Emergency Location */}
        <Marker position={[17.3850, 78.4867]}>
          <Popup>
            🚨 Emergency Location
          </Popup>
        </Marker>

        {/* Safe Exit */}
        <Marker position={[17.3870, 78.4890]}>
          <Popup>
            ✅ Safe Exit
          </Popup>
        </Marker>

        {/* Hospital */}
        <Marker position={[17.3900, 78.4920]}>
          <Popup>
            🏥 Nearest Hospital
          </Popup>
        </Marker>

        {/* Fire Station */}
        <Marker position={[17.3820, 78.4840]}>
          <Popup>
            🚒 Fire Station
          </Popup>
        </Marker>

      </MapContainer>
    </div>
  );
}

export default MapView;