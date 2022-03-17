const http = require('http');
const fs = require('fs');

const products = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
);

const templateOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	'utf-8'
);

const templateCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	'utf-8'
);

const generateTemplate = (product, template) => {
	let result = template.replace(/{%IMAGE%}/g, product.image);
	result = result.replace(/{%PRODUCTNAME%}/g, product.productName);
	result = result.replace(/{%QUANTITY%}/g, product.quantity);
	result = result.replace(/{%PRICE%}/g, product.price);
	result = result.replace(/{%ID%}/g, product.id);
	return result;
};

const server = http.createServer((req, res) => {
	const { url } = req;
	if (url === '/') {
		res.writeHead(200);
		const result = products
			.map(product => generateTemplate(product, templateCard))
			.join('');
		const output = templateOverview.replace('{%PRODUCT_CARDS%}', result);
		res.end(output);
	}
});

server.listen(8000);
