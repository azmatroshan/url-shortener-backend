const express = require('express');
const router = express.Router();
const controller = require('../controllers/urlController')
const URL = require('../models/url')

router.get('/', (req, res) => {
    res.status(200).send({
        msg: 'Welcome to the URL Shortener!'
    });
});

router.get('/:shortId', controller.handleVisitHistory);

router.get('/analytics/:shortId', controller.handleAnalytics);

router.post('/', controller.handleShortURL);

module.exports = router;