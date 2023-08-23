# Serverless workshop demo webapp

This project provides a Static Web App to help learners assess their progress on the Serverless Hands-On-Lab.

It implements the following flows:
- Getting all existing transcriptions using a RESTful endpoint
- Getting transcription processing updates using Azure Web Pub Sub
- Uploading new audio files

The flows can be enabled using the following environments variables:

| Environment variable       | Default        | Description                                                                                                   |
|----------------------------|----------------|---------------------------------------------------------------------------------------------------------------|
| FILE_UPLOADING_URL         |                | Url of the file uploading endpoint. The endpoint should handle uploads in `multipart/form-data` or in binary                                                |
| FILE_UPLOADING_FORMAT      |    `form`     | Expected data uploading format: `binary` or `form`                                                 |
| TRANSCRIPTION_FETCHING_URL |                | Transcription fetching url                                                                                    |
| WPS_CONNECTION_STRING      |                | Connection string for an Azure Web PubSub instance which can be used to send transcription processing updates |
| WPS_HUB_NAME               | `transcriptions` | Azure Web PubSub Hub name on which processing updates will be sent                                            |
