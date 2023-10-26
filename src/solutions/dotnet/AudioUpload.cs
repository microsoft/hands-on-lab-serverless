using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace serverless_workshop_functions_dotnet
{

    public class AudioUploadOutput
    {
        [BlobOutput("%STORAGE_ACCOUNT_CONTAINER%/{rand-guid}.wav", Connection="STORAGE_ACCOUNT_CONNECTION_STRING")]
        public byte[] Blob { get; set; }

        public HttpResponseData HttpResponse { get; set; }
    }

    public class AudioUpload
    {
        private readonly ILogger _logger;

        public AudioUpload(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<AudioUpload>();
        }

        [Function(nameof(AudioUpload))]
        public AudioUploadOutput Run(
            [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req
        )
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            // https://github.com/Azure/azure-functions-dotnet-worker/issues/366
            var audioFileData = default(byte[]);
            using (var memstream = new MemoryStream())
            {
                req.Body.CopyTo(memstream);
                audioFileData = memstream.ToArray();
            }

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString("Uploaded!");
            return new AudioUploadOutput()
            {
                Blob = audioFileData,
                HttpResponse = response
            };
        }
    }
}
