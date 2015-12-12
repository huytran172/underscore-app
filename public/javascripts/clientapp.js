var clientApp = function () {
  var username    = document.getElementById('username'),
    listItem    = document.getElementById('listItem'),
    searchBox   = document.getElementById('searchBox'),
    addArea     = document.getElementById('addArea'),
    xhr         = new XMLHttpRequest(),
    currentUser = "";
  // Helper ajax function
  var ajaxRequest = function (dataToBeSent, path, handleFunction) {
    var data;
    if (xhr.readyState === 0 || xhr.readyState === 4) {
      if (dataToBeSent !== '') {
        xhr.onreadystatechange = handleFunction;
        xhr.open('POST', path, true);
        if (typeof dataToBeSent == "string") {
          data = encodeURIComponent(dataToBeSent);
        }
        else {
          console.log(dataToBeSent);
          console.log('hello');
          data = JSON.stringify(dataToBeSent);
          console.log(data);
        }
        xhr.send(JSON.stringify({content: data}));
      }
    }
    else {
      console.log('Error');
    }
  };
  // Handle ajax request function
  var handleFunction = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Reset div
        username.innerHTML = "";
        listItem.innerHTML = "";
        var template = JSON.parse(xhr.responseText);
          console.log(template.username);
          username.innerHTML += template.header;
          listItem.innerHTML += template.listItem;
          currentUser = template.username;
          addArea.innerHTML = compiledAddArea({user: currentUser});
          var addItem = function () {
            ajaxRequest({
              name: currentUser,
              item: document.getElementById('addTextField').value
            }, "/data", handleAdd);
          };
          document.getElementById('addButton').addEventListener('click', addItem, false);
      }
      else {
        alert('Something went wrong');
      }
    }
  };
  var handleAdd = function () {
    document.getElementById('message').innerHTML = "<p>Successfully added</p>";
  };
  var compiledAddArea = _.template(
    "<div id='addBox'>" +
    "<% if (user !== '') { %>" +
    "<input type='text' id='addTextField' placeholder='Add task here'>" +
    "<div><div class='button' id='addButton'>Add</div></div>" +
    "<% } %>" +
    "</div>" +
    "<div id='message'></div>"
  );

  return {
    // Get all information of user being searched
    submit: function () {
      ajaxRequest(searchBox.value, "/username", handleFunction);
    }
  }
};
