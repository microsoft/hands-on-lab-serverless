using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace loadtest
{

    public class CopyBlobToGuidOutput
    {
        [BlobOutput("%STORAGE_ACCOUNT_CONTAINER%/{rand-guid}.wav", Connection="STORAGE_ACCOUNT_CONNECTION_STRING")]
        public byte[] Blob { get; set; }

        public HttpResponseData HttpResponse { get; set; }
    }

    public class CopyBlobToGuid
    {
        private readonly ILogger _logger;
        private HttpResponseData _response;
        private readonly string _storageAccountContainer;

        public CopyBlobToGuid(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<CopyBlobToGuid>();
            _storageAccountContainer = Environment.GetEnvironmentVariable("STORAGE_ACCOUNT_CONTAINER");
        }

        [Function("CopyBlobToGuid")]
        
        public CopyBlobToGuidOutput Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req,
            [BlobInput("%STORAGE_ACCOUNT_CONTAINER%/{sourceBlob}.wav", Connection="STORAGE_ACCOUNT_CONNECTION_STRING")] byte[] blobInput)
        {
            var blobPath = $"{_storageAccountContainer}/{req.Query["sourceBlob"]}.wav";

            //Fail fast 
            if(blobInput == null || blobInput == default(byte[]))
            {
                _logger.LogCritical($"[CRITICAL] Aborting copy : Couldn't properly load the sourceBlob at {blobPath}");

                _response = req.CreateResponse(HttpStatusCode.BadRequest);
                _response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
                _response.WriteString($"Something went wrong with the sourceBlob to copy : Please check your settings and try again later.");

                return new CopyBlobToGuidOutput()
                {
                    Blob = null,
                    HttpResponse = _response
                };
            }
                            
            //Create the success Http Response
            _response = req.CreateResponse(HttpStatusCode.OK);
            _response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            _response.WriteString($"Successfully copied the blob at {blobPath} to a new guid file");

            return new CopyBlobToGuidOutput()
            {
                Blob = blobInput,
                HttpResponse = _response
            };
        }
    }
}
