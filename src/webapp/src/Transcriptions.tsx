import Transcription from './Transcription';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface TranscriptionsOptions {
    list: Transcription[];
}

export default function Transcriptions({list}: TranscriptionsOptions) {
    return (
        <Table sx={{ minWidth: 650 }} aria-label="List of audio transcriptions">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Path</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Result</TableCell>
                    <TableCell align="right">Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {list?.map((transcription) => (
                <TableRow key={transcription.id}>
                    <TableCell component="th" scope="row">{transcription.id}</TableCell>
                    <TableCell align="right">{transcription.path}</TableCell>
                    <TableCell align="right">{transcription.date?.toLocaleString()}</TableCell>
                    <TableCell align="right">{transcription.result}</TableCell>
                    <TableCell align="right">{transcription.status}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    );
}