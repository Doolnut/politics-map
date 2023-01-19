import React from "react";
import electorate_boundries from "../data/election_results/qldResults2020.xml";
import { XMLParser, XMLBuilder } from "fast-xml-parser";

function getFirstPreferenceData() {
  const xmlData = electorate_boundries
  const parser = new XMLParser();

  const parsedXmlData = parser.parse(xmlData);
  const builder = new XMLBuilder();
  const xmlContent = builder.build(parsedXmlData);

  return;
}
