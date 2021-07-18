/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Transaction = require('./Transaction');
const User = require('./User');
const Article = require('./Article');
const Trader = require('./Trader');
const Order = require('./Order');
const TraderArticle = require('../mongo/TraderArticle');
const connection = require('../../lib/sequelize');

const denormalizeUser = (user) => {
  User.findByPk(user.id, {
    include: [{ model: Article, as: 'myArticles' }],
  // eslint-disable-next-line no-undef
  }).then((data) => new UserArticle({ _id: data.id, ...data.toJSON() }).save());
};

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

async function init() {
  Order.addHook('afterUpdate', denormalizeOrder);
  Order.addHook('afterCreate', denormalizeOrder);
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
