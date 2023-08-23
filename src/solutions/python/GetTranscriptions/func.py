import json
import azure.functions as func

def main(req: func.HttpRequest, transcriptions: func.DocumentList) -> func.HttpResponse:
    return func.HttpResponse(
        json.dumps(transcriptions.data, default=dict),
        status_code=200,
        mimetype='application/json'
    )
