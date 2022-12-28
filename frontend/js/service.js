var multi = document.querySelector(".multi");
var token= localStorage.getItem('accessToken')
// var data=localStorage.getItem('servicio')
// console.log("servicio",servicio)

async function getServices(){
    try {
          const response = await fetch('http://127.0.0.1:8000/api/v2/service/',{
            headers:{
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });
          const data = await  response.json();
        //   localStorage.setItem('servicio', JSON.stringify(data));
          createSelect(data);
        } catch (error) {
          console.log(error);
        }
}

function createSelect(data){
    multi.innerHTML="";
    let array=data.results;
    // console.log(array);
    var selectList = document.createElement("select");
    selectList.setAttribute("id", "mySelect");
    selectList.setAttribute("class", "form-select form-select-lg mb-3");
   
    
    selectList.innerHTML+=`<option selected>Servicios</option>`
     array.forEach(element => {
        selectList.innerHTML+=`<option value="${element.id}"> ${element.name} </option>`
    });
    multi.appendChild(selectList);
    droplist();
    // var val=document.getElementById("mySelect")
    // // function onChange() {
    // //     var value = val.value;
    // //     var text = val.options[val.selectedIndex].text;
    // //     console.log(value, text);
    // //     return value
    // //   }
    
    // // val.onchange=onChange
    // // var x=onChange();
    // // localStorage.setItem('valselected', JSON.stringify(x));
    // val.addEventListener("change",function(){
    //     sessionStorage.setItem("selection", val.value),
    //     location.reload()
    // })
    // console.log(sessionStorage.selection)
    
}
function droplist(){
    var valores=document.getElementById("mySelect")
    // function onChange() {
    //     var value = val.value;
    //     var text = val.options[val.selectedIndex].text;
    //     console.log(value, text);
    //     return value
    //   }
    console.log(valores.value)
    // val.onchange=onChange
    // var x=onChange();
    // localStorage.setItem('valselected', JSON.stringify(x));
    valores.addEventListener("change",function(){
        sessionStorage.setItem("selection", valores.value)
    })
    console.log(sessionStorage.selection)
}

    // 
getServices();

// console.log(localStorage.getItem('valselected'))
console.log(sessionStorage.selection)




