var nav=document.querySelector(".serv")
async function getUser(){
    try {
        const id=localStorage.getItem("idUser");
        const response = await fetch(`http://127.0.0.1:8000/api/v2/users/${id}/`);
        const usuario = await  response.json();
        
        createButton(usuario)
      } catch (error) {
        console.log(error);
      }
}

function createButton(usuario){
    nav.innerHTML="";
    if(!usuario.is_superuser){
        nav.innerHTML="";
        
    }
    else{
        nav.innerHTML+=`<a class="nav-link" href="./servicios.html">Servicios</a>`;
        console.log(usuario.is_superuser)
    }
}
getUser()