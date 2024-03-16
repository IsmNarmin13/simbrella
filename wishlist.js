let table = document.querySelector(".table");

if (localStorage.getItem("basket") != null) {
    let arr = JSON.parse(localStorage.getItem("basket"));
    if (arr.length == 0) {
        table.style.display = "none";
    } else {
        table.style.display = "block";
    }

    arr.forEach(pro => {
        let tr = `
            <tr data-id="${pro.id}">
                <td>
                    <img src="${pro.imgUrl}" alt"" width="120px" height="120px">
                </td>
                <td style="padding-top: 40px">
                    ${pro.name}
                </td>
                <td style="padding-top: 40px">
                    ${pro.price}
                </td>
                <td style="padding-top: 40px">
                    <i class="fa-solid fa-cart-plus"></i>
                </td>
                <td style="padding-top: 40px">
                    <i class="fa-solid fa-x remove-btn"></i>
                </td>
            </tr>
        `;
        table.lastElementChild.innerHTML += tr;
    });

    // Move RemoveButton function call here
    let removeBtns = document.querySelectorAll(".remove-btn");
    RemoveButton(removeBtns, arr);
}

function RemoveButton(removeBtns, arr) {
    removeBtns.forEach(element => {
        element.addEventListener("click", function () {
            let proId = this.parentNode.parentNode.dataset.id;
            let newArr = arr.filter(element => element.id !== proId);

            localStorage.setItem("basket", JSON.stringify(newArr));
            location.reload();
        });
    });
}
