const https = require('https');

function euroData() {
  const url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json';
  https.get(url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    // Any 2xx status code signals a successful response but
    // here we're only checking for 200.
    if ((statusCode > 300) || (statusCode < 200)) {
      error = new Error('Request Failed.\n'
                      + `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n'
                      + `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

// euroData();
// const test = [];

// const euroArray = () => {
//   request(url, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       const euro = JSON.parse(body);
//       console.log('Got a response: ', euro.eur.jpy);

//       test.push(euro.eur.jpy);
//       test.push(euro.eur.usd);
//       // console.log(test);
//       return test;
//     }
//     console.log('Got an error: ', error, ', status code: ', response.statusCode);
//   });
// };

// console.log(test);

module.exports = {
  euroData,
};
