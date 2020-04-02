var mongoose = require('mongoose');

var contact = new mongoose.Schema({ 
    name: { type : String },
    image: { type : Array },
    price: { type : Number }, 
    short_title: { type : String }, 
    description: { type : String } 
}, {
    collection: 'data'
});

module.exports = mongoose.model('data', contact);
