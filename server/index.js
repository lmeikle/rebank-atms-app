const express = require("express");
const url = require('url');
const request = require('request');

const app = express();

/**
 * Proxy api calls through here to avoid CORS issues locally
 */
app.get('/api', function(req, res) {
	let url_parts = url.parse(req.url, true);
	let query = url_parts.query;
	request(query.url).pipe(res);
});

app.listen(3001);
