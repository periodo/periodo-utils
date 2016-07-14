"use strict";

const Immutable = require('immutable')

function getDisplayTitle(source) {
  const { formatContributorList } = require('./contributor_seq')
      , creators = formatContributorList(getCreators(source))
      , year = getYearPublished(source)
      , title = getTitle(source)

  let ret = ''

  if (creators) {
    ret += creators;
    if (ret.slice(-1) !== '.') {
      ret += '. ';
    } else {
      ret += ' ';
    }
  }

  ret += title;

  if (ret.slice(-1) !== '.') {
    ret += '.'
  }

  if (year) {
    ret += ' ' + year + '.';
  }

  return ret;
}

function getCreators(source) {
  return (
    source.get('creators') ||
    source.getIn(['partOf', 'creators']) ||
    Immutable.List()
  );
}

function getTitle(source) {
  return (
    source.get('title') ||
    source.get('citation') ||
    source.getIn(['partOf', 'title']) ||
    source.getIn(['partOf', 'citation'])
  )
}

function getYearPublished(source) {
  return (
    source.get('yearPublished') ||
    source.getIn(['partof', 'yearPublished']) ||
    null
  )
}

module.exports = {
  getDisplayTitle,
  getCreators,
  getTitle,
  getYearPublished,
}
