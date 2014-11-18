Testcase for how process.env works in Node.js across platforms.

This testcase asks the question:

> Can you set environment variables by modifying `process.env` at startup such that that C-land code that calls `getenv` will see the environment setting?

This impacts both node-addons that might bind libraries that call `getenv` or might themselves need to respond to values in the environment.

It also impacts the whether [libuv will respect `UV_THREADPOOL_SIZE`](https://github.com/joyent/node/blob/cfcb1de130867197cbc9c6012b7e84e08e53d032/deps/uv/src/threadpool.c#L142) if it is set within a node.js script by doing `process.env.UV_THREADPOOL_SIZE = N`. Or whether this needs to be set in the shell's environment before starting node.


[![Build Status](https://travis-ci.org/springmeyer/node-addon-env-debug.svg)](https://travis-ci.org/springmeyer/node-addon-env-debug)
[![Build status](https://ci.appveyor.com/api/projects/status/gqa2glfstmlu7thn?svg=true)](https://ci.appveyor.com/project/Mapbox/node-addon-env-debug)

## Testing

To run the testcase do:

    node test.js

## Observations

 - Behavior is stable across node versions (both v0.10.33 and v0.11.13 were tested); but
 - Behavior is not stable across platforms.

#### Linux / OSX

 - Values returned from `getenv` respect those set on `process.env` both if `process.env` is modified before the node-addon is required and after

#### Windows with node.exe from http://nodejs.org/download/

NOTE: this node.exe is likely compiled with visual studio 2013

 - Values returned from `getenv` respect those set on `process.env` only if `process.env` is modified before the node-addon is required

#### Windows with node.exe from https://github.com/mapbox/node-cpp11

NOTE: this node.exe is [compiled with Visual Studio 2014 CTP 4](https://github.com/mapbox/node/pull/2)

 - Values returned from `getenv` are empty and do no respect any values set on `process.env`. The only way for `getenv` to see environment settings is if they are set in the environment of the shell that starts node.exe.

## References

 - https://github.com/joyent/node/blob/7c0419730b237dbfa0ec4e6fb33a99ff01825a8f/src/node.cc#L2311-L2359
 - http://www.codeproject.com/Articles/43029/When-what-you-set-is-not-what-you-get-SetEnvironme
