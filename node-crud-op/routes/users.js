var express = require('express');
var User = require('../models').User;
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
    User.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            //console.log('Book not found');
            res.status(400).json('User not found');
        }
    }); 
};
/* GET users listing. */
router.get('/', function(req, res, next) {
	 User.findAll().then(user => {
        res.render('users/index', { title: 'Express',users:user });
    });
 
});
router.get('/create', function(req, res, next) {
  res.render('users/new', { title: 'Express' });
});
router.post('/create', function(req, res){
    User.create({
        name: req.body.name,
        surname: req.body.surname,
        mobile: req.body.mobile,
        email:req.body.email
    }).then(user => {
        /*console.log(book.get({
            plain: true
        }));*/
        res.redirect('/users/');
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});
router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    //console.log('Get book by id');
    User.findById(req.params.id).then(user => {
        //console.log(book);
        res.render('users/edit', { title: 'Express',user:user });
    });
});
router.post('/:id', [checkIDInput, checkIDExist], function(req, res){
    //console.log('Update book by id');
    User.update({
        name: req.body.name,
        surname: req.body.surname,
        mobile: req.body.mobile,
        email:req.body.email
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.redirect('/users/');
    }).error(err => {
        res.status(405).json('Error has occured');
    });;
});
router.get('/delete/:id', [checkIDInput, checkIDExist], function(req, res){
    //console.log('Delete book by id');
    User.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.redirect('/users/');
    });
});
module.exports = router;
