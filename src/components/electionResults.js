import React from "react";
import { XMLParser, XMLBuilder } from "fast-xml-parser";

/* Breaking this code into a lot of functions. Each function is meant to extract a single type of data from the election results XML. 
In all honesty, it could likely be condensed a lot. But it's a good way to learn. */

/* Current idea is that storing the read XML data in a global variable (see electionData var below) should mean we dont have to read the entire file multiple times
This does mean (I think) that it's storing 26mb of XML data in memory. I can't imagine that's a huge deal these days though */

var parsedXmlData;
var electionDataVar;

const options = {
  ignoreAttributes: false,
  // alwaysCreateTextNode: true
  attributeNamePrefix: "",
  attributesGroupName: "",
};

export function loadXmlResults() {
  console.log("Loading XML");
  var xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    "https://raw.githubusercontent.com/Doolnut/politics-map/main/src/data/election_results/qldResults2020.xml",
    true
  );
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log("Printing XML Response Text");
      console.log(this.response);
      const parser = new XMLParser(options);
      parsedXmlData = parser.parse(this.response);
      return parsedXmlData;
    }
  };
}

export function readXmlFile() {
  var xmlObj = loadXmlResults();
  console.log("xmlObj read, logging to console")
  console.log(xmlObj);
  return xmlObj;
}

export function getElectionElement(requestedElectionName, xmlData) {
  const xmlContent = xmlData;

  for (let x in xmlContent.ecq.election) {
    if (x.electionName == requestedElectionName) {
      console.log(x.electionName);
      electionDataVar = x;
    }
  }
}

export function getDistrictData(xmlData, districtNameVar) {

  console.log("Data Loaded, here it is:");
  console.log(electionDataVar);

  console.log("Looking for the district now...");
  /*   for (district in electionDataVar.districts) {
      if (district.districtName = findDistrictName) {
       const firstPreferenceResults = {winner: district.declaredCandidate.ballotName, firstPrefs: getFirstPreferencesFromElection(district)}
     }
  } */

  return;
}

/* 
function getFirstPreferencesFromElection(districtNameText) {
  var resultsFirstPreference;

  if (electionData == null) {
    getElectionElement("2020 State General Election")
  }

  var district = getDistrictData(districtNameText)

  for (countRound in district.countRound) {
    if (countRound.countName = "Official First Preference Count") {
      resultsFirstPreference = countRound.primaryVoteResults;
    }
  }

  return resultsFirstPreference;
}

function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index)
  {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

function TestXmlReading(name) {
  console.warn("Begin Search For Results")
  var firstPrefs = getFirstPreferencesFromElection(camelCase(name))
  console.log(firstPrefs)
} */
