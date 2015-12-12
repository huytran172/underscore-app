var express = require('express'),
    bodyParser = require('body-parser'),
    utility = require('./utility'),
    app = express();
app
  .use(express.static(__dirname + "/public"))
  .get('/data', function (req, res) {
    res.send(utility.utilities.allData());
  })
  .post('/data', function (req, res) {
    req.on('data', function (data) {
      var temp = JSON.parse(data),
          addInfo = JSON.parse(temp.content);
      utility.utilities.addToJSON(addInfo);
      utility.utilities.writeToFile();
    });
    res.end();
  })
  .post('/username', function (req, res) {
    req.on('data', function (data) {
      var temp = decodeURI(JSON.parse(data).content);
      utility.utilities.writeToFile();
      // send all templates string as a json object
      res.json(
        {
          username: utility.utilities.Compile(temp).username,
          header: utility.utilities.Compile(temp).header,
          listItem: utility.utilities.Compile(temp).listItem
        }
      );
    });
  })
  .use(bodyParser())
  .listen(3000);
