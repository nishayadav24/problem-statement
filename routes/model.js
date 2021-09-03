const express = require('express')
const router = express.Router()
const problem = require('../models/model')

router.get('/list', async (req, res) => {
    try {
        const aliens = await problem.find()
        res.json(aliens)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/create', async (req, res) => {
    let location = {
        type: "Point",
        coordinates: [req.body.lng, req.body.lat],
    }
    const alien = new problem({
        name: req.body.name,
        location: location,
        minimum: req.body.minimum,
        delFee: req.body.delFee,
        status: req.body.status
    })

    try {
        const a1 = await alien.save()
        console.log(a1);
        res.json(a1)
    } catch (err) {
        console.log(err)
        res.send('Error')
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const app = await problem.findById(req.params.id)
           app.name = req.body.name,
            app.minimum = req.body.minimum,
            app.delFee = req.body.delFee,
            app.status = req.body.status
        const a1 = await app.save()
        res.json(a1)
    } catch (err) {
        res.send('Error')
    }

})

router.post('/checklocation', async (req, res) => {
    let { lng, lat } = req.body;
    try {
        await problem.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [lng, lat] },
                    distanceField: "dist.calculated",
                    minDistance: 20000,
                    includeLocs: "dist.location",
                    spherical: true
                }
            }
        ]).exec((err, results) => {
            console.log(results,err);
            res.json(results);
        });

    } catch (err) {
        console.log(err)
        res.send('Error')
    }
})

module.exports = router