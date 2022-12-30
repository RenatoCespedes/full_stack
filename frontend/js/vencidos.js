//--------------PAGOS VENCIDOS---------------

var vencidos=JSON.parse(localStorage.getItem('vencidos'));
var current_page1 = 1;
var records_per_page1 = 4;
function prevPage1()
{
    if (current_page1 > 1) {
        current_page1--;
        changePageV(current_page1);
    }
}

function nextPage1()
{
    
    if (current_page1 < numPagesV()) {
        current_page1++;
        changePageV(current_page1);
    }
}
function changePageV(page)
{
    //console.log(objJson);
    var btn_next1 = document.getElementById("btn_next1");
    var btn_prev1 = document.getElementById("btn_prev1");
    var listing_table = document.getElementById("listingTable");
    var page_span1 = document.getElementById("page1");

    // Validate page
    if (page < 1) page = 1;//console.log("menor 1",objJson);
    if (page > numPagesV()) page = numPagesV();//console.log("mayor numpages",objJson);

    main1.innerHTML = "";
    console.log(vencidos)
    for (var i = (page-1) * records_per_page1; i < (page * records_per_page1) && i < vencidos.results.length; i++) {
        main1.innerHTML += `
        <br>
        <div class="card border border-danger">
            <div class="row">
            
                    <div class="col-sm">
                        <div class="card-body">
                            <img class="rounded-circle" src="${vencidos.results[i].extra_data.logo}" width="30" height="30" alt="logo">  
                        </div>  
                         
                           
                        
                    </div>
                    <div class="col-sm">
                        <div class="card-body">
                            ${vencidos.results[i].extra_data.servicio}
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="card-body">
                            ${vencidos.results[i].extra_data.date}
                        </div>    
                    </div>
                    <div class="col-sm">
                        <div class="card-body">
                            ${vencidos.results[i].extra_data.monto}
                        </div>    
                    </div>
                    <div class="col-sm">
                    <div class="card-body">
                        ${vencidos.results[i].Penalty_fee_amount}
                    </div>    
                </div>
            </div>
        </div>
        `;
        // objJson.results[i].service.name + "<br>";
    }
    page_span1.innerHTML = page + "/" + numPagesV();;

    if (page == 1) {
        btn_prev1.style.visibility = "hidden";
    } else {
        btn_prev1.style.visibility = "visible";
    }

    if (page == numPagesV()) {
        btn_next1.style.visibility = "hidden";
        //console.log("hiden")
        //console.log(objJson);
    } else {
        btn_next1.style.visibility = "visible";
        //console.log("visible");
        //console.log(objJson);
    }
}

function numPagesV()
{
    // console.log("numpages1",vencidos)
    return Math.ceil(vencidos.count / records_per_page1);
}


changePageV(1);