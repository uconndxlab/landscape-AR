#include <node_api.h>
#include <vector>
#include <iostream>
#include "ObjectToTopo.h"

struct InputParams
{
    int64_t xSizeS;
    int64_t ySizeS;
    int64_t zSizeS;
    std::vector<std::vector<int64_t>> grid;
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

    napi_value gridVal, gridKey;
    napi_create_string_utf8(env, "grid", NAPI_AUTO_LENGTH, &gridKey);
    napi_get_property(env, obj, gridKey, &gridVal);

    uint32_t gridLength;
    napi_get_array_length(env, gridVal, &gridLength);

    inputParams.grid.resize(gridLength);
    for(uint32_t i = 0; i < gridLength; i++)
    {
        napi_value rowVal;
        napi_get_element(env, gridVal, i, &rowVal);
        uint32_t rowLength;
        napi_get_array_length(env, rowVal, &rowLength);
        inputParams.grid[i].resize(rowLength);
        for(uint32_t j = 0; j < rowLength; j++)
        {
            napi_value cellVal;
            napi_get_element(env, rowVal, j, &cellVal);
            napi_get_value_int64(env, cellVal, &inputParams.grid[i][j]);
        }
    }
    return inputParams;
}

napi_value ObjectToTopo(napi_env env, napi_callback_info info)
{
    size_t argc = 1;
    napi_value args[1];

    napi_get_cb_info(env, info, &argc, args, NULL, NULL);
    
    if (argc != 1)
    {
        napi_throw_error(env, nullptr, "Wrong number of arguments");
        return nullptr;
    }
    InputParams inputParams = ExtractInputParams(env, args[0]);
    std::cout << inputParams.xSizeS << std::endl;
}

napi_value init(napi_env env, napi_value exports)
{
    napi_value ObjectToTopoFacade;
    napi_create_function(env, nullptr, 0, ObjectToTopo, nullptr, &ObjectToTopoFacade);

    return ObjectToTopoFacade;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init);