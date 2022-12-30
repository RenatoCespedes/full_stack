// closes the session//
function close_session(){
    console.log("calling close session")
    const closeSessionButton = document.getElementById("js_close_session")
  
    if (!closeSessionButton) return
    
    closeSessionButton.addEventListener("click", function(){
      localStorage.clear();
      sessionStorage.clear();
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("idUser");  
      window.location.href = "./login.html"
    })
  
  }
close_session();