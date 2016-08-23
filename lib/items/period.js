"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Immutable = require('immutable');

function getOriginalLabel(period) {
  if (!period.get('label') || !period.get('language')) return null;

  var value = period.get('label');

  var _period$get$split = period.get('language').split('-');

  var _period$get$split2 = _slicedToArray(_period$get$split, 2);

  var language = _period$get$split2[0];
  var script = _period$get$split2[1];


  return Immutable.Map({ value: value, language: language, script: script });
}

function getAllLabels(period) {
  return Immutable.OrderedSet().withMutations(function (alternateLabels) {
    period.get('localizedLabels', Immutable.List()).forEach(function (labels, isoCodes) {
      var _isoCodes$split = isoCodes.split('-');

      var _isoCodes$split2 = _slicedToArray(_isoCodes$split, 2);

      var language = _isoCodes$split2[0];
      var script = _isoCodes$split2[1];

      labels.forEach(function (value) {
        alternateLabels.add(Immutable.Map({ value: value, language: language, script: script }));
      });
    });
  });
}

function getAlternateLabels(period) {
  return getAllLabels(period).remove(getOriginalLabel(period));
}

module.exports = {
  getOriginalLabel: getOriginalLabel,
  getAllLabels: getAllLabels,
  getAlternateLabels: getAlternateLabels
};