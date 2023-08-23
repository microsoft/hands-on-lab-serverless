import Transcription from './Transcription';

export default function formatTranscriptions(transcriptions: Transcription[]): Transcription[] {
    return transcriptions.map(transcription => {
        if (transcription?.date) {
            return transcription;
        }
    
        const timestampInMillisecsonds = String(transcription._ts).length === 10 ? transcription._ts * 1000 : transcription._ts;
    
        const formattedTranscription: Transcription = {
            ...transcription,
            date: new Date(timestampInMillisecsonds),
        };

        return formattedTranscription;
    });
}