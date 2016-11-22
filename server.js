var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var Mongoose = require('Mongoose');

var PRODUCTS_COLLECTION = "products";

var app = express();
app.use(express.static(__dirname + "/api"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db = Mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('Conectado ao MongoDB.')
  // Vamos adicionar nossos Esquemas, Modelos e consultas aqui
});

Mongoose.connect('mongodb://localhost/test');

// START THE SERVER
// =============================================================================
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

// productS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/products"
 *    GET: finds all products
 *    POST: creates a new product
 */

app.get("/products", function(req, res) {
});

app.post("/products", function(req, res) {
});

/*  "/products/:id"
 *    GET: find product by id
 *    PUT: update product by id
 *    DELETE: deletes product by id
 */

app.get("/products/:id", function(req, res) {
});

app.put("/products/:id", function(req, res) {
});

app.delete("/products/:id", function(req, res) {
});
