"use strict";

function formatContributorList(contributors) {
  var _require = require('./contributor');

  var formatName = _require.formatName;


  return contributors.size < 3 ? contributors.map(formatName).join(' and ') : formatName(contributors.first());
}

module.exports = {
  formatContributorList: formatContributorList
};