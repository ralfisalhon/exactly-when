/* Require server dependencies. */
var express    = require('express');
var path       = require('path');
var crypto     = require('crypto');
var bodyparser = require('body-parser');
var app = express();

/* Set up app for use. */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.status(200);
    res.send("Hello!");
});

/* Listen in on a port. */
app.listen(process.env.PORT || 3000);