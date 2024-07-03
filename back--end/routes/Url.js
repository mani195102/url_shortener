const express = require('express');
const URL = require('../model/Url');
const shortid = require('shortid');
const router = express.Router();

// POST route to shorten URL
router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const baseUrl = req.protocol + '://' + req.get('host');
    const shortId = shortid.generate();
    const shortUrl = `${baseUrl}/api/url/${shortId}`; // Adjusted format

    const url = new URL({ originalUrl, shortUrl });
    await url.save();

    res.status(200).json({ shortUrl });
});

// GET route to redirect to original URL
router.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;
    const url = await URL.findOne({ shortUrl: `${req.protocol}://${req.get('host')}/api/url/${shortId}` }); // Adjusted format
    if (url) {
        url.clicks++;
        await url.save();
        res.redirect(url.originalUrl);
    } else {
        res.status(404).json({ msg: 'URL not found' });
    }
});

module.exports = router;
