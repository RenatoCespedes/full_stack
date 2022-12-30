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
    var valores=document.getElementById("mySelect");
    var nameService=document.querySelector("#editname");
    var description=document.querySelector("#editprefix");
    var logo=document.querySelector("#editlogo");

    valores.addEventListener("change",async function(){
        
        sessionStorage.setItem("selection", valores.value)
        var servdata=await editService();
        

        nameService.value=servdata.name;
        description.value=servdata.description;
        logo.value=servdata.logo;
    });
    const formUpdate=document.getElementById("modService");
    // console.log("fm")
    formUpdate.addEventListener('submit', async function(event){ 
    event.preventDefault();
    // strjson="{'name': 'Disney 2', 'description': 'Servicio Disney', 'logo': 'time.png'}"
    const dataChanged = new FormData(formUpdate)
    console.log(Object.fromEntries(dataChanged))
    const strjson = JSON.stringify(Object.fromEntries(dataChanged))
    console.log(dataChanged)
    console.log("cargando update service")

    console.log(formUpdate)
    console.log(strjson)
    const response = await fetch(`http://127.0.0.1:8000/api/v2/service/${sessionStorage.getItem('selection')}/`,
      {
        method: "PATCH",
        headers:{
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: strjson

      }
      );
      const json = await response.json();
      console.log(response)
      // window.alert("Nuevo servicio creado correctamente");
      location.reload();
  } );

    
    
}

async function editService(){
  const response=await fetch(`http://127.0.0.1:8000/api/v2/service/${sessionStorage.getItem('selection')}`,{
      headers:{
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
  datosService= await response.json();
  console.log(datosService);
  return datosService;
}

if(!usuario.is_superuser){
  result.innerHTML=""
  result.innerHTML+=`<div>El usuario no tiene permisos para acceder a esta Vista</div>`

  document.body.innerHTML = result.outerHTML;
}
else{

  getServices();
}






