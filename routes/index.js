var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploadModel = require('../model/contact.js')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true});

var image_data_push = [];

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ '-' + file.originalname )
  }
})
 
var upload = multer({ storage: storage })
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', upload.any(), function(req, res, next) {
  var images_name = req.files[0].path;
  
  image_data_push.push(images_name);
  //console.log(image_data_push);
  res.status(200).send(res.files);

  //res.render('index', { title: 'Express' });
});

router.post('/upProduct', function(req, res, next) {

  var name = req.body.name,
      price = req.body.price,
      short_title = req.body.short_title,
      description = req.body.description;

  var oneObject = {
      "name" : name,
      "price" : price,
      "image" : image_data_push,
      "short_title" : short_title,
      "description" : description
  }

  var data = new uploadModel(oneObject);
  data.save();

  res.render('index', { title: 'Express' });
});

router.get('/view', function(req, res, next) {
  uploadModel.find({}, function( error , data_product ){
    // console.log( error, data_product );
    res.render('view-data', { title: 'View data object', data: data_product });
  })
});
module.exports = router;
