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
    // require addon now
    binding = require('./');
    // should be equal
    assert.equal(process.env.VARIABLE_2,binding.getenv('VARIABLE_2'));
    assert.end();
});

tape('getenv sees process.env variable set after addon is required', function(assert) {
    // create a second env variable
    process.env.VARIABLE_2 = "VARIABLE_2";
    // make sure node.js thinks it is set
    assert.equal(process.env.VARIABLE_2,"VARIABLE_2");
    // should be equal
    assert.equal(process.env.VARIABLE_2,binding.getenv('VARIABLE_2'));
    assert.end();
});

tape('getenv sees variable set by setenv/putenv', function(assert) {
    assert.equal(0,binding.setenv("VARIABLE_3","VARIABLE_3"));
    // make sure node.js picks up the newly set variable
    assert.equal(process.env.VARIABLE_3,"VARIABLE_3");
    // should be equal
    assert.equal(process.env.VARIABLE_3,binding.getenv('VARIABLE_3'));
    assert.end();
});
