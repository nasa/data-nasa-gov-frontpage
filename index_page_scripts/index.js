//This file holds all the javascript code responsible for the modal handeling and the sign in button functions

document.addEventListener("DOMContentLoaded", function(){
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    var btn = document.getElementById("signinButton");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
      document.getElementById('contSignIn').focus();
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
  span.addEventListener('keydown', spanFunct);
  document.getElementById("contSignIn").addEventListener('keydown', spanFunct);
    function spanFunct(e) {
      if(document.activeElement.id != "contSignIn"){
        if (e.keyCode == 13 || (e.keyCode === 9 && e.shiftKey)){
          console.log(document.activeElement.id);
          modal.style.display = "none";
          btn.focus();
        }
      }
      else{
        if (e.keyCode === 9 && !e.shiftKey){
          modal.style.display = "none";
          btn.focus();
        }
      }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    });
    function exitModal(e){
      console.log(this);
      if(e.shiftKey){
        document.getElementById("myModal").style.display = "none";
      }
    }

//Button Function
function toSignin() {
    window.location.href = 'https://data.nasa.gov/login';
  }

 