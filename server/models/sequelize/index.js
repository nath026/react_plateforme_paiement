/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Transaction = require('./Transaction');
const Article = require('./Article');
const Trader = require('./Trader');
const Order = require('./Order');
const TraderArticle = require('../mongo/TraderArticle');
const connection = require('../../lib/sequelize');
const Credentials = require('./Credentials');

const denormalizeTrader = (trader) => {
  Trader.findByPk(trader.id, {
    include: [{ model: Article, as: 'myArticles', attributes: ['id', 'name', 'description', 'price', 'quantity', 'createdAt', 'updatedAt'] }],
  }).then((data) => {
    const denormalizedTrader = data.toJSON();
    console.log('DENOOOR', denormalizedTrader);
    TraderArticle.findOneAndReplace(
      { username: denormalizedTrader.username },
      denormalizedTrader,
      { upsert: true, new: true },
    )
      .then((traderArticle) => console.log(`User ${traderArticle.id} saved to mongo`));
  });
};
// const denormalizeTrader = (trader) => {
//   Trader.findByPk(trader.id).then((data) => data.toJSON()).save();
// };
const denormalizeOrder = (order) => {
  Order.findByPk(order.id).then((data) => data.toJSON()).save();
};

const denormalizeTransaction = (transaction) => {
  Transaction.findByPk(transaction.id).then((data) => data.toJSON()).save();
};

async function init() {
  Order.addHook('afterUpdate', denormalizeOrder);
  Order.addHook('afterCreate', denormalizeOrder);
  Trader.addHook('afterUpdate', denormalizeTrader);
  Trader.addHook('afterCreate', denormalizeTrader);
  Article.addHook('afterUpdate', (article) => denormalizeTrader(article.traderId));
  Article.addHook('afterCreate', (article) => denormalizeTrader(article.traderId));
  Transaction.addHook('afterUpdate', denormalizeTransaction);
  Transaction.addHook('afterCreate', denormalizeTransaction);

  Trader.MyArticles = Trader.hasMany(Article, {
    as: 'myArticles',
    foreignKey: 'traderId',
  });

  // relations
  Article.belongsTo(Trader, { as: 'trader' });
  Transaction.hasMany(Article);

  Order.hasOne(Transaction);
  Credentials.hasOne(Trader, {
    as: 'trader',
  });

  Article.belongsTo(Transaction, { as: 'multipleArticle' });
  Transaction.hasMany(Article);

  // a mettre a true quand on change les entités
  await connection.sync({ force: false });
  console.log('Database sync');
}

init();

module.exports = {
  Article,
  Order,
  Trader,
  Transaction,
  Credentials,
};
