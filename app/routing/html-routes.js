// Dependencies
var path = require('path');

// Routes
module.exports = function (app) {

	// Send the survey page
	app.get('/survey', function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	// Default to home page when no other route found
	app.use(function (req, res) {
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});
};
