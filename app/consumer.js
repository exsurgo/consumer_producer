"use strict";

var http = require('http');
var qs = require('querystring');
var evaluator = require('../libs/evaluator');

// Start server
var PORT = 3000;
http.createServer(consume).listen(PORT, '127.0.0.1');
console.log('Server running at http://localhost:' + PORT);

/**
 * Consume an incoming request with expression,
 * then calculate value and return response
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
function consume(req, res) {

  // Get expression from query string
  var expression = getExpression(req);
  console.log(req.method + ' Request: ' + req.url);

  // Require expression param
  if (!expression) sendBadRequest(res);

  else {

    // Evaluate expression
    var ev = new evaluator.Evaluator(expression);
    ev.evaluate();
    console.log(
        'Result of ' +
        ev.expression +
        ' = ' +
        ev.result
    );

    // Send response
    sendData(res, ev);

  }

}

/**
 * Get expression from request url
 * @param {IncomingMessage} req
 * @returns {string}
 */
function getExpression(req) {
  var url = req.url,
      parts = url.split('?');
  if (parts.length != 2) return null;
  var vals = qs.parse(parts[1]),
      expression = vals['expression'];
  return expression;
}

/**
 * Return a JSON data response
 * @param {ServerResponse} res
 * @param {Object} data
 */
function sendData(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  var str = JSON.stringify(data);
  console.log('Responding with ' + str);
  res.end(str);
}

/**
 * Send bad request error
 * @param {ServerResponse} res
 */
function sendBadRequest(res) {
  res.statusCode = 400;
  res.end('BAD REQUEST: Must include expression parameter');
}

