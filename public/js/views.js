$(document).ready(function() {
    // Getting a reference to the input field where user adds a new user
    var $newItemInput = $("input.new-item");
    // Our new users will go inside the userContainer
    var $userContainer = $(".user-container");
    // Adding event listeners for deleting, editing, and adding users
    $(document).on("click", "button.delete", deleteUser);
    //$(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".user-item", editUser);
    $(document).on("keyup", ".user-item", finishEdit);
    $(document).on("blur", ".user-item", cancelEdit);
    $(document).on("submit", "#user-form", insertUser);
   // $(document).on("submit2", "#user-form", insertlike);
   // $(document).on("submit3", "#user-form", insertsaveforlater);
  
    // Our initial user array
    var users = [];
  
    // Getting users from database when page loads
    getUsers();
  
    // This function resets the users displayed with new users from the database
    function initializeRows() {
      $userContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < users.length; i++) {
        rowsToAdd.push(createNewRow(users[i]));
      }
      $userContainer.prepend(rowsToAdd);
    }
  
    // This function grabs users from the database and updates the view
    function getUsers() {
      $.get("/api/users", function(data) {
        users = data;
        initializeRows();
      });
    }
  
    // This function deletes a user when the user clicks the delete button
    function deleteUser(event) {
      event.stopPropagation();
      var id = $(this).data("user_Email");
      $.ajax({
        method: "DELETE",
        url: "/api/users/" + user_Email
      }).then(getUsers);
    }
  
    // This function handles showing the input box for a user to edit a user
    function editUser() {
      var currentUser = $(this).data("user");
      $(this).children().hide();
      $(this).children("input.edit").val(currentUser.user_Email);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // This function starts updating a user in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedUser = $(this).data("user");
      if (event.which === 13) {
        updatedUsers.user_Email = $(this).children("input").val().trim();
        $(this).blur();
        updateUser(updatedUser);
      }
    }
  
    // This function updates a user in our database
    function updateUser(user) {
      $.ajax({
        method: "PUT",
        url: "/api/users",
        data: user
      }).then(getUsers);
    }
  
    // This function is called whenever a user item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentUser = $(this).data("user");
      if (currentUser) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentUser.user_Email);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a user-item row
    function createNewRow(user) {
      var $newInputRow = $(
        [
          "<li class='list-group-item user-item'>",
          "<span>",
          user.user_Email,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("userEmail", user.userEmail);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("user", user);
      if (user.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    // This function inserts a new user into our database and then updates the view
    function insertUser(event) 
      {
        event.preventDefault();
        var users = 
        {
           text: $newItemInput.val().trim() 
        };

        $.post("/api/users", users, getUsers);
        $newItemInput.val("");
      }
  });