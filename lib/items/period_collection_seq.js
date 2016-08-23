"use strict";

var Immutable = require('immutable');

function getSpatialCoverageCounts(periodList) {
  return periodList.countBy(function (period) {
    return period.get('spatialCoverage');
  }).map(function (count, countries) {
    return Immutable.Map({
      count: count,
      countries: countries ? countries.toOrderedSet() : Immutable.OrderedSet()
    });
  }).toList();
}

function getSpatialCoverages(collections) {
  return collections.flatMap(function (val) {
    return val.get('definitions');
  }).groupBy(function (val) {
    return val.get('spatialCoverageDescription');
  }).filter(function (val, key) {
    return !!key;
  }).map(getSpatialCoverageCounts).map(function (uses, label) {
    return Immutable.Map({ uses: uses, label: label });
  }).toList();
}

module.exports = {
  getSpatialCoverages: getSpatialCoverages,
  getSpatialCoverageCounts: getSpatialCoverageCounts
};