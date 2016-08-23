"use strict";

var _require = require('./terminus');

var getEarliestYear = _require.getEarliestYear;
var getLatestYear = _require.getLatestYear;


function maxYear(termini) {
  var latest = termini.maxBy(getLatestYear) || null;

  return latest && {
    label: latest.get('label'),
    iso: getLatestYear(latest)
  };
}

function minYear(termini) {
  var earliest = termini.minBy(getEarliestYear) || null;

  return earliest && {
    label: earliest.get('label'),
    iso: getEarliestYear(earliest)
  };
}

module.exports = {
  maxYear: maxYear,
  minYear: minYear
};