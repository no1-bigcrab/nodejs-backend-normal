var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'testdb',
  password: '',
  port: 5432,
})


/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * from contact', (err, res) => {
//    //pool.end()
  })
  res.render('index', { title: 'Express' });
});

// thêm dữ liệu
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Add dữ liệu vào db' });
});
router.post('/add', function(req, res, next) {
  var name = req.body.name, age = req.body.age;
  pool.query('INSERT INTO contact (name,age) VALUES ($1,$2)',[name, age], (err, res) => {
    // console.log(err, res)
    // pool.end()
  })
  res.redirect('/view');
});

router.get('/view', function( req, res, next){
  var name = req.body.name, age = req.body.age;
  pool.query('SELECT * from contact ORDER BY "id" ASC', (err, dataDb) => {
    //console.log(dataDb.rows);
    res.render('view-data', { title: 'Add dữ liệu vào db', data : dataDb.rows });
    // pool.end();
  })
 
});
// xoá dữ liệu
router.get('/delete/:id', function( req, res, next){
  var id_delete = req.params.id;
  pool.query('DELETE from contact where id = $1',[id_delete], (err, dataDb) => {
    //console.log(dataDb.rows);
    //pool.end();
    res.redirect('/view')
  })
 
});
// sửa dữ liệu.
router.get('/edit/:id', function( req, res, next){
  var id_edit = req.params.id;
  pool.query('SELECT * from contact where id = $1',[id_edit], (err, dataDb) => {
    res.render('edit-data', { title: 'Sửa dữ liệu vào db', data : dataDb.rows });
  })
});
//post data id
router.post('/edit/:id', function(req, res, next) {
  var id_edit = req.params.id;
  var name = req.body.name, age = req.body.age;
  pool.query('UPDATE contact SET name = $1, age = $2 where id = $3',[name, age, id_edit], (err, res) => {
    
  })
  res.redirect('/view');
});

module.exports = router;
