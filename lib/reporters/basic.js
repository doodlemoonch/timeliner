const mean = require('lodash.meanby');

function basicReporter (data) {
  const timings = data.map((set) => {
    const start = set[0].message.message.params.timestamp;
    return {
      domcontentloaded: getEventTime('Page.domContentEventFired', set) - start,
      load: getEventTime('Page.loadEventFired', set) - start
    };
  });
  const results = {
    domcontentloaded: result(timings, 'domcontentloaded'),
    load: result(timings, 'load')
  };
  Object.defineProperty(results, 'chartable', {
    value: function () { return timings; },
    enum: false
  });
  return results;
}

function getEventTime (event, data) {
  const line = data.filter((line) => line.message.message.method === event)[0];
  return line && line.message.message.params.timestamp;
}

function result (timings, key) {
  return {
    mean: mean(timings, key),
    min: Math.min.apply(Math, timings.map(t => t[key])),
    max: Math.max.apply(Math, timings.map(t => t[key]))
  };
}

module.exports = basicReporter;
