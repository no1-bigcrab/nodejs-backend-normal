var express = require('express');
var router = express.Router();
var contactModel = require('../model/contact.js')
var conact

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Trang view xem dữ liệu*/ 
router.get('/view', function(req, res, next) {
  contactModel.find({}, function(err, dataDb){
    res.render('view-data', { title: 'Xem dữ liệu', data : dataDb});
  })
  
});

// Trang Xoá dữ liệu
router.get('/delete/:id', function(req, res, next) {
  var id_delete = req.params.id;

  contactModel.findByIdAndRemove(id_delete).exec();
  res.redirect('/view');

});

// Trang Xoá dữ liệu
router.get('/edit/:id', function(req, res, next) {
  var id_edit = req.params.id;
  contactModel.find( { _id : id_edit }, function( err, dataDb ){
    res.render( 'edit-data', { title: 'Sửa dữ liệu', data : dataDb })
  })
});

router.post('/edit/:id', function(req, res, next) {
  var id_edit = req.params.id;
  contactModel.findById( id_edit, function( err, data ){
    if( err ) return handleError(err);
    data.name = req.body.name;
    data.tuoi = req.body.tuoi;
    data.phone = req.body.phone;
    data.save();
    res.redirect('/view');
  });
});

// them du lieu.accordion

// Trang thêm dữ liệu
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Thêm dữ liệu'});
});
router.post('/add', function(req, res, next) {
  var data = {
    'name' : req.body.name,
    'tuoi' : req.body.tuoi,
    'phone' : req.body.phone
  }
  var  AddData = new contactModel(data);
  AddData.save();
  res.redirect('/view');

});

module.exports = router;
