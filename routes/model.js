const express = require('express')
const router = express.Router()
const problem = require('../models/model')

router.get('/list', async(req,res) => {
    try{
           const aliens = await problem.find()
           res.json(aliens)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/create', async(req,res) => {
    const alien = new problem({
        name: req.body.name,
        location: {
            type :req.body.type,
            coordinates:[
                req.body.lat,
                 req.body.long, 
            ]
        },
        minimum: req.body.minimum,
        delFee: req.body.delFee,
        status: req.body.status
    })

    try{
        const a1 =  await alien.save() 
        console.log(a1);
        res.json(a1)
    }catch(err){
        console.log(error)
        res.send('Error')
    }
})

router.put('/update/:id',async(req,res)=> {
    try{
        const app = await problem.findById(req.params.id) 
        app.name = req.body.name,
        app.minimum= req.body.minimum,
       app.delFee= req.body.delFee,
        app.status= req.body.status,
        app.location= {
            type :req.body.type,
            coordinates:[
                req.body.lat,
                 req.body.long, 
            ]
        }
        const a1 = await app.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

router.post('/checklocation', async(req,res) => {
    const alien = new problem({
        name: req.body.name,
        location: {
            coordinates:[
                req.body.lat,
                 req.body.long, 
            ]
        }
    })

    try{
        const a1 =  await alien.save() 
        Distance = await problem.find(
            {
             location :{
              $near:
              {
                $geometry: {
                  type: "Point",
                  coordinates: [req.body.long, req.body.lat]
                },
             $maxDistance:1000*1000
            }
          }
         }
         );
        console.log(a1);
        res.json(Distance);
    }catch(err){
        console.log(error)
        res.send('Error')
    }
})

module.exports = router