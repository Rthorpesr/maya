$(document).ready(function() {

    console.log("I am inside the saveforlaters jquery file")
    // Getting a reference to the input field where user adds a new user
    var $newItemInput = $("input.new-item");
    // Our new users will go inside the userContainer
    var $userContainer = $(".user-container");
    // Adding event listeners for deleting, editing, and adding users
    $(document).on("click", "button.delete", deletesaveforlaters);
    //$(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".user-item", editsaveforlaters);
    $(document).on("keyup", ".user-item", finishEdit);
    $(document).on("blur", ".user-item", cancelEdit);
    $(document).on("submit", "#user-form", insertsaveforlater);
   
    // Our initial user array
    var saveforlaters = [];
  
    // Getting users from database when page loads
    getsaveforlaters();
  
    // This function resets the users displayed with new users from the database
    function initializeRows() {
      $userContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < saveforlaters.length; i++) {
        rowsToAdd.push(createNewRow(saveforlaters[i]));
      }
      $userContainer.prepend(rowsToAdd);
    }
  
    // This function grabs users from the database and updates the view
    function getsaveforlaters() {
      $.get("/api/saveforlater", function(data) {
        saveforlaters = data;
        initializeRows();
      });
    }
  
    // This function deletes a user when the user clicks the delete button
    function deletesaveforlaters(event) {
      event.stopPropagation();
      var id = $(this).data("S_Email");
      $.ajax({
        method: "DELETE",
        url: "/api/saveforlater/" + S_Email
      }).then(getsaveforlaters);
    }
  
    // This function handles showing the input box for a user to edit a user
    function editsaveforlaters() {
      var currentsaveforlaters = $(this).data("saveforlaters");
      $(this).children().hide();
      $(this).children("input.edit").val(currentsaveforlaters.S_Email);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // This function starts updating a user in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedsaveforlaters = $(this).data("saveforlaters");
      if (event.which === 13) {
        updatedsaveforlaters.S_Email = $(this).children("input").val().trim();
        $(this).blur();
        updateUser(updatedsaveforlaters);
      }
    }
  
    // This function updates a user in our database
    function updatesaveforlaters(saveforlaters) {
      $.ajax({
        method: "PUT",
        url: "/api/saveforlater",
        data: saveforlaters
      }).then(getsaveforlaters);
    }
  
    // This function is called whenever a user item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentsaveforlaters = $(this).data("saveforlaters");
      if (currentsaveforlaters) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentsaveforlaters.saveforlaters.S_Email);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a user-item row
    function createNewRow(saveforlaters) {
      var $newInputRow = $(
        [
          "<li class='list-group-item user-item'>",
          "<span>",
          saveforlaters.S_Email,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("userEmail", saveforlaters.S_Email);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("saveforlaters", saveforlaters);
      if (saveforlaters.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    // This function inserts a new user into our database and then updates the view
    function insertsaveforlater(event) 
      {
        event.preventDefault();
        var saveforlaters = 
        {
           text: $newItemInput.val().trim() 
        };

        $.post("/api/saveforlater", saveforlaters, getsaveforlaters);
        $newItemInput.val("");
      }
  });