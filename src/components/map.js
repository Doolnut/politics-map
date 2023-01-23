import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
import { GeoJSON } from "react-leaflet";
import electorate_boundries from '../data/electorate_boundries/QldStateElectorateBoundries.geojson.json'
import { readXmlFile, getElectionElement, getDistrictData } from "./electionResults";
 
 var globalStoreElectionResults = window.globalStoreElectionResults;

  function returnStateBoundries() {

  return electorate_boundries;
}

function getElectorateName(feature, layer) {
  if (feature.properties) {
    layer.bindPopup(feature.properties.NAME);
    console.warn(feature.properties.NAME)
  }
}

function onEachFeature(feature, layer) {
  layer.on('mouseover', function (e) {
    getElectorateName(feature, layer);
    this.openPopup();

    // style
    this.setStyle({
      fillColor: '#eb4034',
      weight: 2,
      color: '#eb4034',
      fillOpacity: 0.7,
    });
  });
  layer.on('mouseout', function () {
    this.closePopup();
    // style
    this.setStyle({
      fillColor: '#3388ff',
      weight: 2,
      color: '#3388ff',
      fillOpacity: 0.2,
    });
  })
}

function wtfButtons() {
  console.log("Read XML Button Pressed")
  window.globalStoreElectionResults = readXmlFile();
  console.log("Hopefully printing the global var?")
  console.log(window.globalStoreElectionResults);
}

function printGlobal() {
  console.log("Hopefully printing the global var?")
  console.log(window.globalStoreElectionResults);
}

function GenerateMap() {
  return (
    <div className="mapTest">
      <MapContainer
        center={[-27.4504, 153.0801]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"        />
        <GeoJSON data={returnStateBoundries()} onEachFeature={onEachFeature} />
      </MapContainer>
      <br></br>
      <button onClick={wtfButtons}>Read XML Data</button> <button onClick={printGlobal}>Print the Global Variable</button>
    </div>
  );
}

export default GenerateMap;
