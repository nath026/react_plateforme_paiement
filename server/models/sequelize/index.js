/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Transaction = require('./Transaction');
const User = require('./User');
const Article = require('./Article');
const Trader = require('./Trader');
const Order = require('./Order');
const TraderArticle = require('../model/TraderArticle');
const UserArticle = require('../model/UserArticle');
const connection = require('../../lib/sequelize');

const denormalizeTrader = (trader) => {
  Trader.findByPk(trader.id, {
    include: [{ model: Article, attributes: ['id', 'name', 'description', 'price', 'quantity', 'createdAt', 'updatedAt'] }],
  }).then((data) => {
    const denormalizedTrader = data.toJSON();
    denormalizedTrader._id = denormalizedTrader.id;
    TraderArticle.findOneAndReplace(
      { _id: denormalizedTrader.id },
      denormalizedTrader,
      { upsert: true, new: true },
    ).then((data) => console.log(`User ${data._id} saved to mongo`));
  });
};

const denormalizeOrder = (order) => {
  Trader.findByPk(trader.id).then((data) => data.toJSON()).save();
};

async function init() {
  Trader.addHook('afterUpdate', denormalizeTrader);
  Trader.addHook('afterCreate', denormalizeTrader);
  Article.addHook('afterUpdate', (article) => denormalizeUser(article.author));
  Article.addHook('afterCreate', (article) => denormalizeUser(article.author));

  Trader.MyArticles = Trader.hasMany(Article, {
    as: 'myArticles',
    foreignKey: 'traderID',
  });

  // relations
  Article.belongsTo(Trader, { as: 'trader' });
  Transaction.hasMany(Article);

  Order.hasOne(Transaction);

  Article.belongsTo(Transaction, { as: 'multipleArticle' });
  Transaction.hasMany(Article);

  await connection.sync({ force: true });
  console.log('Database sync');
}

init();

module.exports = {
  User,
  Article,
  Trader,
  Order,
  Transaction,
};
