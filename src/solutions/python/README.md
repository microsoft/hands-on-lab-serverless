## Create a Function App

```sh
az functionapp create \
    --name <function-app-name> \
    --consumption-plan-location <region> \
    --resource-group <resource-group> \
    --runtime python \
    --os-type Linux \
    --functions-version 4 \
    --runtime-version 3.11 \
    --storage-account <storage-account>
```

## Create the AudioUpload function

```sh
func init --worker-runtime python --model v1
func new --name AudioUpload --template "HTTP trigger" --authlevel "function"
```

[Install the extension bundle](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob?tabs=in-process%2Cextensionv5%2Cextensionv3&pivots=programming-language-python#install-bundle) to get access to multiple bindings including the Blob storage binding.

## Create the GetTranscriptions function

```sh
func new --name GetTranscriptions --template "HTTP trigger" --authlevel "function"
```

Note: the Cosmos DB binding is also part of the [extension bundle](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2?tabs=in-process%2Cfunctionsv2&pivots=programming-language-python#install-bundle)

## Create the CosmosToWebPubSub function

```sh
func new --name CosmosToWebPubSub --template "Azure Cosmos DB trigger"
```

Note: the Web PubSub binding is also part of the [extension bundle](https://learn.microsoft.com/en-us/azure/azure-web-pubsub/reference-functions-bindings?tabs=csharp#add-to-your-functions-app)

## Publishing the Function App

```sh
func azure functionapp publish <function-app-name>
```
