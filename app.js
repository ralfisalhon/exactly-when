/* Require server dependencies. */
var express    = require('express');
var path       = require('path');
var crypto     = require('crypto');
var bodyparser = require('body-parser');
var app = express();

// Configure MongoDB
var mongoUri = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + 
               '@' + process.env.DBURL
var mongo  = require('mongodb').MongoClient;
var format = require('util').format;
var db = mongo.connect(mongoUri, function(error, dbconnection) {
    if (error) {
        console.log("Error establishing MongoDB connection.");
        return;
    } else {
        console.log("MongoDB connection established.");
    }
    
    db = dbconnection;
});

/* Set up app for use. */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.status(200);
    res.send("Hello!");
});

// attendee schema
/*
 * attendee_name - string
 * available_hrs - array of ints [900, 1200, 1500, 1830]
 */

// GET /eventinfo
// Takes:   id : string
// Returns: {id : string, 
//           event_name : string, 
//           time_created : string,
//           attendees : [attendee_name : string, hours : [int]]}
app.get("/eventinfo", (req, res) => {
    let id = req.query.id;

    if (id == null) {
        res.status(400);
        res.send({error: "Please specify an id."});
        return;
    }

    db.collection("events", (error, collection) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        collection.findOne({id: id}, (error, result) => {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else if (!result) {
                res.status(400);
                // TODO - reenable CORS restrictions once live
                res.header("Access-Control-Allow-Origin", "*");
                res.send({error: "Invalid event id."});
                return;
            }

            res.status(200);
            // TODO - reenable CORS restrictions once live
            res.header("Access-Control-Allow-Origin", "*");
            res.send(result);
            return;
        });
    });
});

// POST /createevent
// Takes:   event_name : string
// Returns: {id : string}
app.post("/createevent", (req, res) => {
    let event_name = req.body.event_name;

    if (event_name == null) {
        res.status(400);
        res.send({error: "Please specify an event_name."});
        return;
    }

    let event_id = crypto.randomBytes(8).toString('hex');
    // TODO - validate that event_id does not already identify an event.
    
    db.collection("events", (error, collection) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        
        collection.insert({id: event_id, 
                           event_name: event_name, 
                           time_created: new Date, 
                           attendees: []});
        res.status(200);
        // TODO - reenable CORS restrictions once live
        res.header("Access-Control-Allow-Origin", "*");
        res.send({id: event_id});
    });
});

// POST /addattendee
// Takes:   attendee_name : string
//          hours : [int]
// Returns: 200 if successful
app.post("/addattendee", (req, res) => {
    let id    = req.body.id;
    let name  = req.body.attendee_name;
    let hours = req.body.hours;

    if (id == null || name == null || hours == null) {
        res.status(400);
        res.send({error: "Please specify an id, attendee_name, and hours."});
        return;
    }

    db.collection("events", (error, collection) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        
        // Get the event from the db.
        collection.findOne({id: id}, (error, result) => {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else if (!result) {
                res.status(400);
                res.header("Access-Control-Allow-Origin", "*");
                res.send({error: "Invalid event id."});
                return;
            } else if (result.attendees.map(a => (a.name)).includes(name)) {
                res.status(400);
                res.header("Access-Control-Allow-Origin", "*");
                res.send({error: "Attendee with name already exists."});
                return;
            }

            // TODO: verify that hours is a valid list of valid integers.

            // Update the attendees.
            result.attendees.push({name: name, hours: JSON.parse(hours)});
            collection.update({id: id}, {attendees: result.attendees});
            
            res.header("Access-Control-Allow-Origin", "*");
            res.sendStatus(200);
        });
    });
});

/* Listen in on a port. */
app.listen(process.env.PORT || 3000);
