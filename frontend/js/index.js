const main = document.querySelector('.datos');
const main1 = document.querySelector('.datos1');
const body = document.querySelector("body");
const barra = document.querySelector(".barra");
var token= localStorage.getItem('accessToken')


var objJson=JSON.parse(localStorage.getItem('realizados'));

console.log(objJson)

var current_page = 1;
var records_per_page = 4;

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page)
{
    //console.log(objJson);
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;//console.log("menor 1",objJson);
    if (page > numPages()) page = numPages();//console.log("mayor numpages",objJson);

    main.innerHTML = "";
    idUser=localStorage.idUser;
    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.results.length; i++) {
        
        main.innerHTML += `
        <br>
        <div class="card border border-success content">
            <div class="row no-gutters">
            
                    <div class="col-sm ">
                        <div class="card-body ">
                        <img class="rounded-circle" src=" ${objJson.results[i].service.logo}" width="20" height="20" alt="logo">
                        </div>    
                    </div>
                    <div class="col-sm">
                        <div class="card-body">
                            ${objJson.results[i].service.name}
                        </div>    
                    </div>
                    <div class="col-sm">
                        <div class="card-body">
                            ${objJson.results[i].Payment_date}
                        </div>    
                    </div>
                    <div class="col-sm">
                        <div class="card-body">
                            ${objJson.results[i].Amount}
                        </div>    
                    </div>
            </div>
        </div>
         
        `;
        
        // objJson.results[i].service.name + "<br>";
    }
    page_span.innerHTML = page + "/" + numPages();;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
        //console.log("hiden")
        //console.log(objJson);
    } else {
        btn_next.style.visibility = "visible";
        //console.log("visible");
        //console.log(objJson);
    }
}

function numPages()
{
    
    return Math.ceil(objJson.count / records_per_page);
}


async function getTask() {
    base_pay="";
    base_expired="";
    try {
    //   let userSelection = parseInt(sessionStorage.selection)
    const response = await fetch('http://127.0.0.1:8000/api/v2/pay/',{
        headers:{
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await  response.json();
      console.log(data);
    //   const response = await fetch(base_pay.concat(userSelection));
    //   const response1 = await fetch(base_expired.concat(userSelection));
    const response1 = await fetch('http://127.0.0.1:8000/api/v2/expired/',{
        headers:{
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      
      const data1 = await response1.json();
    //   renderTasks(data,data1);
      
      localStorage.setItem('realizados', JSON.stringify(data));
      localStorage.setItem('vencidos', JSON.stringify(data1));
      if (!localStorage.refresh){
        location.reload();
        localStorage.setItem('refresh', "1");
        }
       
      
    } catch (error) {
      console.log(error);
      location.reload();
    }
  }



getTask();

changePage(1);


