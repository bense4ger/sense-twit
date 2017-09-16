const Twitter = require('twitter');
const querystring = require('querystring');
const processor = require('./status-processor');

let client;

const throwIfNotPresent = (key) => {
    throw new Error(`${key} not present`);
}

module.exports = {
    init() {
        client = new Twitter({
            consumer_key: process.env.SHT_CONSUMER_KEY || throwIfNotPresent('SHT_CONSUMER_KEY'),
  			consumer_secret: process.env.SHT_CONSUMER_SECRET || throwIfNotPresent('SHT_CONSUMER_SECRET'),
  			access_token_key: process.env.SHT_TOKEN_KEY || throwIfNotPresent('SHT_TOKEN_KEY'),
  			access_token_secret: process.env.SHT_TOKEN_SECRET || throwIfNotPresent('SHT_TOKEN_SECRET')
        });
    },
    searchTweets() {
        const query = '@digsb #colour';
        const encoded = querystring.stringify({q: query, 'result_type': 'recent'});
        
        return new Promise((resolve, reject) => {
            client.get(`https://api.twitter.com/1.1/search/tweets.json?${encoded}`, (err, result, response) => {
            	if (err) reject(err);
              
                const processed = processor.process(result.statuses || []);
                
                resolve(processed);
            });
        });
    }
}