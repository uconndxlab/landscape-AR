// dllmain.cpp : Defines the entry point for the DLL application.
#include "pch.h"
#include <string>
#include <vector>
#include <iostream>
#include <fstream>
#include <stdint.h>
#include "ObjectToTopo.h"
#include <iomanip>
#include <Windows.h>


std::string GetDLLDirectory() {
    HMODULE hModule = GetModuleHandle(NULL);
    char path[MAX_PATH];
    if (GetModuleFileNameA(hModule, path, MAX_PATH) != 0) {
        std::string fullPath(path);
        std::size_t pos = fullPath.find("landscape-architecture.WebAPI");
        fullPath = fullPath.substr(0, pos);
        size_t lastBackslash = fullPath.find_last_of("\\/");
        if (lastBackslash != std::string::npos) {
            return fullPath.substr(0, lastBackslash + 1); // Include the trailing slash
        }
    }
    return "";
}

struct InputParams
{
    int xSize;
    int ySize;
    int zSize;
    int** grid;
};
#define EXPORTED_METHOD extern "C" __declspec(dllexport)

EXPORTED_METHOD
BOOL objectToTopo(InputParams* in, const char* fileName) {
    // Allocate memory for rows
    int** pArray = static_cast<int**>(LocalAlloc(LMEM_FIXED, in->xSize * sizeof(int*)));
    if (!pArray)
        return false;

    // Allocate memory for cols
    for (int i = 0; i < in->xSize; i++)
    {
        pArray[i] = static_cast<int*>(LocalAlloc(LMEM_FIXED, in->ySize * sizeof(int)));
        if (!pArray[i])
            return false;
    }
    std::string baseDirectory = GetDLLDirectory();
    std::string filePath = baseDirectory + "landscape-architecture.WebAPI\\ConversionScripts\\StagedFiles\\" + fileName;
    ObjectToTopo ConversionObject(filePath, in->xSize, in->ySize, in->zSize, 'y'); // initialize conversion object with input params
    ConversionObject.readObj();
    ConversionObject.makeGrid();
    std::vector<std::vector<int> > grid = ConversionObject.getIntGrid();

    // Fill 2d array with values
    for (int r = 0; r < in->xSize; r++)
    {
        for (int j = 0; j < in->ySize; j++)
        {
            pArray[r][j] = grid[r][j];
        }
    }
    in->grid = pArray;
    if (remove(filePath.c_str()) == 0)
        return true;
    else
        std::cout << "Could not delete file" << std::endl;

    return true;
}
    

BOOL APIENTRY DllMain( HMODULE hModule,
                       DWORD  ul_reason_for_call,
                       LPVOID lpReserved
                     )
{
    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}

