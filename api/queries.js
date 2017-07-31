const promise = require('bluebird');
const options = {
    promiseLib: promise
};
const pgp = require('pg-promise')(options);
const connectionString = 'postgres://docker:docker@localhost:5432/docker';
const db = pgp(connectionString);

function saveTravelData(req, res, next) {
    const id = +new Date();
    req.body.id = id;
    db.none('insert into travel_data(from_city, to_city, date, passenger_type, ticket_id)' +
        'values(${from}, ${to}, ${date}, ${passenger_type}, ${id})', req.body)
        .then(function () {
            res.render('traveler', {
                title: 'Focus',
                ticket_id: id
            })
        })
        .catch(function (err) {
            return next(err);
        });
}

function savePassengerData(req, res, next) {
    console.log("Persisting passenger data.");
    console.log(req.body.gender);
    db.none('insert into passenger_data(gender, first_name, last_name, country_of_residence, ticket_id)' +
        'values(${gender}, ${first_name}, ${last_name}, ${country}, ${ticket_id})', req.body)
        .then(function () {
            try {
                db.one('select * from passenger_data p join travel_data t on t.ticket_id = p.ticket_id where t.ticket_id = $1', req.body.ticket_id)
                    .then(function (data) {
                        // success;
                        console.log(data);
                        res.render('itinerary', {
                            title: 'Ticket',
                            data: data
                        })
                    })
                    .catch(function (error) {
                        // error;
                        console.log(error);
                    });
            }
            catch (e) {
                console.log(e);
            }

        })
        .catch(function (err) {
            return next(err);

        });
    console.log("Passenger data persisted.");
}

function getTicket(ticket_id, callback) {
    return db.one('SELECT * ' +
        'FROM travel_data t JOIN passenger_data p ON t.ticket_id = p.ticket_id ' +
        'WHERE t.ticket_id = $1', ticket_id)
        .then(data => {
            console.log('ticket:', data);
            return data;
        });
}


module.exports = {
    saveTravelData: saveTravelData,
    savePassengerData: savePassengerData
};
