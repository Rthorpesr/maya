$(document).ready(function() {

    console.log("I am inside the likes jquery file")
    // Getting a reference to the input field where user adds a new user
    var $newItemInput = $("input.new-item");
    // Our new users will go inside the userContainer
    var $userContainer = $(".user-container");
    // Adding event listeners for deleting, editing, and adding users
   
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
      $.get("/api/like", function(data) {
        likes = data;
        initializeRows();
      });
    }
  
    // This function constructs a like row
    function createNewRow(likes) {
      var $newInputRow = $(
        [
          "<li class='list-group-item user-item'>",
          "<span>",
          likes.L_image_url,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("userEmail", likes.L_image_url);
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

        $.post("/api/like", likes, getLikes);
        $newItemInput.val("");
      }
  });