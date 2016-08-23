"use strict";

const Immutable = require('immutable')

function forEach(obj, cb) {
  Object.keys(obj).forEach(key => {
    cb(obj[key], key)
  });
}

function assignUtils(Record, utils) {
  forEach(utils, (fn, name) => {
    Record.prototype[name] = function () {
      return fn(this);
    }
  })
}


const NestedSource = Immutable.Record({
  partOf: null,
  locator: null,
}, 'NestedSource')


const Source = Immutable.Record({
  id: null,
  url: null,
  title: null,
  citation: null,
  dateAccessed: null,
  abstract: null,
  sameAs: null,
  editorialNote: null,

  contributors: null,
  creators: null,

  yearPublished: null,
}, 'Source')
assignUtils(Source, require('./items/source'))


const PeriodCollection = Immutable.Record({
  source: null,
  definitions: null,
}, 'PeriodCollection')
assignUtils(PeriodCollection, require('./items/period_collection'))


const Period = Immutable.Record({
  id: null,
  url: null,
  type: null,

  saemAs: null, // lol
  sameAs: null,
  source: null,

  label: null,
  language: null,
  localizedLabels: null,

  spatialCoverage: null,
  spatialCoverageDescription: null,

  start: null,
  stop: null,

  note: null,
  editorialNote: null,
}, 'Period')
assignUtils(Period, require('./items/period'))

function makeSource(source) {
  if (source.partOf) {
    // FIXME: Throw error on keys besides partOf/locator
    return new NestedSource({
      partOf: makeSource(source.partOf),
      locator: source.locator
    })
  } else {
    return source = new Source().merge(Immutable.fromJS(source))
  }
}


module.exports = function makeDataset(data) {
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }

  return Immutable.List().withMutations(collectionList => {
    forEach(data.periodCollections, collection => {
      const source = makeSource(collection.source)

      const definitions = Immutable.List().withMutations(periodList => {
        forEach(collection.definitions, period => {
          try {
            periodList.push(new Period().merge(Immutable.fromJS(period)))
          } catch (e) {
            console.log(period);
            throw e;
          }
        })
      })

      collectionList.push(new PeriodCollection({ source, definitions }));
    })
  })
}
