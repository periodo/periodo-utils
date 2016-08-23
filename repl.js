"use strict";

const repl = require('repl')
    , get = require('simple-get')
    , makeDataset = require('./src/Dataset')

console.log('Downloading latest dataset to load into REPL...');

get('http://n2t.net/ark:/99152/p0d.json', (err, res) => {
  if (err) {
    throw new Error(err);
  }

  let body = ''

  res.on('data', chunk => {
    body += chunk;
  })

  res.on('end', () => {
    console.log('REPL ready! The global variable `dataset` refers to the PeriodO dataset.');
    startRepl(body)
  })
})

function startRepl(dataset) {
  console.log('');

  const r = repl.start('PeriodO> ');

  Object.defineProperty(r.context, 'dataset', {
    configurable: false,
    enumerable: true,
    value: makeDataset(dataset),
  })
}
