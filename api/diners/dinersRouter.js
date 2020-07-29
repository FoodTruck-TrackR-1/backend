const express = require('express');
const router = express.Router();

const Diner = require('./dinersModel');

router.get('/favorites/:id', (req, res) => {
    const { id } = req.params;

    Diner.getFavorites(id)
        .then(list => {
            res.status(200).json({ error: false, data: list });
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error });
        })
})

router.post('/favorites', (req, res) => {
    Diner.addFavorite()
        .then(favorite => {
            res.status(201).json({ error: false, data: favorite });
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error });
        })
})

router.delete('/favorites/:truckID', (req, res) => {
    const { truckID } = req.params;

    Diner.removeFavorite(truckID)
        .then(deleted => {
            res.json({ error: false, data: deleted });
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error });
        })
})

module.exports = router;