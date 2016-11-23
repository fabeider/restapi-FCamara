var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var jwt    = require("jsonwebtoken"); // used to create, sign, and verify tokens
var ObjectID = mongodb.ObjectID;

var PRODUCTS_COLLECTION = "products";
var USERS_COLLECTION = "users";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://localhost/test', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// PRODUCTS API ROUTES BELOW

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
  console.log("GET");
  db.collection(PRODUCTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get products.");
    } else {
      console.log(docs);
      res.status(200).json(docs);
    }
  });
});

 app.post("/auth", function(req, res) {
  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(USERS_COLLECTION).findOne({ name: req.body.name }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      if (!doc) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (doc) {
      
      // check if password matches
      if (doc.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(doc, "secret", {
          expiresIn: '1m' // expires in 1 minute
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }
  }
});
});



