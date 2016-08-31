var express = require('express');
var router = express.Router();
var request = require("request")


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/riot.txt', function(req, res, next) {
	res.render('riot', { title: 'Express' });
});

router.get('/lookup', function(req, res, next) {
	if (req.query.champion == null) {
		res.render('lookup', { title: 'Express' });
	}

	else {
		console.log(req.query)
		champion = req.query.champion

		var startingUrl = "http://api.champion.gg/champion/"+champion+"/items/starters/mostPopular?api_key=6073c69232cbf21a6b565f6dbadf23e6"
		var finishedUrl = "http://api.champion.gg/champion/"+champion+"/items/finished/mostPopular?api_key=6073c69232cbf21a6b565f6dbadf23e6"
		var itemsURL = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=gold&locale=en_US&api_key=3a5fa3f0-c714-4a0a-9dab-955dcdc04bca"

		// get list of all items
		request({url: itemsURL, json: true
		}, function (error, response, allItems) {
			if (!error && response.statusCode === 200) {
				
				// console.log(allItems.data)
				// get the finished items
				request({url: finishedUrl, json: true
				}, function (error, response, finishedItems) {
					if (!error && response.statusCode === 200) {
						//console.log(finishedItems) // Print the json response

						// get the starting items
						request({url: startingUrl, json: true
						}, function (error, response, startingItems) {
							console.log(startingItems)
							if (!error && response.statusCode === 200) {
								startingFinal = []
								startingItems[0].items.forEach(function(value, index)
								{
									startingFinal.push([value, allItems.data[value].name])
								})
								
								finishedFinal = []
								finishedItems[0].items.forEach(function(value, index){
									finishedFinal.push([value, allItems.data[value].name])
								})

 								console.log(startingFinal) // Print the json response
								res.render('lookup', { 
									title: 'Express', 
									startingItem: startingFinal, 
									finalItems: finishedFinal,
									champion: champion});
							}
							else
								return
						})
						// end starting items

					}
					else
						return
				})
				//end finished items

			}
			else 
				return
		})
		// end list of all items

	}


	
});

module.exports = router;
