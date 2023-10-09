using System;
using System.Collections.Generic;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace serverless_workshop_functions_dotnet
{
    public class CosmosToWebPubSub
    {
        private readonly ILogger _logger;

        public CosmosToWebPubSub(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<CosmosToWebPubSub>();
        }

        [Function("CosmosToWebPubSub")]
        [WebPubSubOutput(Hub = "%WEB_PUBSUB_HUB_ID%", Connection = "WEB_PUBSUB_CONNECTION_STRING")]
        public SendToAllAction? Run(
            [CosmosDBTrigger(
                databaseName: "%COSMOS_DB_DATABASE_NAME%",
                collectionName: "%COSMOS_DB_CONTAINER_ID%",
                ConnectionStringSetting = "COSMOS_DB_CONNECTION_STRING_SETTING",
                CreateLeaseCollectionIfNotExists = true,
                LeaseCollectionName = "leases")
            ] IReadOnlyList<Transcription> input
        )
        {
            if (input != null && input.Count > 0)
            {
                _logger.LogInformation("Document Id: " + input[0].id);

                return new SendToAllAction
                {
                    Data = BinaryData.FromString(JsonSerializer.Serialize(input[0])),
                    DataType = WebPubSubDataType.Json
                };
            }

            return null;
        }
    }
}
