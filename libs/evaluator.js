"use strict";

/**
 * Used to evaluate an expression
 * @class
 * @param {string} expression - arithmetic expression
 * @property {number} result
 * @property {boolean} failed
 */
function Evaluator(expression) {
    this.expression = expression;
    this.failed = false;
    this.result = null;
}

/**
 * Evaluate an expression
 * @returns {number}
 */
Evaluator.prototype.evaluate = function () {

    // Only allow 0-9, +, -, *, \, (, )
    var unsafe = /^[\.0-9\-\+\*\/\(\) ]*$/;

    // Limit expression size to 50
    if (this.expression.length > 50) {
        this.failed = true;
        this.result = null;
    }

    // Ensure valid expression by only allowing numbers
    // and arithmetic operators. This will allow for
    // safe evaluation of a range of expressions
    else if (!unsafe.test(this.expression)) {
        this.failed = true;
        this.result = null;
    }

    // Try running expression
    // It could still fail however, e.g division by 0
    // Evaluator is safer if ran within Function
    // could potentially use vm.runInContext as well
    else {
        try {
            var func = new Function('return ' + this.expression);
            var result = func.call(null);
            if (isNaN(result) || result == Infinity) {
                this.failed = true;
                this.result = null;
            }
            else {
                this.failed = false;
                this.result = result;
            }
        }
        catch(ex) {
            this.failed = true;
            this.result = null;
        }
    }

};

/**
 * Convert to JSON
 * @return {string}
 */
Evaluator.prototype.toJson = function() {
    return JSON.stringify(this);
};

exports.Evaluator = Evaluator;