{
  'variables': {
      "toolset%":"",
  },
  "targets": [
    {
      "target_name": "node-addon-env-debug",
      "sources": [ "binding.cpp" ],
      "msbuild_toolset":"<(toolset)",
      'include_dirs': [ "<!(node -e \"require('nan')\")" ],
    }
  ]
}
