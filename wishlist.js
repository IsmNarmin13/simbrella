document.addEventListener("DOMContentLoaded", function () {
    let table = document.querySelector(".table");
    let totalPrice = document.getElementById("totalPrice");

    if (localStorage.getItem("basket") != null) {
        let arr = JSON.parse(localStorage.getItem("basket"));

        arr.forEach(pro => {
            let tr = `
            <tr data-id="${pro.id}">
                <td>
                <img src="${pro.imgUrl}" alt="" width="150px" height="150px">
                </td>
                <td>
                    ${pro.name}
                </td>
                <td>
                    ${pro.price.replace(/\D/g, '')}
                </td>
                <td>
                    <i class="fas fa-minus-circle"></i>
                    ${pro.count}
                    <i class="fas fa-plus-circle"></i>
                </td>
                <td>
                    <i class="fas fa-trash"></i>
                </td>
            </tr>
            `;
            table.querySelector('tbody').insertAdjacentHTML('beforeend', tr);
        });

        CalculateTotalPrice(arr);

        let removeBtns = document.querySelectorAll(".fas.fa-trash");
        RemoveButton(removeBtns, arr);

        let plusCount = document.querySelectorAll(".fas.fa-plus-circle");
        PlusCount(plusCount, arr);

        let minusCount = document.querySelectorAll(".fas.fa-minus-circle");
        MinusCount(minusCount, arr);
    }

    function PlusCount(plusIcons, arr) {
        plusIcons.forEach(icon => {
            icon.addEventListener("click", function () {
                let proName = this.parentNode.parentNode.children.item(1).innerText;
                let newArr = [];
                if (newArr == null) {
                    table.style.display = "none";
                }
                arr.forEach(element => {
                    if (element.name == proName) {
                        ++element.count;
                        newArr.push(element);
                    } else {
                        newArr.push(element);
                    }
                });
                localStorage.setItem("basket", JSON.stringify(newArr));
                location.reload();
            });
        });
    }

    function MinusCount(minusIcons, arr) {
        minusIcons.forEach(icon => {
            icon.addEventListener("click", function () {
                let productId = this.parentNode.parentNode.getAttribute("data-id");
                let newArr = [];

                arr.forEach(element => {
                    if (element.id == productId) {
                        element.count--;
                        if (element.count >= 1) {
                            newArr.push(element);
                        } else {
                            let index = arr.findIndex(val => val == element);
                            newArr.splice(index, 1);
                        }
                    } else {
                        newArr.push(element);
                    }
                });

                localStorage.setItem("basket", JSON.stringify(newArr));
                location.reload();
            });
        });
    }

    function RemoveButton(removeBtns, arr) {
        removeBtns.forEach(element => {
            element.addEventListener("click", function () {
                let proName = this.parentNode.parentNode.children.item(1).innerText;
                let newArr = arr.filter(element => element.name !== proName);

                localStorage.setItem("basket", JSON.stringify(newArr));
                location.reload();
            });
        });
    }

    function CalculateTotalPrice(arr) {
        let sum = arr.reduce((prev, next) => {
            return prev + (next.price.replace(/\D/g, '') * next.count);
        }, 0);
        totalPrice.innerHTML = `Total Price: ₼‎${sum.toFixed(2)}`;
    }
});
