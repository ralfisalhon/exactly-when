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

app.post('/createevent', (req, res) => {
    let event_id = crypto.randomBytes(16).toString('hex');
    db.collection('ids', (error, collection) => {
        if (error) {
            console.log("collectionerror: " + error);
            res.sendStatus(500);
            return;
        }
        
        let arr = collection.find().toArray();
        while (arr.indexOf(event_id) === -1) {
            event_id = crypto.randomBytes(16).toString('hex');
        }
        collection.insert({id: event_id});

        res.status(200);
        res.send({id: event_id});
    });
});

/* Listen in on a port. */
app.listen(process.env.PORT || 3000);
