#include <node_api.h>
#include <vector>
#include <iostream>
#include "ObjectToTopo.h"
#include <filesystem>

#ifdef _WIN32
#define PATH_SEPARATOR "\\"
#else
#define PATH_SEPARATOR "/"
#endif

struct InputParams
{
    int64_t xSizeS;
    int64_t ySizeS;
    int64_t zSizeS;
    std::string fileName;
};

size_t fileNameSize;

InputParams ExtractInputParams(napi_env env, napi_value obj)
{
    InputParams inputParams;
    napi_value xSizeVal, ySizeVal, zSizeVal, fileNameVal, xSizeKey, ySizeKey, zSizeKey, fileNameKey;

    // Get keys from inputParams object
    napi_create_string_utf8(env, "xSize", NAPI_AUTO_LENGTH, &xSizeKey);
    napi_create_string_utf8(env, "ySize", NAPI_AUTO_LENGTH, &ySizeKey);
    napi_create_string_utf8(env, "zSize", NAPI_AUTO_LENGTH, &zSizeKey);
    napi_create_string_utf8(env, "fileName", NAPI_AUTO_LENGTH, &fileNameKey);

    // Get values from inputParams object using keys
    napi_get_property(env, obj, xSizeKey, &xSizeVal);
    napi_get_property(env, obj, ySizeKey, &ySizeVal);
    napi_get_property(env, obj, zSizeKey, &zSizeVal);
    napi_get_property(env, obj, fileNameKey, &fileNameVal);

    // Map these values to C struct
    napi_get_value_int64(env, xSizeVal, &inputParams.xSizeS);
    napi_get_value_int64(env, ySizeVal, &inputParams.ySizeS);
    napi_get_value_int64(env, zSizeVal, &inputParams.zSizeS);

    napi_get_value_string_utf8(env, fileNameVal, nullptr, 0, &fileNameSize);
    inputParams.fileName.resize(fileNameSize);
    napi_get_value_string_utf8(env, fileNameVal, &inputParams.fileName[0], fileNameSize + 1, &fileNameSize);

    return inputParams;
}

napi_value ObjectToTopoC(napi_env env, napi_callback_info info)
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

    std::filesystem::path currentPath = std::filesystem::current_path();
    std::string fileName = currentPath.string() + PATH_SEPARATOR + "src" + PATH_SEPARATOR + "services" + PATH_SEPARATOR + "conversion-scripts" + PATH_SEPARATOR + "stagedFiles" + PATH_SEPARATOR + inputParams.fileName;
    std::cout << "fileName: " << fileName << std::endl;
    ObjectToTopo converter(fileName, inputParams.xSizeS, inputParams.ySizeS, inputParams.zSizeS, 'y', env);
    converter.readObj();
    napi_value result = converter.makeGrid();

    return result;
}

napi_value init(napi_env env, napi_value exports)
{
    napi_value ObjectToTopoFacade;
    napi_create_function(env, nullptr, NAPI_AUTO_LENGTH, ObjectToTopoC, nullptr, &ObjectToTopoFacade);
    return ObjectToTopoFacade;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init);