import logging
import json
import azure.functions as func

def main(transcriptions: func.DocumentList, actions: func.Out[str]) -> None:
    if transcriptions:
        logging.info('Document Id: %s', transcriptions[0]['id'])

        actions.set(json.dumps({
            'actionName': 'sendToAll',
            'data': json.dumps(dict(transcriptions[0])),
            'dataType': 'json'
        }))
