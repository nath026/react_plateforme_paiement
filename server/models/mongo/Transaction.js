const { Schema } = require('mongoose');
// const { INTEGER } = require('sequelize/types');
const conn = require('../../lib/mongo');

const TransactionSchema = new Schema({
  firstName: String,
  lastName: String,
  price: Number,
  addressFacturation: String,
  addressLivraison: Array,
  date: Date,
  currency: String,
  state: String,
});

const Transaction = conn.model('Transaction', TransactionSchema);

module.exports = Transaction;
