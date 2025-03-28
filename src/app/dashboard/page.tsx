"use client";
import React, { useEffect, useState } from "react";
import { MapPin, AlertTriangle } from "lucide-react";
import dynamic from "next/dynamic"; // ✅ Next.js dynamic import
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet-kml"; // ✅ Support for KML files
import { kml as toGeoJSON } from "@tmcw/togeojson";

// Extend Leaflet's type definition to include KML
declare module "leaflet" {
  export function KML(kml: Document): LayerGroup;
}

// ✅ Lazy load Leaflet components to prevent SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
import { useMap } from "react-leaflet";

const ChennaiCoordinates = [13.0827, 80.2707]; // Center of Chennai
const kmlFilePath = "/kml/chennai_basin_drainage_macro_drains.kml"; // ✅ Ensure this is placed in /public/kml/

const KMLLayer = ({url="chennai_basin_drainage_macro_drains.kml"}) => {
  const map = useMap();

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
  
        // Convert KML to GeoJSON
        const geoJson = toGeoJSON(kml);
  
        // Create a GeoJSON Layer
        const kmlLayer = L.geoJSON(geoJson);
  
        // Add to map
        map.addLayer(kmlLayer);
      })
      .catch((error) => console.error("Error loading KML:", error));
  }, [url, map]);
  

  return null;
};

const SmartDrainDashboard = () => {
  const [selectedCity, setSelectedCity] = useState("Chennai");

  const cityData = {
    Chennai: { drainCovers: 250, alertsToday: 12, riskZones: 6, avgBlockageRisk: "Medium" },
    Delhi: { drainCovers: 180, alertsToday: 8, riskZones: 4, avgBlockageRisk: "Low" },
    Bangalore: { drainCovers: 220, alertsToday: 15, riskZones: 7, avgBlockageRisk: "High" },
  };


  const currentCityData = cityData[selectedCity];
  

  interface Alert {
    location: string;
    risk: "High" | "Medium" | "Low";
    time: string;
  }

  function getRiskColorClasses(risk: Alert["risk"]): string {
    switch (risk) {
      case "High":
        return "bg-red-200 text-red-800";
      case "Medium":
        return "bg-yellow-200 text-yellow-800";
      case "Low":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  }

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
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-white/20 text-white p-2 rounded"
              >
                {Object.keys(cityData).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/20 p-4 rounded flex justify-between items-center">
              <span className="text-sm">Drain Covers</span>
              <span className="text-2xl font-bold">{currentCityData.drainCovers}</span>
            </div>

            <div className="bg-white/20 p-4 rounded flex justify-between items-center">
              <span className="text-sm">Alerts Today</span>
              <span className="text-2xl font-bold text-red-300">{currentCityData.alertsToday}</span>
            </div>

            <div className="bg-white/20 p-4 rounded flex justify-between items-center">
              <span className="text-sm">High-Risk Zones</span>
              <span className="text-2xl font-bold text-green-300">{currentCityData.riskZones}</span>
            </div>

            <div className="bg-white/20 p-4 rounded flex justify-between items-center">
              <span className="text-sm">Blockage Risk</span>
              <span className="text-2xl font-bold text-yellow-300">{currentCityData.avgBlockageRisk}</span>
            </div>
          </div>
        </div>

        {/* Map and Alerts Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Map Column */}
          <div className="col-span-2 bg-gray-100 rounded-lg p-6 flex items-center justify-center">
            <MapContainer
              center={ChennaiCoordinates}
              zoom={12}
              style={{ height: "300px", width: "100%" }}
              className="rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* KML Overlay for Drainage System */}
              <KMLLayer url={kmlFilePath} />

              {/* Chennai Marker */}
              <Marker position={ChennaiCoordinates}>
                <Popup>Chennai</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Recent Alerts Column */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Alerts</h2>
              <AlertTriangle className="h-6 w-6 text-purple-500" />
            </div>
            <div className="space-y-3">
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartDrainDashboard;
