import {useState, useEffect} from 'react';
import {useDropzone, FileWithPath} from 'react-dropzone';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress  from '@mui/material/CircularProgress';
import Backdrop  from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface NewTranscriptOptions {
    onFileUploaded: (file: UploadedFile) => void;
    onFileUploadError: (error: Error) => void;
    onClose: () => void;
}

export default function NewTranscription({onFileUploaded, onFileUploadError, onClose}: NewTranscriptOptions) {
    const [file, setFile] = useState<UploadedFile | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(true);
    const [response, setResponse] = useState<Response | null>(null);

    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        onDropAccepted,
        accept: {
            'audio/wav': [],
            'audio/wave': []
        }
    });

    function onDropAccepted(files: File[]) {
        setFile(files[0]);
    }

    function onModalClose() {
        setModalOpen(false);
        onClose();
    }

    useEffect(() => {
        if (file) {
            const controller = new AbortController();

            (async () => {
                setLoading(true);

                const form = new FormData();
                form.append('files', file);

                const uploadResponse = await fetch('/api/files', {
                    signal: controller.signal,
                    method: 'POST',
                    body: form,
                });

                setLoading(false);
                setResponse(uploadResponse);
            })();
    
            return () => controller.abort();
        }
    }, [file]);

    useEffect(() => {
        (async () => {
            if (response?.ok && file) {
                onFileUploaded(file);
            }
            else if (response && !response.ok) {
                const error = await response.text();
                console.log('error:', error);
                onFileUploadError(new Error(error || 'Failed to upload a file'));
            }
        })();
    }, [response, file, onFileUploaded, onFileUploadError]);

    return (
        <Dialog open={modalOpen} onClose={onModalClose}>
            <DialogTitle>
                Upload audio file
                <IconButton
                    aria-label="close"
                    onClick={onModalClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent {...getRootProps({ className: 'dropzone' })}>
                <DialogContentText>
                Drag and drop a .wav audio file here, or click to select it from your computer
                </DialogContentText>
                <input {...getInputProps()} />
            </DialogContent>
            <Backdrop sx={{ color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Dialog>
    );
}

export type UploadedFile = FileWithPath;
