let addToCartBtns = document.querySelectorAll(".cart-button");
let basketCount = document.getElementById("basketCount");

addToCartBtns.forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    let productId = btn.getAttribute("data-product-id");

    if (localStorage.getItem("basket") == null) {
      localStorage.setItem("basket", JSON.stringify([]));
    }

    let arr = JSON.parse(localStorage.getItem("basket"));
    let existingProduct = arr.find(pro => pro.id == productId);

    if (existingProduct === undefined) {
      arr.push({
        id: productId,
        imgUrl: document.getElementById(productId).querySelector('img').getAttribute('src'),
        name: document.getElementById(productId).querySelector('h5').innerText,
        price: document.getElementById(productId).querySelector('p').innerText,
        count: 1
      });
    } else {
      existingProduct.count++;
    }

    localStorage.setItem("basket", JSON.stringify(arr));
    CalcBasketCount();
  });
});

function CalcBasketCount() {
  if (localStorage.getItem("basket") != null) {
    let sum = JSON.parse(localStorage.getItem("basket")).reduce((prev, next) => prev + next.count, 0);
    basketCount.innerText = sum;
  }
}

CalcBasketCount();



function CalcBasketCount() {
  if (localStorage.getItem("basket") != null) {
    let sum;
    let arr = JSON.parse(localStorage.getItem("basket"));
    sum = arr.reduce((prev, next) => {
      return prev + next.count;
    }, 0);
    basketCount.innerText = sum;
  }
}

CalcBasketCount();
