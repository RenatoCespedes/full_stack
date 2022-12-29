var multi = document.querySelector(".multi");
var token= localStorage.getItem('accessToken')
var usuario= JSON.parse(sessionStorage.getItem("user"));
var result=document.querySelector('.respuesta');

async function getServices(){
    try {
          const response = await fetch('http://127.0.0.1:8000/api/v2/service/',{
            headers:{
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });
          const data = await  response.json();

          createSelect(data);
        } catch (error) {
          console.log(error);
        }
}

function createSelect(data){
    multi.innerHTML="";
    let array=data.results;

    var selectList = document.createElement("select");
    selectList.setAttribute("id", "mySelect");
    selectList.setAttribute("class", "form-select form-select-lg mb-3");
   
    
    selectList.innerHTML+=`<option selected>Servicios</option>`
     array.forEach(element => {
        selectList.innerHTML+=`<option value="${element.id}"> ${element.name} </option>`
    });
    multi.appendChild(selectList);
    droplist();

    
}
function droplist(){
    var valores=document.getElementById("mySelect")
    valores.addEventListener("change",function(){
        sessionStorage.setItem("selection", valores.value)
    })
    console.log(sessionStorage.selection)
}

if(!usuario.is_superuser){
  result.innerHTML=""
  result.innerHTML+=`<div>El usuario no tiene permisos para acceder a esta Vista</div>`
  console.log(usuario.is_superuser);
  document.body.innerHTML = result.outerHTML;
}
else{
  console.log(usuario.is_superuser);
  getServices();
}


console.log(sessionStorage.selection)




