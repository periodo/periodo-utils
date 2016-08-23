"use strict";

const Immutable = require('immutable')

function describe(periodization) {
  const { minYear, maxYear } = require('./terminus_seq')
      , definitions = periodization.get('definitions')
      , starts = definitions.map(def => def.get('start', Immutable.Map()))
      , stops = definitions.map(def => def.get('stop', Immutable.Map()))

  return {
    id: periodization.get('id'),
    source: require('./source').getDisplayTitle(periodization.get('source')),
    definitions: periodization.get('definitions', { size: 0 }).size,
    earliest: minYear(starts),
    latest: maxYear(stops)
  }
}

module.exports = { describe }
