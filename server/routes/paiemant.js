const { Router } = require('express');
const fetch = require('node-fetch');

const router = Router();

router
  .get('/', (req, res) => {
    res.render('payment', {
      items: [{ title: 'spoon', quantity: '1' }],
    });
  })
  .post('/', async (req, res) => {
    await fetch('http://psp:3000/psp', { method: 'POST' });
    res.send('accepted macha');
  });

module.exports = router;
