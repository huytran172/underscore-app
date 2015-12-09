/**
 * @type {_|exports|module.exports}
 * @private
 * Containing all underscore templates
 * @return Object containing utilities functions
 */

var _ = require('underscore');
module.exports.utilities = function() {
  var TODOdata = require('./data.json');
  var compiledHeader = _.template(
    "<h1 class='username'><%= name %></h1>"
  );
  var compileListItem = _.template(
    "<ul>" +
    "<% _.each(todo, function(item) { %>" +
    "<li><%= item.work %> " +
    "<% if (item.done) { %>" +
      "<span>&#10003</span>" +
    "<% } else { %>" +
      "<span>&#10008</span>" +
    "<% } %>" +
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
      return userToDisplay !== undefined ?
      {
        header: compiledHeader({name: userToDisplay.name}),
        listItem: compileListItem({todo: userToDisplay.todo})
      }
        : "";
    }
  };
};
