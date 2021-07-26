const fs = require('fs');
const Currency = require('../models/mongo/Currency');

const euroConvertData = fs.readFileSync('euroConvertData.json');
const euroConvert = JSON.parse(euroConvertData);
// db.city.insertMany(cities)  using mongo client
Currency.insertMany(euroConvert);
console.log(euroConvert);
