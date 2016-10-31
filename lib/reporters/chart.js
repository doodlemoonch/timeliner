const babar = require('babar');

function chart (data) {
  if (typeof data.chartable === 'function') {
    data = data.chartable();
  }
  const response = [];
  Object.keys(data[0]).forEach((key) => {
    response.push(babar(data.map((run, i) => {
      return [i, run[key]];
    }), { caption: key, height: 10 }));
  });
  return response;
}

module.exports = chart;
