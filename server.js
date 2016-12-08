// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Express configuration
var app = express();
var PORT = process.env.PORT || 8080;

// BodyParser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes for this app
//require("./app/routing/api-routes.js")(app);
require("./app/routing/html-routes.js")(app);

// Server starts here
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
