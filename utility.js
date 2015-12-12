/**
 * @type {_|exports|module.exports}
 * @private
 * Containing underscore templates
 * @return Object containing utilities functions
 */

var _ = require('underscore');
var fs = require('fs');
module.exports.utilities = (function() {
  var TODOdata = require('./data.json');
  var compiledHeader = _.template(
    "<h1 class='username'><%= name %></h1>"
  );
  var compileListItem = _.template(
    "<ul>" +
    "<% _.each(todo, function(item) { %>" +
    "<li><%= item.work %> " +
    "</li>" +
    "<% }) %>" +
    "</ul>"
  );
  return {
    allData: function () {
      return TODOdata;
    },
    Compile: function (username) {
      var userToDisplay = _.find(TODOdata, function(user) {
        return user.name.toLowerCase().search(username.toLowerCase()) != -1;
      });
      // If there is no such user, create a new record
      if (userToDisplay == undefined) {
        userToDisplay = {};
        userToDisplay.name = username;
        userToDisplay.todo = [];
        TODOdata.push({"name": username, "todo": []});
      }
      return  {
                username: userToDisplay.name,
                header: compiledHeader({name: userToDisplay.name}),
                listItem: compileListItem({todo: userToDisplay.todo})
              }
    },
    addToJSON: function(addInfo) {
      _.each(TODOdata, function (user) {
        if (user.name == addInfo.name) {
          user.todo.push({"work": addInfo.item});
        }
      })
    },
    writeToFile: function () {
      fs.writeFile('data.json', JSON.stringify(TODOdata), function (error) {
        if (error) return console.log(error);
        else console.log('file saved');
      })
    }
  }
}());
