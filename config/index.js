// returns object with config info
// module.exports returns from file rather than return as from func
module.exports = {
  hash_rounds: 10,
  is_production: false,
  secrets: require('./secrets'),
};
