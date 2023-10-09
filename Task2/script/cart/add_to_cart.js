function addToCartHandler(event) {
    let id = getCertificateId(event);
    let cart = []

    if (localStorage.getItem("cart") != null) {
        cart = JSON.parse(localStorage.getItem("cart"))
    }

    let find = cart.find(value => {
        return value === id
    });

    if (find == null)
        cart.push(id)

    localStorage.setItem("cart", JSON.stringify(cart))
}