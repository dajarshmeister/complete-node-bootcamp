const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	'utf-8'
);
const tempCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	'utf-8'
);
const tempProduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	const { pathname, searchParams } = new URL(req.url, 'http://127.0.0.1/');
	const id = searchParams.get('id');

	// Overview page
	if (pathname === '/' || pathname === '/overview') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
		const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
		res.end(output);

		// Product page
	} else if (pathname === '/product') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		const product = dataObj[id];
		const output = replaceTemplate(tempProduct, product);
		res.end(output);

		// API page
	} else if (pathname === '/api') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(data);

		// Not Found
	} else {
		res.writeHead(404, {
			'Content-Type': 'text/html',
			'my-own-header': 'hello world',
		});
		res.end('<h1>This page cannot be found</h1>');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Listening to requests on port 8000');
});
