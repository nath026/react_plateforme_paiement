const { Schema } = require('mongoose');
const conn = require('../../lib/mongo');

const CredentialSchema = new Schema({
  token: String,
  secret: String,

});

const Credential = conn.model('Credential', CredentialSchema);

module.exports = Credential;
