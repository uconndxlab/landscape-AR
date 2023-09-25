using landscape_architecture.WebAPI.DTO;

namespace landscape_architecture.WebAPI.Services
{
    public interface IObjectToTopoServiceFacade
    {
        public TopoDTO GetTopo(string fileName);
    }
}
