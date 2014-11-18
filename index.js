var binding = require('./build/Release/node-addon-env-debug.node')
var assert = require('assert');

process.env.ICU_DATA = "this";
var value = binding.getenv('ICU_DATA');
assert.equal(value,"this");
