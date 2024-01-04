const fs = require('fs');

const minTime = 1000;
const maxTime = 5000;
const limit = 20;
const filePath = 'stocks.json';

module.exports = (stocks) => {
	console.log('Polling started...');
	let interval = minTime;
	for (const stock of stocks) {
		setInterval(() => assignRandomStockPrice(stock, stocks), interval);
		interval = interval + (maxTime - minTime) / limit;
	}
	function assignRandomStockPrice(stock, stocks) {
		stock.price = stock.openPrice + Math.random();
		const jsonData = JSON.stringify(stocks, null, 2);
		fs.writeFile(filePath, jsonData, (writeErr) => {
			if (writeErr) {
				console.error('Error writing to file:', writeErr);
			}
		});
	}
};
