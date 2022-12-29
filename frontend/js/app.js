const baseUrl = "http://127.0.0.1:8000" 

function login() {
  console.log('CargandoLogin')
  const inputEmail = document.querySelector("#inputEmail");
  const inputPassword = document.querySelector("#inputPassword");
  const inputButton = document.querySelector("#inputButton");

  inputButton.onclick = function(){
    const payload = {
      "email": inputEmail.value,
      "password": inputPassword.value,
    }
    // console.log("HiceClick")
    // console.log(inputEmail.value)
    // console.log(inputPassword.value)
    // console.log(payload)
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
  saveTokenUser(tokens,id);

  console.log(json);
  return ;
}

function saveTokenUser(tokens,idUser,admin){
  localStorage.setItem("accessToken", tokens.access);
  localStorage.setItem("idUser", idUser);
  
}












window.addEventListener('load', login );


 