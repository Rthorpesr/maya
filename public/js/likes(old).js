$(document).ready(function() {

    console.log("I am inside the likes jquery file")
    // Getting a reference to the input field where user adds a new user
    var $newItemInput = $("input.new-item");
    // Our new users will go inside the userContainer
    var $userContainer = $(".user-container");
    // Adding event listeners for deleting, editing, and adding users
    $(document).on("click", "button.delete", deleteLikes);
    //$(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".user-item", editLikes);
    $(document).on("keyup", ".user-item", finishEdit);
    $(document).on("blur", ".user-item", cancelEdit);
    $(document).on("submit", "#user-form", insertLike);
   
    // Our initial user array
    var likes = [];
  
    // Getting users from database when page loads
    getLikes();
  
    // This function resets the users displayed with new users from the database
    function initializeRows() {
      $userContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < likes.length; i++) {
        rowsToAdd.push(createNewRow(likes[i]));
      }
      $userContainer.prepend(rowsToAdd);
    }
  
    // This function grabs users from the database and updates the view
    function getLikes() {
      $.get("/api/likes", function(data) {
        likes = data;
        initializeRows();
      });
    }
  
    // This function deletes a user when the user clicks the delete button
    function deleteLikes(event) {
      event.stopPropagation();
      var id = $(this).data("S_Email");
      $.ajax({
        method: "DELETE",
        url: "/api/likes/" + S_Email
      }).then(getLikes);
    }
  
    // This function handles showing the input box for a user to edit a user
    function editLikes() {
      var currentLikes = $(this).data("Likes");
      $(this).children().hide();
      $(this).children("input.edit").val(currentLikes.S_Email);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // This function starts updating a user in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedLikes = $(this).data("likes");
      if (event.which === 13) {
        updatedLikes.S_Email = $(this).children("input").val().trim();
        $(this).blur();
        updateUser(updatedLikes);
      }
    }
  
    // This function updates a user in our database
    function updateLikes(likes) {
      $.ajax({
        method: "PUT",
        url: "/api/likes",
        data: likes
      }).then(getLikes);
    }
  
    // This function is called whenever a user item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentLikes = $(this).data("likes");
      if (currentLikes) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentLikes.likes.S_Email);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a user-item row
    function createNewRow(likes) {
      var $newInputRow = $(
        [
          "<li class='list-group-item user-item'>",
          "<span>",
          likes.S_Email,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("userEmail", likes.S_Email);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("likes", likes);
      if (likes.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    // This function inserts a new user into our database and then updates the view
    function insertLike(event) 
      {
        event.preventDefault();
        var likes = 
        {
           text: $newItemInput.val().trim() 
        };

        $.post("/api/likes", likes, getLikes);
        $newItemInput.val("");
      }
  });