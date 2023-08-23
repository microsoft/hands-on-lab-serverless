using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace serverless_workshop_functions_dotnet
{
    public class GetTranscriptions
    {
        private readonly ILogger _logger;

        public GetTranscriptions(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<GetTranscriptions>();
        }

        [Function("GetTranscriptions")]
        public HttpResponseData Run(
            [HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequestData req,
            [CosmosDBInput(
                databaseName: "%COSMOS_DB_DATABASE_NAME%",
                collectionName: "%COSMOS_DB_CONTAINER_ID%",
                ConnectionStringSetting = "COSMOS_DB_CONNECTION_STRING_SETTING",
                SqlQuery = "SELECT * FROM c ORDER BY c._ts DESC OFFSET 0 LIMIT 50")
            ] IEnumerable<Transcription> transcriptions
        )
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "application/json");

            string jsonData = JsonSerializer.Serialize(transcriptions);

            response.WriteString(jsonData);

            return response;
        }
    }
}
