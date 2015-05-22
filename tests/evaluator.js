var test = require('unit.js');
var ev = require('../libs/evaluator');

// Using Unit.js and Mocha for testing
// Could also use Jasmine for runner
// Only testing evaluator for brevity

/*

 Mocha results:

 Evaluator class
    Basic Arithmetic
        ✓ should return correct result of basic expressions
    Complex Expressions
        ✓ should return correct result of complex expressions
    Failure
        ✓ should return null result and failed is true

    3 passing (11ms)

*/

var val, instance;

describe('Evaluator class', function(){

    describe('Basic Arithmetic', function(){
        it('should return correct result of basic expressions', function() {
            
            val = 1 + 1;
            instance =  new ev.Evaluator('1 + 1');
            instance.evaluate();
            test.assert(instance.result == val);
            test.assert(instance.failed == false);

            val = 4 - 2;
            instance =  new ev.Evaluator('4 - 2');
            instance.evaluate();
            test.assert(instance.result == val);
            test.assert(instance.failed == false);

            val = 2 * 3;
            instance =  new ev.Evaluator('2 * 3');
            instance.evaluate();
            test.assert(instance.result == val);
            test.assert(instance.failed == false);
            
        });
    });

    describe('Complex Expressions', function(){
        it('should return correct result of complex expressions', function() {

            val = (43 * 3) / 23 * (5 + 45);
            instance =  new ev.Evaluator('(43 * 3) / 23 * (5 + 45)');
            instance.evaluate();
            test.assert(instance.result == val);
            test.assert(instance.failed == false);

            val = (100 / 456) * (45 * 456 / 345);
            instance =  new ev.Evaluator('(100 / 456) * (45 * 456 / 345)');
            instance.evaluate();
            test.assert(instance.result == val);
            test.assert(instance.failed == false);

        });
    });

    describe('Failure', function(){
        it('should return null result and failed is true', function() {

            // Division by zero
            instance =  new ev.Evaluator('1 / 0');
            instance.evaluate();
            test.assert(instance.result == null);
            test.assert(instance.failed == true);

            // Dangerous script
            instance =  new ev.Evaluator('1 + 1 + eval("1 + 1") ');
            instance.evaluate();
            test.assert(instance.result == null);
            test.assert(instance.failed == true);

            // No text allowed
            instance =  new ev.Evaluator('1 + 1 hello');
            instance.evaluate();
            test.assert(instance.result == null);
            test.assert(instance.failed == true);

        });
    });
    
});
