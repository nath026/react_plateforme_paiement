/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const User = require('./User');
const Article = require('./Article');
const Trader = require('./Trader');
const TraderArticle = require('../model/TraderArticle');
const UserArticle = require('../model/UserArticle');
const connection = require('../../lib/sequelize');

// const denormalizeUser = (user) => {
//   User.findByPk(user.id, {
//     include: [{ model: Article, attributes: ['id', 'title', 'createdAt'] }],
//   }).then((data) => {
//     const denormalizedUser = data.toJSON();
//     denormalizedUser._id = denormalizedUser.id;
//     UserArticle.findOneAndReplace(
//       { _id: denormalizedUser.id },
//       denormalizedUser,
//       { upsert: true, new: true },
//     ).then((data) => console.log(`User ${data._id} saved to mongo`));
//   });
// };

// const denormalizeTrader = (trader) => {
//   Trader.findByPk(trader.id).then((data) => data.toJSON()).save();
// };

const denormalizeTradertoArticle = (trader) => {
  Trader.findByPk(trader.id, {
    include: [{ model: Article, as: 'myArticles' }],
  }).then((data) => new TraderArticle({ _id: data.id, ...data.toJSON() }));
};

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

// User.addHook('afterUpdate', denormalizeUser);
// User.addHook('afterCreate', denormalizeUser);
Trader.addHook('afterUpdate', denormalizeTrader);
Trader.addHook('afterCreate', denormalizeTrader);
Article.addHook('afterUpdate', (article) => denormalizeTradertoArticle(article.author));
Article.addHook('afterCreate', (article) => denormalizeTradertoArticle(article.author));

connection.sync().then((_) => console.log('Database synced'));

module.exports = {
  User,
  Article,
  Trader,
};
