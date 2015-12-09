var express = require('express'),
    underscore = require('underscore'),
    bodyParser = require('body-parser'),
    app = express();

app.use(express.static(__dirname + "/public"))
app.use(bodyParser());
app.listen(3000);
