const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Play Endpoint
app.get('/play', (req, res) => {
    const videoUrl = req.query.url; // Get YouTube video URL from query

    if (!videoUrl) {
        return res.status(400).send('YouTube URL is required');
    }

    // Stream audio from YouTube video with low quality
    res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');
    ytdl(videoUrl, {
        quality: 'lowestaudio', // Stream the lowest audio quality
        filter: format => format.audioBitrate !== null, // Filter for audio formats only
    }).pipe(res);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
