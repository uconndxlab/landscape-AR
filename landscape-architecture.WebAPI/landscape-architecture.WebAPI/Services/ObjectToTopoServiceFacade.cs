using AutoMapper;
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

    public class ObjectToTopoServiceFacade : IObjectToTopoServiceFacade
    {

        private readonly LandscapeContext _context;
        private readonly ILogger<ObjectToTopoServiceFacade> _logger;
        private readonly IMapper _mapper;
        public ObjectToTopoServiceFacade(ILogger<ObjectToTopoServiceFacade> logger, LandscapeContext context, IMapper mapper) 
        {
            this._logger = logger;
            this._context = context;
            var config = new MapperConfiguration(cfg =>
            {

            });
            this._mapper = config.CreateMapper();
        }

        public TopoDTO GetTopo(string fileName)
        {
            InputParams inputParams = new InputParams();
            inputParams.xSize = 32;
            inputParams.ySize = 32;
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

        private async void StageFile(string fileName)
        {
            var file = await _context.UploadedFiles.FindAsync(fileName);
            if (file == null)
            {
                return;
            }
            // create file within staging folder and write contents
        }
    }
}