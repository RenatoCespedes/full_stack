const baseUrl = "http://127.0.0.1:8000" 

// LOGIN JS//
function login() { 
  const loginPage = document.querySelector("#loginPage");
  if (!loginPage)  return;
    
  console.log('CargandoLogin')
  const inputEmail = document.querySelector("#inputEmail");
  const inputPassword = document.querySelector("#inputPassword");
  const inputButton = document.querySelector("#inputButton");

  inputButton.onclick = function(){
    const payload = {
      "email": inputEmail.value,
      "password": inputPassword.value,
    }
    postLogin(payload)
  }
}

async function postLogin(payload) {
  const response = await fetch(`${baseUrl}/api/v2/users/login/`,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );
  const json = await response.json();
  const tokens = json.tokens;
  const id=json.id;
  if ( tokens ){
    saveTokenUser(tokens,id);
    window.location.href = '/frontend/index.html';
  }

  else {
    window.alert("email o contraseña invalido, intentar nuevamente")
  }
  console.log(json);
  return ;
}


function saveTokenUser(tokens,idUser,admin) {
  localStorage.setItem("accessToken", tokens.access);
  localStorage.setItem("idUser", idUser);
}
// FIN LOGIN JS//

// SIGNUP JS//
function signup(){
  const signupPage = document.querySelector("#signupPage");
  if (!signupPage)  return;

  console.log('CargandoSignPage--')
  const signupForm = document.querySelector("#signupForm");
  
  signupForm.addEventListener('submit', async function(event){ 
    event.preventDefault();
    const formData = new FormData(signupForm)
    const payload = JSON.stringify(Object.fromEntries(formData))
    console.log(formData)
    console.log("cargando POST SignupForm")

    console.log(signupForm)
    console.log(payload)
    const response = await fetch(`${baseUrl}/api/v2/users/signup/`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: payload

      }
      );
      const json = await response.json();
      
      // agregar validador de datos!
      window.alert("Nuevo usuario creado correctamente")
  } )
}
// Fin signup//

// closes the session//
function close_session(){
  console.log("calling close session")
  const closeSessionButton = document.getElementById("js_close_session")

  if (!closeSessionButton) return
  
  closeSessionButton.addEventListener("click", function(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idUser");  
    window.location.href = "/frontend/home.html"
  })

}

// Añadir nuevo_pago JS //

function pagos() {
  const loginPagos = document.querySelector("#pagosPage");
  if (!loginPagos)  return;
  console.log('CargandoPagos--')
  const selectTag = document.querySelector("#inputService");
  const payForm = document.querySelector("#pagos");
  populateServices(selectTag)
  payForm.addEventListener('submit', async function(event){ 
    event.preventDefault();
    const formData = new FormData(payForm)
    let currentDay = new Date()
    currentDay.setHours(currentDay.getHours() - 5)
    currentDay = currentDay.toJSON().split("T")[0]

    formData.append("Payment_date", currentDay);
    
    const payload = JSON.stringify(Object.fromEntries(formData))

    console.log("cargando POST")
    console.log(payload)
    const response = await fetch(`${baseUrl}/api/v2/pay/`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: payload
      }
      );
      const json = await response.json(); 
      window.alert("Nuevo pago realizado correctamente")
  } )
}

async function populateServices(selectTag) {
  const services = await getServices()
  console.log (services)

  services.map( (service) => {
    let opt = document.createElement("option");
    opt.value = service.id; 
    opt.innerHTML = service.name;
    selectTag.append(opt);
});
}

async function getServices() {
  const response = await fetch(`${baseUrl}/api/v2/service/`,
  {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }
);

const json = await response.json();
const services = json.results;
return services
}
// Fin Añadir nuevo_pago//


//LLAMANDO A LAS FUNCIONES CUANDO SE CARGA LA PAGINA//
window.addEventListener('load', login );
window.addEventListener('load', pagos );
window.addEventListener('load', signup);
window.addEventListener('load', close_session);
