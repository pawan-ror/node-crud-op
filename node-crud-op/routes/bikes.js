var express = require('express');
var Bike = require('../models').Bike;
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
    Bike.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            //console.log('Book not found');
            res.status(400).json('Bike not found');
        }
    }); 
};
/* GET users listing. */
router.get('/', function(req, res, next) {
	 Bike.findAll().then(bike => {
        res.render('bikes/index', { title: 'Express',bikes:bike });
    });
 
});
/* Load create view*/
router.get('/create', function(req, res, next) {
  res.render('bikes/new', { title: 'Express' });
});
/* Insert data in database*/
router.post('/create', function(req, res){
    Bike.create({
        name: req.body.name,
        location: req.body.location,
       
    }).then(bike => {
        /*console.log(book.get({
            plain: true
        }));*/
        res.redirect('/bikes/');
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});
router.get('/:id', [checkIDInput, checkIDExist],function(req,res){
	Bike.findById(req.params.id).then(bike=>{
		res.render('bikes/edit',{title:express,bike:bike});
	});
})
router.post('/:id',[checkIDInput, checkIDExist], function(req, res){
		Bike.update({
			name:req.body.name,
			location:req.body.location,
		},
		{
			where:{id:req.params.id}
		}).then(result=>{ 
			res.redirect('/bikes/');
		}).error(err => {
        	res.status(405).json('Error has occured');
    	});
});
router.get('/delete/:id',[checkIDInput,checkIDExist],function(req,res){
	Bike.destroy({
		where:{id:req.params.id}
	}).then(result=>{
		res.redirect('/bikes/');
	}).error(err=>{
		rest.status(405).json('Error has occured');
	});

})
module.exports = router;
