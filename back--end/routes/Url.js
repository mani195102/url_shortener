const express = require('express');
const URL = require('../model/Url');
const shortid = require('shortid');
const router = express.Router();

router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = shortid.generate();
    const url = new URL({ originalUrl, shortUrl });
    await url.save();
    res.status(200).json(url);
});

router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const url = await URL.findOne({ shortUrl });
    if (url) {
        url.clicks++;
        await url.save();
        res.redirect(url.originalUrl);
    } else {
        res.status(404).json({ msg: 'URL not found' });
    }
});






module.exports = router;
