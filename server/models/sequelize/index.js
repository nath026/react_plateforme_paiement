/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Transaction = require('./Transaction');
const User = require('./User');
const Article = require('./Article');
const Trader = require('./Trader');
const Order = require('./Order');
const connection = require('../../lib/sequelize');

const denormalizeUser = (user) => {
  User.findByPk(user.id, {
    include: [{ model: Article, as: 'myArticles' }],
  // eslint-disable-next-line no-undef
  }).then((data) => new UserArticle({ _id: data.id, ...data.toJSON() }).save());
};
const denormalizeTrader = (trader) => {
  Trader.findByPk(trader.id).then((data) => data.toJSON()).save();
};

const denormalizeOrder = (order) => {
  Trader.findByPk(trader.id).then((data) => data.toJSON()).save();
};

async function init ()  
{
  User.addHook('afterUpdate', denormalizeUser);
  User.addHook('afterCreate', denormalizeUser);
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
  
  Article.belongsTo(Transaction, { as: "multipleArticle" }); 
  Transaction.hasMany(Article);

  await connection.sync({force: true});
  console.log('Database sync')
  
}

init()




module.exports = {
  User,
  Article,
  Trader,
  Order,
  Transaction,
};
