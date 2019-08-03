$(document).ready(function() {
    // Getting a reference to the input field where user adds a new user
    var $newItemInput = $("input.new-item");
    // Our new users will go inside the userContainer
    var $userContainer = $(".user-container");
    // Adding event listeners for deleting, editing, and adding users
    $(document).on("click", "button.delete", deleteRecipe);
    //$(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".user-item", editRecipe);
    $(document).on("keyup", ".user-item", finishEdit);
    $(document).on("blur", ".user-item", cancelEdit);
    $(document).on("submit", "#user-form", insertRecipe);
   // $(document).on("submit2", "#user-form", insertlike);
   // $(document).on("submit3", "#user-form", insertsaveforlater);
  
    // Our initial user array
    var recipes = [];
  
    // Getting users from database when page loads
    getRecipes();
  
    // This function resets the users displayed with new users from the database
    function initializeRows() {
      $userContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < users.length; i++) {
        rowsToAdd.push(createNewRow(recipes[i]));
      }
      $userContainer.prepend(rowsToAdd);
    }
  
    // This function grabs users from the database and updates the view
    function getRecipes() {
      $.get("/api/recipes", function(data) {
        recipes = data;
        initializeRows();
      });
    }
  
    // This function deletes a user when the user clicks the delete button
    function deleteRecipe(event) {
      event.stopPropagation();
      var id = $(this).data("user_Email");
      $.ajax({
        method: "DELETE",
        url: "/api/recipes/" + user_Email
      }).then(getRecipe);
    }
  
    // This function handles showing the input box for a user to edit a user
    function editRecipe() {
      var currentRecipe = $(this).data("recipe");
      $(this).children().hide();
      $(this).children("input.edit").val(currentRecipe.user_Email);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // This function starts updating a user in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedRecipe = $(this).data("recipe");
      if (event.which === 13) {
        updatedRecipe.user_Email = $(this).children("input").val().trim();
        $(this).blur();
        updateUser(updatedRecipe);
      }
    }
  
    // This function updates a user in our database
    function updateRecipes(recipe) {
      $.ajax({
        method: "PUT",
        url: "/api/recipes",
        data: recipes
      }).then(getRecipes);
    }
  
    // This function is called whenever a user item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentRecipe = $(this).data("recipe");
      if (currentRecipe) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentrecipe.user_Email);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a user-item row
    function createNewRow(recipe) {
      var $newInputRow = $(
        [
          "<li class='list-group-item user-item'>",
          "<span>",
          recipe.text,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("userEmail", recipe.userEmail);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("recipe", recipe);
      if (user.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    // This function inserts a new user into our database and then updates the view
    function insertRecipe(event) 
      {
        event.preventDefault();
        var recipes = 
        {
           text: $newItemInput.val().trim(),
           //user_Email:    DataTypes.STRING,
           L_title:       "title",
           L_source_url:  "sourceurl",
           L_image_url:   "imageurl",
           S_title:       "title",
           S_source_url:  "pizzahuturl",
           S_image_url:   "pictureurl"
        };

        $.post("/api/recipes", recipes, getRecipes);
        $newItemInput.val("");
      }
  });