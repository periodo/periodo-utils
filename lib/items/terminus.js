"use strict";

var Immutable = require('immutable'),
    parseDate = require('../dates/parse');

function oneOf() {
  for (var _len = arguments.length, candidates = Array(_len), _key = 0; _key < _len; _key++) {
    candidates[_key] = arguments[_key];
  }

  for (var i = 0; i < candidates.length; i++) {
    if (candidates[i] !== undefined) {
      return candidates[i];
    }
  }
}

function asString(terminus) {
  if (terminus.hasIn(['in', 'earliestYear']) || terminus.hasIn(['in', 'latestYear'])) {
    var earliest = getEarliestYear(terminus),
        latest = getLatestYear(terminus);

    if (earliest === null) earliest = '(unknown)';
    if (latest === null) latest = '(unknown)';

    return 'range from ' + earliest + ' to ' + latest;
  } else {
    var value = getEarliestYear(terminus);

    return value === null ? null : '' + value;
  }
}

function getEarliestYear(terminus) {
  var year = void 0;

  year = oneOf(terminus.getIn(['in', 'year']), terminus.getIn(['in', 'earliestYear']), terminus.get('label') === 'present' ? new Date().getFullYear() : null);

  if (year === '') year = null;

  return year === null ? null : parseInt(year);
}

function getLatestYear(terminus) {
  var year = void 0;

  year = oneOf(terminus.getIn(['in', 'year']), terminus.getIn(['in', 'latestYear']), terminus.get('label') === 'present' ? new Date().getFullYear() : null);

  if (year === '') year = null;

  return year === null ? null : parseInt(year);
}

function hasISOValue(terminus) {
  return getEarliestYear(terminus) !== null || getLatestYear(terminus) !== null;
}

function wasAutoparsed(terminus) {
  // This was checking if the terminus is blank. If it was, it would return
  // that it's autoparsed- that's probably not the best thing to do.
  /*
  if (!terminus.get('label')) {
    return !hasISOValue(terminus)
  }
  */

  var parsed = parseDate(terminus.get('label'));

  return parsed ? Immutable.is(terminus, Immutable.fromJS(parsed).delete('_type')) : terminus.get('in') === null;
}

module.exports = {
  asString: asString,
  getEarliestYear: getEarliestYear,
  getLatestYear: getLatestYear,
  hasISOValue: hasISOValue,
  wasAutoparsed: wasAutoparsed
};