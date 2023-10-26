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

        public CopyBlobToGuid(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<CopyBlobToGuid>();
        }

        [Function("CopyBlobToGuid")]
        
        public CopyBlobToGuidOutput Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req,
            [BlobInput("%STORAGE_ACCOUNT_CONTAINER%/{sourceBlob}.wav", Connection="STORAGE_ACCOUNT_CONNECTION_STRING")] byte[] blobInput)
        {
            //Fail fast 
            if(blobInput == null || blobInput == default(byte[]))
                _logger.LogCritical("[CRITICAL] Aborting copy : Couldn't properly load the blobInput");
            
            //Create the success Http Response
            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString($"Successfully copied the blob in {Environment.GetEnvironmentVariable("STORAGE_ACCOUNT_CONTAINER")}/{req.Query["sourceBlob"]}.wav");

            return new CopyBlobToGuidOutput()
            {
                Blob = blobInput,
                HttpResponse = response
            };
        }
    }
}
