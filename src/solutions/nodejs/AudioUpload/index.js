module.exports = async function (context, req) {
    console.log('Uploading a new audio file');

    return {
        httpResponse: {
            body: 'Uploaded!'
        },
        blobOutput: req.bufferBody
    };
}
