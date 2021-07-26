const https = require('https');
const fs = require('fs');

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
        // console.log('ici', parsedData.eur);
        const convert = {
          YEN: parsedData.eur.jpy,
          USD: parsedData.eur.usd,
        };
        const convertJson = JSON.stringify(convert);
        fs.writeFileSync('convertEuro.json', convertJson);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

function getDatafromFile() {
  const path = './convertEuro.json';
  euroData();
  try {
    if (fs.existsSync(path)) {
      fs.readFile(path, (err, data) => {
        if (err) throw err;
        const test = JSON.parse(data);
        console.log('here', test);
      });
    } else {
      console.log('doesn t exist');
      euroData();
      if (fs.existsSync(path)) {
        fs.readFile(path, (err, data) => {
          if (err) throw err;
          const test = JSON.parse(data);
          console.log('here', test);
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
}
getDatafromFile();
