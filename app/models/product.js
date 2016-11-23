var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema   = new Schema({
  id: Number,
  name: String,
  price: String
});

var Product= mongoose.model('Product', ProductSchema);
module.exports = Product;
