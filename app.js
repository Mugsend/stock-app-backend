const express = require('express');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();
const apiKey = process.env.API_KEY;
const getStocks = require('./utils/get_stocks.js');
const updateStocks = require('./utils/update_stocks.js');
const app = express();
const port = 3000;

app.use(cors());

app.get('/api/stocks', (req, res) => {
	fs.readFile('stocks.json', 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading file:', err);
			res.status(500).send('Internal Server Error');
			return;
		}
		try {
			const { n } = req.query;
			const stocks = JSON.parse(data);
			res.json(stocks.slice(0, n));
		} catch (parseErr) {
			console.error('Error parsing JSON:', parseErr);
			res.status(500).send('Internal Server Error');
		}
	});
});

app.listen(port, async () => {
	const stocks = await getStocks(apiKey);
	updateStocks(stocks);
	console.log(`Server listening on port ${port}`);
});
