var contentContainer = document.querySelector('#itemContainer');
let totalPriceContainer = document.querySelector('#priceTotal');
let submitBtn = document.querySelector('#submitBtn');
let cancelBtn = document.querySelector('#cancelBtn');
let clearCartBtn = document.querySelector('#clearCartBtn');
contentContainer.innerHTML = '';

let totalPrice = 0;

let cart = localStorage.getItem("cart");
let username = localStorage.getItem("user");

fetch("http://localhost:8080/api/users/username/" + username).then(response => {
    return response.json()
}).then(user => {
    localStorage.setItem("userId", user.id);
})

if (cart == null) {
    let cartContainer = document.querySelector('#cartContainer');
    cartContainer.innerHTML = ''
    cartContainer.append(createEmptyCartElement())
} else {
    cart = JSON.parse(cart);

    for (const element of cart) {
        fetch("http://localhost:8080/api/certificates/" + element).then(response => {
            return response.json()
        }).then(certificate => {
            let cartElement = createCartElement(certificate);
            contentContainer.append(cartElement)

            totalPrice += certificate.price
            totalPriceContainer.innerText = totalPrice
        })
    }
}


submitBtn.addEventListener("click", submitHandler)

cancelBtn.onclick = (e) => {
    window.history.back()
}

clearCartBtn.addEventListener("click", (e) => {
    localStorage.removeItem("cart")
    window.location.reload()
})

async function submitHandler() {
    let uid = localStorage.getItem("userId");
    let success = true

    for (const certificateId of cart) {

        let response = await fetch(`http://localhost:8080/api/orders/create?userId=${uid}&giftCertificateId=${certificateId}`, {
            method: 'POST'
        });

        if (!response.ok) {
            success = response.ok
            console.log(`Error occurred in making order on certificate: ${certificateId} and userId: ${uid}`)
        }

    }
    if (success) {
        localStorage.removeItem("cart")
        window.location.href = 'main.html'
    }

}



