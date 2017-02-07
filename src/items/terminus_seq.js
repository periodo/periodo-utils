"use strict";

const { getEarliestYear, getLatestYear } = require('./terminus')

// Iterable<Terminus> -> Object({ label: String, iso: Int }) or Null
function maxYear(termini) {
  const latest = termini.maxBy(getLatestYear) || null

  return latest && {
    label: latest.get('label'),
    iso: getLatestYear(latest)
  }
}

// Iterable<Terminus> -> Object({ label: String, iso: Int }) or Null
function minYear(termini) {
  const earliest = termini.minBy(getEarliestYear) || null

  return earliest && {
    label: earliest.get('label'),
    iso: getEarliestYear(earliest)
  }
}

module.exports = {
  maxYear,
  minYear,
}
