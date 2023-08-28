using landscape_architecture.WebAPI.DTO;
using System.Runtime.InteropServices;

namespace landscape_architecture.WebAPI.Services
{
    [StructLayout(LayoutKind.Sequential)]
    public struct InputParams
    {
        public int xSize;
        public int ySize;
        public int zSize;
        public IntPtr grid;
    };
    public class ObjectToTopoService : IObjectToTopoService
    {
        public ObjectToTopoService() { }

        public TopoDTO GetTopo()
        {
            InputParams inputParams = new InputParams();
            inputParams.xSize = 5;
            inputParams.ySize = 5;
            var result = objectToTopo(ref inputParams);

            if (result)
            {
                int[][] gridOut = new int[inputParams.xSize][];
                for (int i = 0; i < inputParams.xSize; i++)
                    gridOut[i] = new int[inputParams.ySize];

                IntPtr[] ptrRows = new IntPtr[inputParams.xSize];
                Marshal.Copy(inputParams.grid, ptrRows, 0, inputParams.xSize);

                for (int i = 0; i < inputParams.xSize; i++)
                    Marshal.Copy(ptrRows[i], gridOut[i], 0, inputParams.ySize);

                for (int j = 0; j < inputParams.xSize; j++)
                {
                    for (int k = 0; k < inputParams.ySize; k++)
                        Console.Write(gridOut[j][k] + " ");
                    Console.WriteLine();
                }

                Console.WriteLine(inputParams.ySize);

                TopoDTO topoDTO = new TopoDTO();
                topoDTO.XSize = inputParams.xSize;
                topoDTO.YSize = inputParams.ySize;
                topoDTO.Grid = gridOut;
                return topoDTO;
            }
            return new TopoDTO();
        }

        [DllImport("ConversionScripts.dll", CallingConvention = CallingConvention.Cdecl, SetLastError = true)]
        public static extern bool objectToTopo(ref InputParams inputParams);
    }
}