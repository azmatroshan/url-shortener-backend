const URL = require('../models/url');
const ShortUniqueId = require('short-unique-id')

async function handleShortURL(req, res) {
    const body = req.body;
    if (!body) return res.status(400).json({ msg: "No data in request" });
    if (!body.redirectURL) return res.status(400).json({ msg: "url is required" });

    const uid = new ShortUniqueId({ length: 8 });
    const shortId = uid.rnd();

    await URL.create({
        shortId: shortId,
        redirectURL: body.redirectURL,
        visitHistory: []
    });

    res.status(201).json({
        shortId: `${shortId}`
    })
};

async function handleAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

async function handleVisitHistory(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId, },
        {
            $push: {
                visitHistory: { timestamp: Date.now() }
            }
        });

    res.redirect(entry.redirectURL)
}

module.exports = {
    handleShortURL,
    handleAnalytics,
    handleVisitHistory
}