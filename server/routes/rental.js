const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
let ObjectID = require("mongodb").ObjectID;

router.get('',function(req,res){
    Rental.find({},function(err,foundRentals){

    res.json(foundRentals);
    });
});

router.get('/:id',function(req,res){
    const rentalID = req.params.id;
    console.log(rentalID)
    Rental.findOne({_id: ObjectID(rentalID) },function(err,foundRental){
        if(err){
            res.status(422).send({error:[{title:'rental error', detail:'could not find rental'}]});
        }

    res.json(foundRental);
    });
});

module.exports = router;