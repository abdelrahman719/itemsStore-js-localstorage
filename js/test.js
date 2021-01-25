var addBtn = document.getElementById("addBtn");
var productCompany=document.getElementById("productCompany");
var productName=document.getElementById("productName");
var productDesc=document.getElementById("productDesc");
var productprice=document.getElementById("productprice");
var row = document.getElementById("products");


var products=[];

var turnOff = false ; 



if(localStorage.getItem("myProducts") == null)
{ 
    products=[];
}
else
{
   products=JSON.parse(localStorage.getItem("myProducts"));
   show();
 
}


addBtn.onclick =function()
{

    if (turnOff==false)
    {
        add();
        show();
        clear();
        

    }
    else
    {
        update(globalindex);
        show();
        clear();
        
    }
   
  
}

function add()
{
    var product={
        name:productName.value,
        company:productCompany.value,
        desc:productDesc.value,
        price:productprice.value,

    }
    products.push(product);
    console.log(product);

    console.log(products);

   localStorage.setItem("myProducts" , JSON.stringify( products));  //adding to local storage
 
   
  
}


function show()
{
    var col="";
    for(var i =0 ; i<products.length ; i++)
    {
       col+=`<div class="col-md-3 p-3 ">
       <div class="layer  text-center py-2 bgc-cards">
       <h2 class="text-danger">`+products[i].name+`</h2>
       <h3 class="text-secondary">`+products[i].company+`</h3>
       <p class="text-light">`+products[i].desc+`</p>
       <h3 class="text-primary">`+products[i].price+`</h3>
       <button class="btn btn-danger" onclick='del(`+i+`)' type="button">Delete</button>
       <button class="btn btn-info" onclick='ret(`+i+`)' type="button">update</button>
       </div>

      
       </div>`;
    }

    row.innerHTML=col ;
}

var searchBar = document.getElementById("searchBar");
var searcheditems =document.getElementById("searcheditems");

searchBar.onkeyup=function()
{
    var searcheditem = "";
    var lookeditems = "";
    for(var i=0 ; i<products.length ; i++)
    {
        if(products[i].name.includes(this.value.trim())==true)
        {
            searcheditem+=`<div class="col-md-3 p-3 ">
            <div class="layer  text-center py-2 bgc-form">
            <h2 class="text-danger">`+products[i].name+`</h2>
            <h3 class="text-secondary">`+products[i].company+`</h3>
            <p>`+products[i].desc+`</p>
            <h3 class="text-primary">`+products[i].price+`</h3>
            <button class="btn btn-danger" type="button">Delete</button>
            </div>
            </div>`;

            lookeditems+=` <p class="text-danger">`+products[i].name.replace(this.value ,` <span class="text-info">`+this.value+`</span>`)+`</p>`;

        }
        

    }
    searcheditems.innerHTML=lookeditems;
    
    row.innerHTML=searcheditem;
}


var inputs = document.getElementsByClassName("form-control");
function clear()
{
    for(var i=0 ; i<inputs.length ; i++)
    {
        inputs[i].value="";
    }

} 

function del(index)
{
  products.splice(index,1);
  localStorage.setItem("myProducts" , JSON.stringify( products));
  show()
}
var globalindex ;
function ret (index)
{
    productName.value = products[index].name;
    productCompany.value = products[index].company;
    productDesc.value = products[index].desc;
    productprice.value = products[index].price;
    globalindex=index;
    turnOff = true ;
    addBtn.innerHTML = "update ";
}
function update( globalindex)
{
    products[globalindex].name = productName.value;
     products[globalindex].company = productCompany.value;
    products[globalindex].desc = productDesc.value ;
    products[globalindex].price= productprice.value ;
    addBtn.innerHTML="Add items";
    localStorage.setItem("myProducts" , JSON.stringify( products));

}



