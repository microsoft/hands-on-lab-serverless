## Create a Function App

```sh
az functionapp create \
    --name <function-app-name> \
    --consumption-plan-location <region> \
    --resource-group <resource-group> \
    --runtime dotnet-isolated \
    --os-type Linux \
    --functions-version 4 \
    --runtime-version 7 \
    --storage-account <storage-account>
```

## Create the AudioUpload function

```sh
func init --worker-runtime dotnet-isolated --target-framework net7.0
func new --name AudioUpload --template "HTTP trigger" --authlevel "function"
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs --version 5.0.0
```

## Create the GetTranscriptions function

```sh
func new --name GetTranscriptions --template "HTTP trigger" --authlevel "function"
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.CosmosDB --version 3.0.9
```

## Create the CosmosToWebPubSub function

```sh
func new --name CosmosToWebPubSub --template "CosmosDBTrigger"
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.WebPubSub --version 1.5.0-beta.1 --prerelease
```

Example of how to use Web PubSub from a dotnet-isolated function: https://github.com/Azure/azure-webpubsub/blob/main/samples/functions/csharp/notifications-isolated/Functions.cs

## Publishing the Function App

```sh
func azure functionapp publish <function-app-name>
```
