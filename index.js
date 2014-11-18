var assert = require('assert');

// env variable set before addon is required
process.env.ENV_VARIABLE_A = "before";

// make sure node.js thinks it is set
assert.equal(process.env.ENV_VARIABLE_A,"before");

// require addon now
var binding = require('./build/Release/node-addon-env-debug.node')

// should be equal
assert.equal(process.env.ENV_VARIABLE_A,binding.getenv('ENV_VARIABLE_A'));

// create a second env variable
process.env.ENV_VARIABLE_B = "after";

// make sure node.js thinks it is set
assert.equal(process.env.ENV_VARIABLE_B,"after");

// should be equal
assert.equal(process.env.ENV_VARIABLE_B,binding.getenv('ENV_VARIABLE_B'));
