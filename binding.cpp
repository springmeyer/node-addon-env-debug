// v8
#include <v8.h>

// node.js
#include <nan.h>

// http://en.cppreference.com/w/cpp/utility/program/getenv
#include <cstdlib>

static NAN_METHOD(addon_getenv)
{
    NanScope();
    if (args.Length() == 1) {
        if (!args[0]->IsString()) {
            NanThrowTypeError("argument must be a String");
            NanReturnUndefined();
        }
        std::string key = *v8::String::Utf8Value(args[0]->ToString());
        if (!key.empty()) {
            char * val = std::getenv(key.c_str());
            if (val != NULL) {
                NanReturnValue(NanNew(val));
            } else {
                NanReturnUndefined();                
            }
        } else {
            NanThrowTypeError("expects an environment variable name as a String (not an empty value)");
            NanReturnUndefined();            
        }
    } else {
        NanThrowTypeError("expects an environment variable name as a String");
        NanReturnUndefined();        
    }
}


extern "C" {
    static void start(v8::Handle<v8::Object> target) {
        NanScope();
        NODE_SET_METHOD(target, "getenv", addon_getenv);
    }
}

NODE_MODULE(node_addon_env_debug, start)

