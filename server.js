const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/extract-urls', async (req, res) => {
    const url = req.query.url; // Query parameter se URL lena
    if (!url) {
        return res.status(400).send('URL is required'); // Agar URL nahi hai, toh error bhejna
    }

    try {
        const response = await axios.get(url);
        const html = response.data;

        // URLs ko extract karne ka simple tarika
        const regex = /href="(http[^"]+)"/g; // Href attributes se URLs nikaalne ka regex
        const links = [];
        let match;

        while ((match = regex.exec(html)) !== null) {
            links.push(match[1]); // URL ko links mein add karna
        }

        res.json(links); // Extracted URLs ko JSON format mein bhejna
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching the URL'); // Agar kuch error aaye toh
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
