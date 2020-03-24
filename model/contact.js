var mongoose = require('mongoose');

var contact = new mongoose.Schema({ name: 'string', tuoi: 'number', phone: 'number' }, {collection: 'contact'});

module.exports = mongoose.model('contact', contact);
