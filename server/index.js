const express = require("express");
const http = require('http');
const url = require('url')

const app = express();

app.get('/:host*', function (request, response, next) {

	var proxyurl = url.parse(request.url);
	var path = request.params[0];
	if (!!proxyurl.search) {
		path += proxyurl.search;
	}
console.log("path", path)
	console.log("equest.params.host", request.params.host)

	http.get({
		host: request.params.host,
		path: path,
		headers: {}
	}, function(res) {
		var body = '';

		res.on('data', function(chunk) {
			body += chunk;
		});

		res.on('end', function() {
			response.end(body);
		});
	}).on('error', function(e) {
		console.log("Got error: ", e);
	});
});

app.listen(3001);
