// dllmain.cpp : Defines the entry point for the DLL application.
#include "pch.h"
#include <string>
#include <vector>
#include <stdint.h>


struct InputParams
{
    int xSize;
    int ySize;
    int zSize;
    int** grid;
};
#define EXPORTED_METHOD extern "C" __declspec(dllexport)

EXPORTED_METHOD
BOOL objectToTopo(InputParams* in) {
    int val = 1;
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

    // Fill 2d array with values
    for (int r = 0; r < in->xSize; r++)
        for (int j = 0; j < in->ySize; j++)
            pArray[r][j] = val++;

    in->grid = pArray;

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
