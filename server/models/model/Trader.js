const { Schema } = require('mongoose');
const conn = require('../../lib/mongo');

const TraderSchema = new Schema({
  companyName: String,
  kbis: String,
  contactEmail: String,
  confirmationURL: String,
  cancelURL: String,
  currency: String,
});

const Trader = conn.model('Trader', TraderSchema);

module.exports = Trader;
