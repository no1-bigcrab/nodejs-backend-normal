var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var convetObject_data = require('mongodb').ObjectID;

const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'contact';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET add page. */
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Add new data.' });
});

/* post add page. */
router.post('/add', function(req, res, next) {
  // data
  var data = {
    "name" : req.body.name,
    "phone" :req.body.phone
  }

  //insert

  const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Insert some documents
    collection.insert(data, function(err, result) {
      assert.equal(err, null);
    });
  }

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
  
    const db = client.db(dbName);
  
    insertDocuments(db, function() {
      client.close();

    });
  });
  res.redirect('/view');


});
// xem dữ liệu

router.get('/view', function(req, res, next) {

  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log(docs)
      callback(docs);
    });
  }

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      findDocuments(db, function( dataDb ) {
        res.render('view-data', { title: 'View data.', data : dataDb });
        //console.log(dataDb);
        client.close();
      });
    });

});

//Xoá dữ liệu
router.get('/delete/:id', function(req, res, next) {
  var id_delete = convetObject_data( req.params.id );
  // thực hiện xoá
  const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Delete document where a is 3
    collection.deleteOne({ _id : id_delete }, function(err, result) {
      assert.equal(err, null);
      console.log("Xoá thành công!!!");
      callback(result);
    });
  }
  // kết nối xoá
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
        removeDocument(db, function() {
          client.close();

        });
  });
  res.redirect('/view');


});

//sửa dữ liệu
router.get('/edit/:id', function(req, res, next) {
  var id_edit = convetObject_data( req.params.id );

  // dựa vào id để sửa

  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Find some documents
    collection.find({ _id : id_edit }).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      callback(docs);
    });
  }
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      findDocuments(db, function( dataDb ) {
        res.render('edit-data', { title: 'Edit data.', data : dataDb });
        //console.log(dataDb);
        client.close();
      });
    });

});

// lấy form sửa
router.post('/edit/:id', function(req, res, next) {
  var id_edit = convetObject_data( req.params.id );
  var data = {
    "name" : req.body.name,
    "phone" :req.body.phone
  }
  const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ _id : id_edit }
      , { $set: data }, function(err, result) {
      assert.equal(err, null);
    });
  }
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);  
    const db = client.db(dbName);
  
      updateDocument(db, function() {
        client.close();
      });
  });
  res.redirect('/view');

  //res.render('add', { title: 'Add new data.' });
});
module.exports = router;
