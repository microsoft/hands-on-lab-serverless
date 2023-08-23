module.exports = async function (context, req) {
    const transcriptions = context.bindings.transcriptions;

    return {
        body: JSON.stringify(transcriptions)
    };
}
