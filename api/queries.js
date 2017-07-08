var promise = require('bluebird');
var options = {
    promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'jdbc:postgresql://localhost:5432/docker';
var db = pgp(connectionString);

function saveTravelData(req, res, next) {
    db.none('insert into travel_data(from, to, date, passenger_category)' +
    'values(${from}, ${to}, ${date}, ${passenger_category})', req.body)
        .then(function () {
            console.log(req.body.from);
            console.log(req.body.to);
            console.log(req.body.date);
            console.log(req.body.passenger_type);
            res.render('itinerary', { title: 'Focus'})
                .json({
                    status: 'success',
                    message: 'Travel data saved'
                });
            })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    saveTravelData: saveTravelData
};