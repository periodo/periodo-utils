"use strict";

var Immutable = require('immutable');

function describe(periodization) {
  var _require = require('./terminus_seq');

  var minYear = _require.minYear;
  var maxYear = _require.maxYear;
  var definitions = periodization.get('definitions');
  var starts = definitions.map(function (def) {
    return def.get('start', Immutable.Map());
  });
  var stops = definitions.map(function (def) {
    return def.get('stop', Immutable.Map());
  });

  return {
    id: periodization.get('id'),
    source: require('./source').getDisplayTitle(periodization.get('source')),
    definitions: periodization.get('definitions', { size: 0 }).size,
    earliest: minYear(starts),
    latest: maxYear(stops)
  };
}

module.exports = { describe: describe };