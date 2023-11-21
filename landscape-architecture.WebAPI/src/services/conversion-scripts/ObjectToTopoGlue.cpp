#include <node_api.h>
#include <vector>
#include <iostream>
#include "ObjectToTopo.h"

struct InputParams
{
    int64_t xSizeS;
    int64_t ySizeS;
    int64_t zSizeS;
};

InputParams ExtractInputParams(napi_env env, napi_value obj)
{
    InputParams inputParams;
    napi_value xSizeVal, ySizeVal, zSizeVal, xSizeKey, ySizeKey, zSizeKey;

    napi_create_string_utf8(env, "xSize", NAPI_AUTO_LENGTH, &xSizeKey);
    napi_create_string_utf8(env, "ySize", NAPI_AUTO_LENGTH, &ySizeKey);
    napi_create_string_utf8(env, "zSize", NAPI_AUTO_LENGTH, &zSizeKey);

    napi_get_property(env, obj, xSizeKey, &xSizeVal);
    napi_get_property(env, obj, ySizeKey, &ySizeVal);
    napi_get_property(env, obj, zSizeKey, &zSizeVal);

    napi_get_value_int64(env, xSizeVal, &inputParams.xSizeS);
    napi_get_value_int64(env, ySizeVal, &inputParams.ySizeS);
    napi_get_value_int64(env, zSizeVal, &inputParams.zSizeS);

    return inputParams;
}

napi_value ObjectToTopo(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2];
    size_t bufferLength = 0;
    void* bufferData = nullptr;

    napi_get_cb_info(env, info, &argc, args, NULL, NULL);
    
    if (argc != 2)
    {
        napi_throw_error(env, nullptr, "Wrong number of arguments");
        return nullptr;
    }
    InputParams inputParams = ExtractInputParams(env, args[0]);
    inputParams.xSizeS = 10;

    napi_get_arraybuffer_info(env, args[1], &bufferData, &bufferLength);

    int* intBuffer = static_cast<int*>(bufferData);

    // Print original buffer values
    std::cout << "Original Buffer: ";
    for (size_t i = 0; i < bufferLength / sizeof(int); ++i)
    {
        std::cout << intBuffer[i] << " ";
    }
    std::cout << std::endl;

    // Modify the buffer contents
    for (size_t i = 0; i < bufferLength / sizeof(int); ++i)
    {
        intBuffer[i] = i; // Modify the buffer directly
    }

    // Print modified buffer values
    std::cout << "Modified Buffer: ";
    for (size_t i = 0; i < bufferLength / sizeof(int); ++i)
    {
        std::cout << intBuffer[i] << " ";
    }
    std::cout << std::endl;

    return nullptr;
    return nullptr;
}

napi_value init(napi_env env, napi_value exports)
{
    napi_value ObjectToTopoFacade;
    napi_create_function(env, nullptr, 0, ObjectToTopo, nullptr, &ObjectToTopoFacade);

    return ObjectToTopoFacade;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init);