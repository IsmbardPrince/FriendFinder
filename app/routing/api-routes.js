// Dependencies
var path = require('path');
var friends = require('../data/friends.js');

// Routes
module.exports = function (app) {

	// Send a JSON of the friends array
	app.get('/api/friends', function (req, res) {
		res.json(friends);
	});

	// Process the new friend data
	app.post('/api/friends', function (req, res) {
		// get the data for the new friend
		var scores = [];
		for (var i = 0; i < req.body.scores.length; i++) {
			scores[i] = req.body.scores[i];
		}
		var newFriend = {
			name: req.body.name,
			photo: req.body.photo,
			scores: scores
		};
		//console.log(newFriend);
		// iterate through current friends looking for the best match
		var curBestMatch = { ndx: -1, matchScore: -1 };
		for (var i = 0; i < friends.length; i++) {
			curBestMatch = bestMatch(newFriend, friends[i], i, curBestMatch);
		}
		// add the new friend to the friends list
		friends.push(newFriend);
		// return the best friend match name and photo
		res.json({ name: friends[curBestMatch.ndx].name, photoURL: friends[curBestMatch.ndx].photo });
	});
};

function bestMatch(friend1, friend2, ndxFriend2, bestMatch) {
	// compute the match score
	var matchScore = 0;
	for (var i = 0; i < friend1.scores.length; i++) {
		matchScore += Math.abs(friend1.scores[i] - friend2.scores[i]);
	}
	// if this score is lower than the current best match score then return friend2 as
	// the best match or if this is the first score computed, it is by default the best score
	if (matchScore < bestMatch.matchScore || bestMatch.ndx < 0) {
		return { ndx: ndxFriend2, matchScore: matchScore };
	// otherwise return the existing best match as still the best match
	} else {
		return bestMatch;
	}
}
