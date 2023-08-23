import {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress  from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {WebPubSubClient} from '@azure/web-pubsub-client';
import NavBar from './Navbar';
import Transcription from './Transcription';
import Transcriptions from './Transcriptions';
import NewTranscription from './NewTranscription';
import useFetch from './useFetch';
import formatTranscriptions from './formatTranscriptions';

interface WebSocketResponse {
  url: string;
}

function App() {
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [fileUploadModalOpen, setFileUploadModalOpen] = useState(false);
  const openFileUploadModal = () => setFileUploadModalOpen(true);
  const closeFileUploadModal = () => setFileUploadModalOpen(false);

  const [initialTranscriptions, loading] = useFetch<Transcription[]>('/api/transcriptions');
  const [websocket] = useFetch<WebSocketResponse>('/api/websocket');

  const [uploadAlertOpen, setUploadAlertOpen] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (Array.isArray(initialTranscriptions)) {
      setTranscriptions(formatTranscriptions(initialTranscriptions));
    }
  }, [initialTranscriptions]);

  useEffect(() => {
    let client: WebPubSubClient | null = null;

    if (websocket?.url) {
      client = new WebPubSubClient({
        getClientAccessUrl: websocket.url,
      });

      client.on('server-message', (serverMessage) => {
        const transcription = formatTranscriptions([serverMessage.message.data as Transcription])[0];
        addTranscription(transcription);
      });

      client.start();
    }

    return () => client?.stop();
  }, [websocket]);

  function addTranscription(transcription: Transcription) {
    setTranscriptions(list => [transcription, ...list]);
  }

  function handleFileUpload(isSuccessfulUpload: boolean) {
    setUploadSuccess(isSuccessfulUpload);
    setUploadAlertOpen(true);
    closeFileUploadModal();
  }

  const handleUploadAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
        return;
    }

    setUploadAlertOpen(false);
  };

  return (
    <>
      <NavBar onFileUpload={openFileUploadModal} />
      {fileUploadModalOpen && (
        <NewTranscription
          onFileUploaded={() => handleFileUpload(true)}
          onFileUploadError={() => handleFileUpload(false)}
          onClose={closeFileUploadModal}
        />
      )}
      <main>
        <Container>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            marginTop={5}
          >
            Check existing audio transcriptions and upload new files
          </Typography>
        </Container>
        <Container sx={{ paddingTop: 5 }}>
          <Transcriptions list={transcriptions} />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Container>
        <Snackbar open={uploadAlertOpen} autoHideDuration={6000} onClose={handleUploadAlertClose}>
          <Alert onClose={handleUploadAlertClose} severity={uploadSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
            {uploadSuccess ? 'Uploaded successfully' : 'Failed to upload the file'}
          </Alert>
        </Snackbar>
      </main>
    </>
  );
}

export default App;
