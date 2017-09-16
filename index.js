const CronJob = require('cron').CronJob;
const twitter = require('./lib/twitter');
const display = require('./lib/display');

twitter.init();
display.clear();

const main = () => {
	twitter.searchTweets()
	.then((result) => {
    	console.dir(result);
    	for(let i = 0; i < result.length; ++i) {
            setTimeout(() => {
                display.go(result[i]);
            }, 1500 * i)
        }
	})
	.catch((err) => { 
		console.dir(err);
	});    
}

const cronJob = new CronJob({
    cronTime: '* */5 * * * *',
    onTick: () => {
        console.log('Ticking...')
        main();
    },
    start: false
});
    
console.log('Starting...')
cronJob.start();