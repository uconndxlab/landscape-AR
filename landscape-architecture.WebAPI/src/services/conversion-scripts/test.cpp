#include <node_api.h>

napi_value nativeAdd(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2];
    int64_t n1;
    int64_t n2;
    napi_value output;

    int64_t sum;

    napi_get_cb_info(env, info, &argc, args, NULL, NULL);

    napi_get_value_int64(env, args[0], &n1);
    napi_get_value_int64(env, args[1], &n2);

    sum = n1 + n2;

    napi_create_double(env, sum, &output);

    return output;
}

napi_value init(napi_env env, napi_value exports)
{
    napi_value test;
    napi_create_function(env, nullptr, 0, nativeAdd, nullptr, &test);

    return test;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init);