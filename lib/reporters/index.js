module.exports = {
  basic: require('./basic'),
  json: (data) => JSON.stringify(data),
  chart: require('./chart')
};
