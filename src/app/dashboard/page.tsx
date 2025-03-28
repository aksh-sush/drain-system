"use client"
import React, { useState } from 'react';

const SmartDrainDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  const cityData = {
    'Mumbai': {
      drainCovers: 250,
      alertsToday: 12,
      riskZones: 6,
      avgBlockageRisk: 'Medium'
    },
    'Delhi': {
      drainCovers: 180,
      alertsToday: 8,
      riskZones: 4,
      avgBlockageRisk: 'Low'
    },
    'Bangalore': {
      drainCovers: 220,
      alertsToday: 15,
      riskZones: 7,
      avgBlockageRisk: 'High'
    }
  };


  const currentCityData = cityData[selectedCity];
  

  return (
    <div className="min-h-screen text-black bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Smart Drain Cover Dashboard</h1>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-white/20 text-white p-2 rounded"
              >
                {Object.keys(cityData).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-3xl font-bold text-blue-600">
                {currentCityData.drainCovers}
              </span>
            </div>
            <p className="text-gray-500 mt-2">Total Drain Covers</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-3xl font-bold text-red-600">
                {currentCityData.alertsToday}
              </span>
            </div>
            <p className="text-gray-500 mt-2">Alerts Today</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <span className="text-3xl font-bold text-green-600">
                {currentCityData.riskZones}
              </span>
            </div>
            <p className="text-gray-500 mt-2">High-Risk Zones</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-3xl font-bold text-yellow-600">
                {currentCityData.avgBlockageRisk}
              </span>
            </div>
            <p className="text-gray-500 mt-2">Blockage Risk</p>
          </div>
        </div>

        {/* Recent Alerts & Risk Zones */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Alerts</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h16M4 4h16v12H4V4z" />
              </svg>
            </div>
            <div className="space-y-3">
              {[
                { location: 'Bandra Drain', risk: 'High', time: '2h ago' },
                { location: 'Andheri Drainage', risk: 'Medium', time: '4h ago' },
                { location: 'Powai Lake Outlet', risk: 'Low', time: '6h ago' }
              ].map((alert, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{alert.location}</p>
                    <p className="text-sm text-gray-500">{alert.time}</p>
                  </div>
                  <span 
                    className={`px-3 py-1 rounded-full text-xs ${
                      alert.risk === 'High' ? 'bg-red-200 text-red-800' :
                      alert.risk === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'
                    }`}
                  >
                    {alert.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">High-Risk Drainage Zones</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <ul className="space-y-3">
              {[
                'Bandra West',
                'Andheri East',
                'Lower Parel',
                'Worli',
                'Dadar'
              ].map((zone, index) => (
                <li 
                  key={index} 
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                >
                  <span>{zone}</span>
                  <span className="text-red-600 font-semibold">Critical</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartDrainDashboard;