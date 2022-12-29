const im=document.querySelector('.imgProfile');
const nombre=document.querySelector('.nombre');
var usuario= JSON.parse(sessionStorage.getItem("user"));

const letter=()=>{
    let x=usuario.username;
    return x.charAt(0);
}
// console.log(usuario);
// console.log(letter());

function createIMG(){
    im.innerHTML="";
    im.innerHTML+=`<div id="profileImage">${letter().toUpperCase()}</div>`
}
function getName(){
    nombre.innerHTML="";
    nombre.innerHTML+=`<div class="text-center">${usuario.username.toUpperCase()}</div>`
}

createIMG();
getName();