var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var promise = require('bluebird');
var options = {
    promiseLib: promise
};

var db = require('../api/queries');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/traveler', function (req, res, next) {
    res.render('traveler', {title: 'Express'});
});
router.get('/itinerary', function (req, res, next) {
    res.render('itinerary', {title: 'Express'});
});
module.exports = router;
router.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());
router.post('/process-travel-data', function (req, res) {
    console.log(req.body.from);
    console.log(req.body.to);
    console.log(req.body.calendar);
    console.log(req.body.passenger_type);
    res.render('traveler', {
        title: 'Focus',
        from: req.body.from,
        to: req.body.to,
        calendar: req.body.calendar,
        passenger_type: req.body.passenger_type
    });


});
router.post('/process-traveler-data', function (req, res) {
    console.log(req.body.from);
    console.log(req.body.to);
    console.log(req.body.date);
    console.log(req.body.passenger_type);
    console.log(req.body.first_name);
    console.log(req.body.last_name);
    res.render('itinerary', {
        title: 'Focus',
        from: req.body.from,
        to: req.body.to,
        calendar: req.body.calendar,
        passenger_type: req.body.passenger_type,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });


});

router.post('/api/ticket', function saveTravelData(req, res, next) {
    console.log(req.body.from);
    console.log(req.body.to);
    console.log(req.body.date);
    console.log(req.body.passenger_type);
});


