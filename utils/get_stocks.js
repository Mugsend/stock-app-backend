const axios = require('axios');
const apiKey = '4Cuxv3cRTmtABa8pArtOx6qsecKONpEt';
const limit = 20;
const date = '2023-01-09';
const stocks = [];
module.exports = async (apiKey) => {
	try {
		console.log('Fetching stocks...');
		const apiUrl = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true&queryCount=${limit}&apiKey=${apiKey}`;
		const response = await axios.get(apiUrl);
		for (i = 0; i < limit; i++) {
			stocks.push({
				stock: response.data.results[i].T,
				openPrice: response.data.results[i].o,
			});
		}
	} catch (error) {
		console.error('Error making API request:', error.message);
	}

	return stocks;
};
