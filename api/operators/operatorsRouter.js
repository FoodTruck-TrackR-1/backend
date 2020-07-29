const express = require('express');
const router = express.Router();

const Operator = require('./operatorsModel');

router.get('/trucks/:id', (req, res) => {
    const { id } = req.params;

    Operator.findTrucks(id)
        .then(trucks => {
            res.status(200).json({ error: false, data: trucks});
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error});
        })
})

router.post('/trucks', (req, res) => {
    const truck = req.body;
    
    Operator.addTruck(truck)
        .then(truck => {
            res.status(201).json({ error: false, data: truck});
        })
        .catch(error => {
            res.status(500).json({error: true, message: error});
        })
})

router.put('/trucks/:truckID', (req, res) => {
    const changes = req.body;
    const { truckID } = req.params;

    Operator.findTruck(truckID)
        .then(truck => {
            Operator.updateTruck(changes, truckID)
                .then(updated => {
                    res.status(200).json({ error: false, data: updated});
                })
                .catch(error => {
                    res.status(500).json({ error: true, message: error});
                })
        })
        .catch(error => {
            res.status(404).json({ error: true, message: 'truck does not exist'});
        })
})

router.delete('/trucks/:truckID', (req, res) => {
    const { truckID } = req.params;

    Operator.findTruck(truckID)
    .then(truck => {
        Operator.removeTruck(truckID)
            .then(deleted => {
                res.json({ error: false, data: deleted });
            })
            .catch(error => {
                res.status(500).json({ error: true, message: error});
            })
    })
    .catch(error => {
        res.status(404).json({ error: true, message: 'truck does not exist'});
    })
 
})

router.get('/menu/:id', (req, res) => {
    const { id } = req.params;

    Operator.findItems(id)
        .then(items => {
            res.status(200).json({ error: false, data: items});
        })
        .catch(error => {
            res.status(500).json({ error: true, message: error});
        })
})
router.post('/menu', (req, res) => {
    const item = req.body;
    
    Operator.addMenuItem(item)
        .then(item => {
            res.status(201).json({ error: false, data: item});
        })
        .catch(error => {
            res.status(500).json({error: true, message: error});
        })
})
router.put('/menu/:itemID', (req, res) => {
    const changes = req.body;
    const { itemID } = req.params;

    Operator.findItem(itemID)
        .then(item => {
            Operator.updateItem(changes, itemID)
                .then(updated => {
                    res.status(200).json({ error: false, data: updated});
                })
                .catch(error => {
                    res.status(500).json({ error: true, message: error});
                })
        })
        .catch(error => {
            res.status(404).json({ error: true, message: 'Menu Item does not exist'});
        })
})
router.delete('/menu/:itemID', (req, res) => {
    const { itemID } = req.params;

    Operator.findItem(itemID)
    .then(item => {
        Operator.removeItem(itemID)
            .then(deleted => {
                res.json({ error: false, data: deleted });
            })
            .catch(error => {
                res.status(500).json({ error: true, message: error});
            })
    })
    .catch(error => {
        res.status(404).json({ error: true, message: 'Menu Item does not exist'});
    })
})

module.exports = router;