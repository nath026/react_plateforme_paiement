/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Customer = require('./Customer');
const Article = require('../model/Article');
const connection = require('../../lib/sequelize');

const denormalizeCustomer = (customer) => {
  Customer.findByPk(customer.id, {
    include: [{ model: Article, as: 'myArticles' }],
  // eslint-disable-next-line no-undef
  }).then((data) => new UserArticle({ _id: data.id, ...data.toJSON() }).save());
};
Customer.addHook('afterUpdate', denormalizeCustomer);
Customer.addHook('afterCreate', denormalizeCustomer);
Article.addHook('afterUpdate', (article) => denormalizeCustomer(article.author));
Article.addHook('afterCreate', (article) => denormalizeCustomer(article.author));

connection.sync().then((_) => console.log('Database synced'));

module.exports = {
  Customer,
  Article,
};
