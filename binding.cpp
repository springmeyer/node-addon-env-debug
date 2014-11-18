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

static NAN_METHOD(addon_setenv)
{
    NanScope();
    if (args.Length() == 2) {
        if (!args[0]->IsString()) {
            NanThrowTypeError("first argument must be a String");
            NanReturnUndefined();
        }
        if (!args[1]->IsString()) {
            NanThrowTypeError("second argument must be a String");
            NanReturnUndefined();
        }
        int ret = -1;
#if defined(_MSC_VER)
        v8::String::Value key(args[0]->ToString());
        v8::String::Value val(args[1]->ToString());
        WCHAR* key_ptr = reinterpret_cast<WCHAR*>(*key);
        if (key_ptr[0] != L'=') {
            ret = _wputenv_s(key_ptr, reinterpret_cast<WCHAR*>(*val));
        }
#else
        std::string key = *v8::String::Utf8Value(args[0]->ToString());
        std::string value = *v8::String::Utf8Value(args[1]->ToString());
        ret = setenv(key.c_str(), value.c_str(), 1);
#endif
        NanReturnValue(NanNew(ret));
    } else {
        NanThrowTypeError("expects two arguments: a key and value");
        NanReturnUndefined();
    }
    NanReturnUndefined();
}

extern "C" {
    static void start(v8::Handle<v8::Object> target) {
        NanScope();
        NODE_SET_METHOD(target, "getenv", addon_getenv);
        NODE_SET_METHOD(target, "setenv", addon_setenv);
    }
}

NODE_MODULE(node_addon_env_debug, start)

