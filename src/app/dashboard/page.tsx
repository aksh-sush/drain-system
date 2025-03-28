"use client";

import React, { useEffect, useState } from "react";
import { MapPin, AlertTriangle } from "lucide-react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { kml as toGeoJSON } from "@tmcw/togeojson";

// ✅ Lazy load Leaflet components to prevent SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const useMap = dynamic(() => import("react-leaflet").then((mod) => mod.useMap), { ssr: false });

const ChennaiCoordinates = [13.0827, 80.2707]; // Center of Chennai

const KMLLayer = ({ url }) => {
  const map = useMap();

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it's running on the client

    import("leaflet").then((L) => {
      fetch(url)
        .then((res) => res.text())
        .then((kmlText) => {
          const parser = new DOMParser();
          const kml = parser.parseFromString(kmlText, "text/xml");
          const geoJson = toGeoJSON(kml);

          if (!geoJson || !geoJson.features || geoJson.features.length === 0) {
            console.error("No valid features found in KML");
            return;
          }

          const kmlLayer = L.geoJSON(geoJson, {
            style: { color: "blue", weight: 2 },
          }).addTo(map);

          const bounds = kmlLayer.getBounds();
          if (bounds.isValid()) {
            map.fitBounds(bounds);
          } else {
            console.warn("KML bounds invalid, using default center.");
            map.setView(ChennaiCoordinates, 12);
          }
        })
        .catch((error) => console.error("Error loading KML:", error));
    });

    return () => {
      // Cleanup function to remove KML Layer
      if (map) {
        map.eachLayer((layer) => {
          if (layer instanceof L.Layer) {
            map.removeLayer(layer);
          }
        });
      }
    };
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

  const alerts = [
    { location: "Bandra Drain", risk: "High", time: "2h ago" },
    { location: "Andheri Drainage", risk: "Medium", time: "4h ago" },
    { location: "Powai Lake Outlet", risk: "Low", time: "6h ago" },
  ];

  const currentCityData = cityData[selectedCity];

  function getRiskColorClasses(risk) {
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
              <KMLLayer url="/kml/chennai_basin_drainage_macro_drains.kml" />

              {/* Chennai Marker */}
              <Marker position={ChennaiCoordinates}>
                <Popup>Chennai</Popup>
              </Marker>
            </MapContainer>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default SmartDrainDashboard;
