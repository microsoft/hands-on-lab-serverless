module.exports = async function (context, transcriptions) {
    if (!!transcriptions && transcriptions.length > 0) {
        context.log('Document Id: ', transcriptions[0].id);

        context.bindings.actions = {
            "actionName": "sendToAll",
            "data": JSON.stringify(transcriptions[0]),
            "dataType": "json"
        };

        context.done();
    }
}
