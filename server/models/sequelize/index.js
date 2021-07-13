/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const User = require('./User');
const Article = require('./Article');
const Trader = require('./Trader');
const connection = require('../../lib/sequelize');

const denormalizeUser = (user) => {
  User.findByPk(user.id, {
    include: [{ model: Article, as: 'myArticles' }],
  // eslint-disable-next-line no-undef
  }).then((data) => new UserArticle({ _id: data.id, ...data.toJSON() }).save());
};
const denormalizeTrader = (trader) => {
  Trader.findByPk(trader.id).then((data) => data.toJSON()).save(); //à revoir
};
User.addHook('afterUpdate', denormalizeUser);
User.addHook('afterCreate', denormalizeUser);
Trader.addHook('afterUpdate', denormalizeTrader);
Trader.addHook('afterCreate', denormalizeTrader);
Article.addHook('afterUpdate', (article) => denormalizeUser(article.author));
Article.addHook('afterCreate', (article) => denormalizeUser(article.author));

connection.sync().then((_) => console.log('Database synced'));

module.exports = {
  User,
  Article,
  Trader,
};
