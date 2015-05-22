# Consumer / Producer System

### Structure

 - **app** - producer / consumer
    - consumer.js
    - producer.js
 - **doc** - any docs or diagrams
    - sequence.png
 - **libs** - generic libraries
    - evaluator.js
 - **tests** - unit tests
    - evaluator.js

### Assumptions
I made several assumptions from the context of description.   Normally I would try to clarify any ambiguity, but since I haven't spoken with anyone yet, I decided to proceed.  Also, it sounds like I should limit the use of external libraries as much as possible, so other than a unit test framework, no other libraries are used.

  - The Producer is the client, and the Consumer is the server
  - Consumer listens for any request on specified port (3000)
  - Only external libraries are used... other than unit.js
  - An HTTP Get request is used to send the expression
  - A JSON response is used to return the result
  - All logging should occur using the console
  - Time should be logged for each request and total requests

### Evaluator

I created a separate class to handle the expression evaluations.  The class validates the expression (only numbers and arithmetic operators), and uses a generated function to run the expression.

### Concurrency

To test concurrency, I'm using a quick and dirty method of launching multiple instances of the producers using a shell script.    Ideally, one would use prehaps the built-in vm or child process libraries.. or perhaps use an actual load test framework or service.
