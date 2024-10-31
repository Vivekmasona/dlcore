const express = require('express');
const youtubedl = require('youtube-dl-exec');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to stream audio from YouTube
app.get('/stream', (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send('Please provide a YouTube URL.');
    }

    // Stream audio from YouTube
    youtubedl(url, {
        // Options to stream audio only
        filter: 'audioonly',
        format: 'bestaudio[ext=m4a]',
        output: '-',
    })
    .pipe(res)
    .on('error', (error) => {
        console.error(error);
        res.status(500).send('An error occurred while streaming audio.');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
