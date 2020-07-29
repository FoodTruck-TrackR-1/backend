const express = require('express');
const router = express.Router();

const Diner = require('./dinersModel');

router.get('/:id/favorites', (req, res) => {
    const { id } = req.params;

    Diner.getFavorites(id)
        .then(list => {
            res.status(200).json({ error: false, data: list });
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error });
        })
})
router.post('/:id/favorites/:truckID', (req, res) => {
    const { id } = req.params;
    const { truckID } = req.params;
    Diner.addFavorite(id, truckID)
        .then(favorite => {
            res.status(201).json({ error: false, data: favorite });
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error });
        })
})
router.delete('/:id/favorites/:truckID', (req, res) => {
    const { truckID } = req.params;
    const { id } = req.params;

    Diner.removeFavorite(id, truckID)
        .then(deleted => {
            res.json({ error: false, data: deleted });
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error });
        })
})

router.get('/trucks', (req, res) => {
    const { id } = req.params;

    Diner.findTrucks(id)
        .then(trucks => {
            res.status(200).json({ error: false, data: trucks });
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error });
        })
})
router.get('/trucks/:id', (req, res) => {
    const { id } = req.params;

    Diner.findTruck(id)
        .then(truck => {
            res.status(200).json({ error: false, data: truck });
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error });
        })
})
router.get('/trucks/:id/menu', (req, res) => {
    const { id } = req.params;

    Diner.findMenu(id)
        .then(menu => {
            res.status(200).json({ error: false, data: menu });
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error });
        })
})

module.exports = router;