"use strict";

const Immutable = require('immutable')

// Iterable<Authority> -> List<Period>
//
// Get all of the individual periods within the sequence of authorities.
function getPeriods(collections) {
  return collections.flatMap(c => c.get('definitions'))
}

function getSpatialCoverageCounts(periodList) {
  return periodList
    .countBy(period => period.get('spatialCoverage'))
    .map((count, countries) => Immutable.Map({
      count,
      countries: countries ? countries.toOrderedSet() : Immutable.OrderedSet()
    }))
    .toList()
}

// Iterable<Authority> -> Array<Object({ uses, label })>
function getSpatialCoverages(collections) {
  return getPeriods(collections)
    .groupBy(val => val.get('spatialCoverageDescription'))
    .filter((val, key) => !!key)
    .map(getSpatialCoverageCounts)
    .map((uses, label) => Immutable.Map({ uses, label }))
    .toList()
}

module.exports = {
  getPeriods,
  getSpatialCoverages,
  getSpatialCoverageCounts,
}
