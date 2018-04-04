var express = require('express');
var Owner = require('../models').Owner;
var router = express.Router();
// middleware
var checkIDInput = function (req, res, next) {  
    //console.log('Check ID input');
    if(isNaN(req.params.id)) {
        //console.log('Invalid ID supplied');
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkIDExist = function (req, res, next) {  
    //console.log('Check ID exist');
    Owner.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            //console.log('Book not found');
            res.status(400).json('Bike not found');
        }
    }); 
};
router.get('/',function(req,res){
    Owner.findAll().then(owner=>{
        res.render('owner/index',{title:express,owners:owner});
    });
});
router.get('/create',function(req,res){
    res.render('owner/new',{title:express});
});
router.post('/create',function(req,res){
    Owner.create({
        name:req.body.name,
        surname:req.body.surname,
        address:req.body.address,
        phone:req.body.phone
    }).then(owner=>{
        res.redirect('/owners/');
    }).error(err=>{
        res.status(405).json('Error has occured');
    })
});
router.get('/:id',[checkIDInput,checkIDExist],function(req,res){
    Owner.findById(req.params.id).then(owner=>{
        res.render('owner/edit',{title:express,owner:owner});
    });
});
router.post('/:id',[checkIDInput,checkIDExist],function(req,res){
    Owner.update({
        name:req.body.name,
        surname:req.body.surname,
        address:req.body.address,
        phone:req.body.phone
    },
    {
        where:{id:req.params.id}
    }).then(owner=>{
        res.redirect('/owners');
    }).error(err=>{
        res.status(405).json('Error has occured');  
    });
});
router.get('/delete/:id',[checkIDInput,checkIDExist],function(req,res){
    Owner.destroy({
        where:{id:req.params.id}
    }).then(owner=>{
        res.redirect('/owners/');
    }).error(err=>{
        res.status(405).json('Error has occured');  
    });
});
module.exports = router;