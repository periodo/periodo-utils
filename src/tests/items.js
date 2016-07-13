"use strict";

const test = require('tape');
const Immutable = require('immutable');


test('Period terminus helpers', t => {
  t.plan(4);

  const helpers = require('../items/terminus');
  const termini = Immutable.fromJS(require('./fixtures/termini.json'));

  t.ok(Immutable.is(
    termini.map(helpers.getEarliestYear),
    Immutable.List([1200, 0, 501, -99, (new Date().getFullYear()), null])
  ), 'should find smallest year in terminus');

  t.ok(Immutable.is(
    termini.map(helpers.getLatestYear),
    Immutable.List([1200, 0, 600, -99, (new Date().getFullYear()), null])
  ), 'should find largest year in terminus');

  t.ok(Immutable.is(
    termini.map(helpers.hasISOValue),
    Immutable.List([true, true, true, true, true, false])
  ), 'should detect whether a terminus has any ISO value');

  t.ok(Immutable.is(
    termini.map(helpers.wasAutoparsed),
    Immutable.List([true, true, true, false, true, false])
  ), 'should detect whether a terminus was autoparsed or not');
});


test('Period terminus collection helpers', t => {
  t.plan(2);

  const helpers = require('../items/terminus_collection');
  const termini = Immutable.fromJS(require('./fixtures/termini.json'));

  t.deepEqual(
    helpers.maxYear(termini),
    { label: 'present', iso: (new Date().getFullYear()) },
    'should be able to find the latest terminus in a group'
  );


  t.deepEqual(
    helpers.minYear(termini),
    { label: 'one hundred bee cee', iso: -99 },
    'should be able to find the earliest terminus in a group'
  );
});


test('Periodization helpers', t => {
  t.plan(1);

  const helpers = require('../items/periodization');
  const data = Immutable.fromJS(require('./fixtures/period-collection.json'));

  t.deepEqual(helpers.describe(data.getIn(['periodCollections', 'p03377f'])), {
    id: 'p03377f',
    source: 'Ruiz, Arturo. The archaeology of the Iberians. 1998.',
    definitions: 2,
    earliest: {
      iso: -799,
      label: '800 B.C.'
    },
    latest: {
      iso: -205,
      label: '206 B.C.'
    }
  }, 'should describe a periodization');
});


test('Periodization collection helpers', t => {
  t.plan(1);

  const helpers = require('../items/periodization_collection');

  const data = Immutable.fromJS([
    { definitions: [ { spatialCoverageDescription: 'Middle East', spatialCoverage: [ 'a' ] }]},
    { definitions: [ { spatialCoverageDescription: 'Middle East', spatialCoverage: [ 'a' ] }]},
    { definitions: [ { spatialCoverageDescription: 'Middle East', spatialCoverage: [ 'a', 'b' ] }]},
    { definitions: [ { spatialCoverageDescription: 'Middle East 2', spatialCoverage: [ 'a' ] }]},
  ]);


  t.deepEqual(
    helpers.getSpatialCoverages(data).toJS(),
    [
      {
        label: 'Middle East',
        uses: [
          { count: 2, countries: ['a'] },
          { count: 1, countries: ['a', 'b']}
        ]
      },
      {
        label: 'Middle East 2',
        uses: [
          { count: 1, countries: ['a'] }
        ]
      }
    ], 'Should group spatial coverage collections');
});


test('Multi label periods', t => {
  t.plan(3)

  const helpers = require('../items/period');
  const multiLabelPeriod = Immutable.fromJS(require('./fixtures/multi-label-period.json'));

  t.ok(Immutable.is(
    helpers.getOriginalLabel(multiLabelPeriod),
    Immutable.fromJS({
      value: 'Progressive Era',
      language: 'eng',
      script: 'latn'
    }), 'should get original label from a period'));


  t.deepEqual(
    helpers.getAllLabels(multiLabelPeriod).toJS(),
    [
      { value: 'Progressive Era', language: 'eng', script: 'latn' },
      { value: 'The Progressive Era', language: 'eng', script: 'latn' },
      { value: 'Ère progressiste', language: 'fra', script: 'latn' },
    ], 'should get all labels from a period');


  t.ok(Immutable.is(
    helpers.getAlternateLabels(multiLabelPeriod),
    Immutable.OrderedSet([
      Immutable.Map({ value: 'The Progressive Era', language: 'eng', script: 'latn' }),
      Immutable.Map({ value: 'Ère progressiste', language: 'fra', script: 'latn' })
    ])), 'should get only alternate labels from a period')
});
