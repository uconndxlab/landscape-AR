using landscape_architecture.WebAPI.DTO;
using landscape_architecture.WebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace landscape_architecture.WebAPI.Controllers
{
    [ApiController]
    [Route("api/v0/[controller]")]
    public class ModelController : ControllerBase
    {
        readonly IObjectToTopoServiceFacade _objectToTopoServiceFacade;

        public ModelController(IObjectToTopoServiceFacade objectToTopoServiceFacade)
        {
            _objectToTopoServiceFacade = objectToTopoServiceFacade;
        }

        [HttpGet]
        [Route("GetTopoFromModel")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<TopoDTO> GetTopoFromModel()
        {
            return _objectToTopoServiceFacade.GetTopo(); //How should we specify which model, filename?
        }
    }
}
