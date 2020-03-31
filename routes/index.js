var express = require('express');
var router = express.Router();
var multer = require('multer');

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
  console.log(image_data_push);
  res.status(200).send(res.files);

  //res.render('index', { title: 'Express' });
});
module.exports = router;
