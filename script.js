let cart = document.querySelector('.fa-heart');

let addToCartBtns = document.querySelectorAll(".cart-button");
let basketCount = document.getElementById("basketCount");
addToCartBtns.forEach(btn=>{
  btn.addEventListener("click", function(e){
    e.preventDefault();
    let id = btn.closest('.items').getAttribute('data-id');

    if(localStorage.getItem("basket")==null){
      localStorage.setItem("basket", JSON.stringify([]))
    }
    let arr = JSON.parse(localStorage.getItem("basket"))
    let exisProduct = arr.find(pro=>pro.id==id);
    if (exisProduct == undefined){
      arr.push({
        id: id,
        imgUrl: btn.closest('.items').querySelector('img').getAttribute('src'),
        name: btn.closest('.items').querySelector('h5').innerText,
        price: btn.closest('.items').querySelector('.price').innerText,
        count: 1
    });
    
    
        } else {
            exisProduct.count++;
        }

        localStorage.setItem("basket", JSON.stringify(arr));
        CalcBasketCount();
    })
})



function CalcBasketCount() {
  if (localStorage.getItem("basket") != null) {
      let uniqueItems = new Set(); 
      let arr = JSON.parse(localStorage.getItem("basket"));
      
      arr.forEach(item => {
          uniqueItems.add(item.id);
      });
      
      let sum = uniqueItems.size;
      
      basketCount.innerText = sum;
  }
}


CalcBasketCount();