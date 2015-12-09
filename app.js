var express = require('express'),
    bodyParser = require('body-parser'),
    utility = require('./utility'),
    app = express();
app
  .use(express.static(__dirname + "/public"))
  .get('/data', function (req, res) {
    res.send(utility.utilities.allData());
  })
  .post('/username', function (req, res) {
    req.on('data', function (data) {
      var temp = decodeURI(data);
      // send all templates string
      res.json(
        {header: utility.utilities().Compile(temp).header,
        listItem: utility.utilities().Compile(temp).listItem}
      );
    });
  })
  .use(bodyParser())
  .listen(8080);
