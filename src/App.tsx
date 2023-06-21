import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the data structure for each stop
type Stop = {
  position: LatLngTuple,
  name: string,
  duration: number, // added this property to track the duration of stay
}

// Define the stops
const stops: Stop[] = [
  { position: [35.681236, 139.767125], name: "Tokyo Station", duration: 1 },
  { position: [35.658034, 139.701636], name: "Shibuya Station", duration: 1 },
  { position: [35.729503, 139.710900], name: "Ikebukuro Station", duration: 2 },
];

// Icons
const moveIcon = new L.Icon({
  iconUrl: '/move-track.png',
  iconRetinaUrl: '/move-track.png',
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const stopIcon = new L.Icon({
  iconUrl: '/stop-track.png',
  iconRetinaUrl: '/stop-track.png',
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const App: React.FC = () => {
  return (
    // @ts-ignore
    <MapContainer center={stops[0].position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        // @ts-ignore
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stops.map((stop, idx) => (
        <Marker
          position={stop.position}
          key={idx}
          // Choose the icon based on the duration of the stay
          icon={stop.duration > 1 ? stopIcon : moveIcon}
        >
          <Popup>
            {`${idx+1}. ${stop.name}`}
          </Popup>
        </Marker>
      ))}
      <Polyline pathOptions={{ color: 'blue' }} positions={stops.map(stop => stop.position)} />
    </MapContainer>
  );
}

export default App;
