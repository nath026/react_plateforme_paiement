/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Transaction = require('./Transaction');
const User = require('./User');
const Article = require('./Article');
const Trader = require('./Trader');
const Order = require('./Order');
const Item = require('./Item');
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

const denormalizeItem = (item) => {
  Item.findByPk(item.id).then((data) => data.toJSON()).save();
};

async function init() {
  Order.addHook('afterUpdate', denormalizeOrder);
  Order.addHook('afterCreate', denormalizeOrder);
  Item.addHook('afterUpdate', denormalizeItem);
  Item.addHook('afterCreate', denormalizeItem);
  Trader.addHook('afterUpdate', denormalizeTrader);
  Trader.addHook('afterCreate', denormalizeTrader);
  Article.addHook('afterUpdate', (article) => denormalizeUser(article.author));
  Article.addHook('afterCreate', (article) => denormalizeUser(article.author));

  // One to many (Article to trader)
  Trader.MyArticles = Trader.hasMany(Article, {
    as: 'myArticles',
    foreignKey: 'traderID',
  });
  Article.belongsTo(Trader, { as: 'trader' });

  // Many To Many (Card et Article)
  Order.belongsToMany(Article, { as: 'items', through: 'ArticlesOrder' });
  Article.belongsToMany(Order, { as: 'cartId', through: 'ArticlesOrder' });
  Article.belongsToMany(Item, { as: 'productId', through: 'ArticlesItem'})
  Item.belongsToMany(Article, { as: 'articleItemId', through: 'ArticlesItem'})

  // One to one ( order has one transaction, a transaction has one order)
  Order.hasOne(Transaction);

  Order.belongsToMany(Item, {as: 'itemss', through: 'OrdersItem'});
  Item.belongsToMany(Order, {as: 'orders', through: 'OrdersItem'});

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
  Item,
};
