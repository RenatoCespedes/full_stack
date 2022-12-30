

function createService(){
        const newService = document.querySelector("#newService");
        
        newService.addEventListener('submit', async function(event){ 
          event.preventDefault();
          const formData = new FormData(newService)
          const payload = JSON.stringify(Object.fromEntries(formData))
          console.log(formData)
          console.log("cargando POST service")
      
          console.log(newService)
          console.log(payload)
          const response = await fetch(`http://127.0.0.1:8000/api/v2/service/`,
            {
              method: "POST",
              headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: payload
      
            }
            );
            const json = await response.json();
            if(response.status == 200 || response.status == 201) { 
                // agregar validador de datos!
                Swal.fire("Servicio creado correctamente").then((result)=>{
                  location.reload();
                })
                
              }
              else {
                Swal.fire({title:"Error: Uno o varios campos estan vacios",icon: 'error',
            })
              }
        } )
        
}

createService();