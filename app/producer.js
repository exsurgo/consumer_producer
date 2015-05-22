"use strict";

var http = require('http');

var PORT = 3000;

// Produce 30 expressions and send to Consumer
// Sever should handle concurrent connections
console.log('Producing expressions...');
var count = 30,
    current = 0,
    totalMS = 0;
for (var i = 0; i < count; i++) {
    produce();
}

/**
 * Produce an expression and send to consumer
 */
function produce() {

    var exp = createExpression(),
        startTime = new Date();

    var url = 'http://localhost:' +
              PORT +
              '?expression=' +
              encodeURIComponent(exp);
    console.log('GET Request: ' + url);

    // Send new expression via http get
    http.get(url, function(res) {

        // Success
        if (res.statusCode == 200) {

            // Get response from body
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {

                // Calculate time
                var timeMS = (new Date().getTime() - startTime.getTime());
                totalMS += timeMS;
                current += 1;

                // Log result
                var ev = JSON.parse(body);
                console.log(
                    'Result of ' +
                    ev.expression +
                    ' = ' +
                    ev.result +
                    ' (' + timeMS  + 'ms)'
                );

                // Log totals
                if (current == count) {
                    console.log(count + ' expressions evaluated in ' + totalMS + 'ms');
                }

            });

        }

        // Server Error
        else {
            console.log(
                'Error Occurred: ' +
                res.statusCode + ' (' +
                res.statusMessage + ')'
            );
        }

    })

    // General Error
    .on('error', function(e) {
        console.log('Error Occurred');
    });
}

/**
 * Randomly create an arithmetic expression
 * Purposely include potential division by 0
 * @returns {string}
 */
function createExpression() {
   var operators = ['+', '-', '*', '/'];
   return getRandom(0, 10) +
          operators[getRandom(0, 3)] +
          getRandom(0, 10);
}

/**
 * Generate a random int, inclusive of min/max
 * @param {int} min
 * @param {int} max
 * @returns {int}
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}