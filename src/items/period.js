"use strict";

const Immutable = require('immutable')


function getOriginalLabel(period) {
  if (!period.get('label') || !period.get('language')) return null;

  const value = period.get('label');
  const [ language, script ] = period.get('language').split('-');

  return Immutable.Map({ value, language, script });
}


function getAllLabels(period) {
  return Immutable.OrderedSet().withMutations(alternateLabels => {
    period
      .get('localizedLabels', Immutable.List())
      .forEach((labels, isoCodes) => {
        const [ language, script ] = isoCodes.split('-');
        labels.forEach(value => {
          alternateLabels.add(Immutable.Map({ value, language, script }));
        })
      })
  })
}


function getAlternateLabels(period) {
  return getAllLabels(period).remove(getOriginalLabel(period))
}

module.exports = {
  getOriginalLabel,
  getAllLabels,
  getAlternateLabels,
}
