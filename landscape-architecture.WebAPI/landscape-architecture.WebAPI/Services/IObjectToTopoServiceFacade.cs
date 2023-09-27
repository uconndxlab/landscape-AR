using landscape_architecture.WebAPI.DTO;

namespace landscape_architecture.WebAPI.Services
{
    public interface IObjectToTopoServiceFacade
    {
        public TopoDTO GetTopo(int fileId);
        public Task<string> StageFile(int fileId); // returns file name
    }
}
