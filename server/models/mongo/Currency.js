const { Schema } = require('mongoose');
const conn = require('../../lib/mongo');

const CurrencySchema = new Schema({
  date: {
    type: 'Date',
  },
  currency: {
    YEN: {
      type: 'Number',
    },
    USD: {
      type: 'Number',
    },
  },
});

const Currency = conn.model('Currency', CurrencySchema);
module.exports = Currency;
