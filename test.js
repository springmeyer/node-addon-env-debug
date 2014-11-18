var tape = require('tape');
var path = require('path');


tape('process.env can set and get variables', function(assert) {
    // env variable set before addon is required
    process.env.ENV_VARIABLE_A = "before";
    // make sure node.js thinks it is set
    assert.equal(process.env.ENV_VARIABLE_A,"before");
    assert.end();
});

tape('process.env can set and get variables', function(assert) {
    // require addon now
    var binding = require('./');
    // should be equal
    assert.equal(process.env.ENV_VARIABLE_A,binding.getenv('ENV_VARIABLE_A'));
    // create a second env variable
    process.env.ENV_VARIABLE_B = "after";
    // make sure node.js thinks it is set
    assert.equal(process.env.ENV_VARIABLE_B,"after");
    // should be equal
    assert.equal(process.env.ENV_VARIABLE_B,binding.getenv('ENV_VARIABLE_B'));
    assert.end();
});

console.log('all tests pass')
