"use client";

import React, { useState } from "react";
import { MapPin, AlertTriangle } from "lucide-react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; 
// Lazy load Leaflet components to ,prevent SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
// City coordinates
const CityCoordinates: Record<City, [number, number]> = {
  Chennai: [13.078819, 80.252215],
  Delhi: [28.6139, 77.2090],
  Bangalore: [12.9716, 77.5946]
};

interface CityData {
  drainCovers: number;
  alertsToday: number;
  riskZones: number;
  avgBlockageRisk: "High" | "Medium" | "Low";
}
const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]
interface Alert {
  location: string;
  risk: "High" | "Medium" | "Low";
  time: string;
}
const dotIcon = L.divIcon({
  className: "custom-dot-icon",
  html: `<div class="w-3 h-3 bg-blue-600 rounded-full border border-white shadow"></div>`,
  iconSize: [22, 22],
  iconAnchor: [6, 6], // center the icon
});
const reddotIcon = L.divIcon({
  className: "custom-dot-icon",
  html: `<div class="w-3 h-3 bg-red-600 rounded-full animate-ping border border-white shadow"></div>`,
  iconSize: [22, 22],
  iconAnchor: [6, 6], // center the icon
});
type City = "Chennai" | "Delhi" | "Bangalore";

const SmartDrainDashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City>("Chennai");

  const cityData: Record<City, CityData> = {
    Chennai: { drainCovers: 13, alertsToday: 2, riskZones: 2, avgBlockageRisk: "Medium" },
    Delhi: { drainCovers: 180, alertsToday: 8, riskZones: 4, avgBlockageRisk: "Low" },
    Bangalore: { drainCovers: 220, alertsToday: 15, riskZones: 7, avgBlockageRisk: "High" },
  };

  const alerts: Alert[] = [
    { location: "Drain Node 1", risk: "High", time: "2h ago" },
    { location: "Drain Node 2 Drainage", risk: "High", time: "4h ago" },
    { location: "System Check", risk: "Low", time: "6h ago" },
  ];

  const currentCityData: CityData = cityData[selectedCity];
  const currentCityCoordinates = CityCoordinates[selectedCity];

  const getRiskColorClasses = (risk: "High" | "Medium" | "Low") => {
    switch (risk) {
      case "High": return "bg-red-200 text-red-800";
      case "Medium": return "bg-yellow-200 text-yellow-800";
      case "Low": return "bg-green-200 text-green-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen text-black bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Key Metrics */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Smart Drain Cover Dashboard</h1>
            <div className="flex items-center space-x-4">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value as City)}
                className="bg-white/20 text-white p-2 rounded"
              >
                {Object.keys(cityData).map((city) => (
                  <option key={city} value={city} className="text-black">
                    {city}
                  </option>
                ))}
              </select>
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Drain Covers", value: currentCityData.drainCovers },
              { label: "Alerts Today", value: currentCityData.alertsToday, className: "text-red-300" },
              { label: "High-Risk Zones", value: currentCityData.riskZones, className: "text-green-300" },
              { label: "Blockage Risk", value: currentCityData.avgBlockageRisk, className: "text-yellow-300" }
            ].map(({ label, value, className }) => (
              <div key={label} className="bg-white/20 p-4 rounded flex justify-between items-center">
                <span className="text-sm">{label}</span>
                <span className={`text-2xl font-bold ${className || ''}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Map and Alerts Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Map Column */}
          <div className="col-span-2 bg-gray-100 rounded-lg p-6">
            <MapContainer
              center={currentCityCoordinates}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
              className="rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; EmptyRoad'
              />

              {/* City Marker */}
              <Marker position={currentCityCoordinates} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker>
<Marker position={[13.080610, 80.264592]} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker>  <Marker position={[13.078228, 80.245237]} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker>  <Marker position={[13.081990, 80.275793]} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker>  <Marker position={[13.075591, 80.232137]} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker>  <Marker position={[13.07479712378701, 80.21958314055014]} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker>  <Marker position={[13.06991034594924, 80.24221626068056]} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker>  <Marker position={[13.064109282909248, 80.24347147654086]} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker>

<Marker position={[13.084564172989587, 80.25858365114283]} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker> <Marker position={[13.092899349671416, 80.2588264169999]} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker> <Marker position={[13.074840410968916, 80.24051278496829]} icon={reddotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker> <Marker position={[13.06251302076438, 80.24498876315954]} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker> <Marker position={[13.058256271099642, 80.24826610208775]} icon={dotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker> <Marker position={[13.082088608824678, 80.2334766898264]} icon={reddotIcon}>
  <Popup>{selectedCity}</Popup>
</Marker> 
    
            </MapContainer>
          </div>

          {/* Alerts Column */}
          <div className="col-span-1 bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-500" /> Recent Alerts
            </h2>
            {alerts.map((alert, index) => (
              <div 
                key={index} 
                className={`mb-3 p-3 rounded-md ${getRiskColorClasses(alert.risk)}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{alert.location}</span>
                  <span className="text-sm">{alert.time}</span>
                </div>
                <div className="text-sm mt-1">Risk: {alert.risk}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartDrainDashboard;