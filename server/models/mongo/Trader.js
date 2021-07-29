const { Schema } = require('mongoose');
const conn = require('../../lib/mongo');

const TraderSchema = new Schema({
  lastname: String,
  firstname: String,
  username: String,
  credentials: Array,
  companyName: String,
  kbis: String,
  devise: String,
  contactEmail: String,
  password: String,
  confirmed: Boolean,
  role: String,
  confirmationURL: String,
  cancelUrL: String,
});

const Trader = conn.model('Trader', TraderSchema);

module.exports = Trader;
