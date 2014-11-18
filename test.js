var tape = require('tape');
var path = require('path');

var binding;

tape('process.env can set and get variables', function(assert) {
    // env variable set before addon is required
    process.env.VARIABLE_1 = "VARIABLE_1";
    // make sure node.js thinks it is set
    assert.equal(process.env.VARIABLE_1,"VARIABLE_1");
    assert.end();
});

tape('getenv sees process.env variable set before addon is required', function(assert) {
    // create an env variable before requiring binding
    process.env.VARIABLE_2 = "VARIABLE_2";
    binding = require('./');
    // should be equal
    assert.equal(process.env.VARIABLE_2,binding.getenv('VARIABLE_2'));
    assert.end();
});

tape('getenv sees process.env variable set after addon is required', function(assert) {
    binding = require('./');
    // create an env variable after requiring binding
    process.env.VARIABLE_3 = "VARIABLE_3";
    // known/expected to fail on windows
    assert.equal(process.env.VARIABLE_3,binding.getenv('VARIABLE_3'));
    assert.end();
});

tape('getenv sees variable set by setenv/putenv', function(assert) {
    var return_code = binding.setenv("VARIABLE_4","VARIABLE_4");
    assert.equal(0,return_code);
    // make sure node.js picks up the newly set variable
    assert.equal(process.env.VARIABLE_4,"VARIABLE_4");
    // should be equal
    assert.equal(process.env.VARIABLE_4,binding.getenv('VARIABLE_4'));
    assert.end();
});
