$(document).ready(function() {
  
  // The below is for demostration only 
  signonUserEmail  =  "Reginald.ThorpeGranddad@verizon.net";


  // Place these calls to the functions in the your jQuery code where you want  
  // to Post to the database. Each function has to pass the variable or object 
  // holding the content of the information needed to be placed in the 3 tables
  // users, likes, and svlater.

  usersposted();
  likeposted();
  svlaterposted();
  

  //Place the below functions into your jQuery.js file
        function usersposted() 
          {
            event.preventDefault();

            // POST route for saving a new like
            $.post("/api/users");
            console.log("Posting users");    
          };  
      
        function likeposted() 
          {
            event.preventDefault();

            // POST route for saving a new like
            $.post("/api/like");
            console.log("Posting likes");
            
          };  
      
        function svlaterposted() 
          {
            event.preventDefault();

            // POST route for saving a new svlater
            $.post("/api/svlater");
            console.log("Posting svlaters");
          };
  });
  