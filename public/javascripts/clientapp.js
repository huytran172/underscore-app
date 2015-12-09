var clientApp = function () {
  var username  = document.getElementById('username'),
      listItem  = document.getElementById('listItem'),
      searchBox = document.getElementById('searchBox'),
      xhr       = new XMLHttpRequest();
  // Helper ajax function
  var ajaxRequest = function (dataToBeSent, path, handleFunction) {
    var data;
    if (xhr.readyState === 0 || xhr.readyState === 4) {
      if (dataToBeSent != '') {
        xhr.onreadystatechange = handleFunction;
        xhr.open('POST', path, true);
        data = encodeURIComponent(dataToBeSent);
      }
      xhr.send(data);
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
        console.log(xhr.responseText);
        // Response text is json object containing all templates
        var template = JSON.parse(xhr.responseText);
        username.innerHTML += template.header;
        listItem.innerHTML += template.listItem;
      }
      else {
        alert('Something went wrong');
      }
    }
  };
  return {
    // Get all information of user being searched
    submit: function () {
      ajaxRequest(searchBox.value, "/username", handleFunction);
    }
  };
};
