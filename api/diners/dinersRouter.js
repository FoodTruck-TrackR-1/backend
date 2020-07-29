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
router.post('/favorites', (req, res) => {
    const favorite = req.body;

    Diner.addFavorite(favorite)
        .then(favorite => {
            res.status(201).json({ error: false, data: favorite });
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error });
        })
})
router.delete('/favorites/:id', (req, res) => {
    const { id } = req.params;
    
        Diner.removeFavorite(id)
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