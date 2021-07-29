/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Transaction = require('./Transaction');
const TransactionModel = require('../mongo/Transaction');
const Article = require('./Article');
const Trader = require('./Trader');
const CredentialsModel = require('../mongo/Credentials');
const TraderModel = require('../mongo/Trader');
const connection = require('../../lib/sequelize');
const Credentials = require('./Credentials');

const denormalizeTrader = (trader) => {
  console.log('1111111111111111111111111111111111111111111111111111111111111');
  Trader.findByPk(trader.id, {
    // include: [{ model: Credentials, as: 'credentials', attributes: ['id', 'token', 'secret', 'createdAt', 'updatedAt'] }],
  }).then((data) => {
    console.log('2222222222222222222222222222222222222222222222222222222222');
    const denormalizedTrader = data.toJSON();
    console.log('DENOOOR', denormalizedTrader);
    TraderModel.findOneAndReplace(
      { username: denormalizedTrader.username },
      denormalizedTrader,
      { upsert: true, new: true },
    )
      .then((denormalized) => console.log(`User ${denormalized.id} saved to mongo`));
  });
};
const denormalizeCredentials = (credentials) => {
  Credentials.findByPk(credentials.id)
    .then((data) => {
      const denormalizedCrendentials = data.toJSON();
      console.log('CREDENTIALS DENORMALIZED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', denormalizedCrendentials);
      CredentialsModel.findOneAndReplace(
        { token: denormalizedCrendentials.token },
        denormalizedCrendentials,
        { upsert: true, new: true },
      )
        .then((denormalized) => console.log(`Credentials ${denormalized.id} saved to mongo`));
    });
};

const denormalizeTransaction = (transaction) => {
  Transaction.findByPk(transaction.id)
    .then((data) => {
      const denormalizedTransaction = data.toJSON();
      console.log('TRANSACTION DENORMALIZED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', denormalizedTransaction);
      TransactionModel.findOneAndReplace(
        { id: denormalizedTransaction.dataValues.id },
        denormalizedTransaction,
        { upsert: true, new: true },
      )
        .then((denormalized) => console.log(`Credentials ${denormalized.id} saved to mongo`));
    });
};

async function init() {
  Credentials.addHook('afterUpdate', denormalizeCredentials);
  Credentials.addHook('afterCreate', denormalizeCredentials);
  Trader.addHook('afterUpdate', denormalizeTrader);
  Trader.addHook('afterCreate', denormalizeTrader);
  // Article.addHook('afterUpdate', (article) => denormalizeTrader(article.traderId));
  // Article.addHook('afterCreate', (article) => denormalizeTrader(article.traderId));
  // Transaction.addHook('afterUpdate', denormalizeTransaction);
  Transaction.addHook('afterCreate', denormalizeTransaction);

  // Order.hasOne(Transaction, {
  //   foreignKey: 'transactionId',
  // });
  // Transaction.belongsTo(Order);

  Trader.hasMany(Credentials);
  Credentials.belongsTo(Trader);

  // Article.belongsTo(Transaction, { as: 'multipleArticle' });
  // Transaction.hasMany(Article);

  // a mettre a true quand on change les entités
  await connection.sync({ force: true });
  console.log('Database sync');
}

init();

module.exports = {
  Article,
  Trader,
  Transaction,
  Credentials,
};
