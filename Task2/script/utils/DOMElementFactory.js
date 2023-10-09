function createCartElement(certificate) {
    let template = document.querySelector("#cart-item-tpl");
    let cartItemTemplate = template.content.cloneNode(true);

    let nameContainer = cartItemTemplate.querySelector("#certificateName");
    let descriptionContainer = cartItemTemplate.querySelector("#certificateDesc");
    let priceContainer = cartItemTemplate.querySelector("#price");

    nameContainer.innerText = certificate.name
    descriptionContainer.innerText = certificate.description
    priceContainer.innerText = "$" + certificate.price

    return cartItemTemplate;
}

function createEmptyCartElement() {
    let template = document.querySelector("#empty-cart-tpl");
    return template.content.cloneNode(true);
}



function getCertificateId(event) {
    let btn = event.target;
    let inputCertificateId = btn.parentNode.querySelector("#certificateId");
    let id = inputCertificateId.value;
    return id;
}

function createElementMain(certificate) {
    let template = document.querySelector("#certificate-tpl-main");

    let certificateTemplate = template.content.cloneNode(true);

    let nameContainer = certificateTemplate.querySelector("#coupon-name-tpl");
    let descriptionContainer = certificateTemplate.querySelector("#description-tpl");
    let priceContainer = certificateTemplate.querySelector("#price-tpl");
    let expirationContainer = certificateTemplate.querySelector("#expiration-tpl");
    let inputCertificateId = certificateTemplate.querySelector("#certificateId");
    let addToCartBtn = certificateTemplate.querySelector("#addToCart");
    // let link = certificateTemplate.querySelector("#itemLink");
    let link = certificateTemplate.querySelectorAll('.itemLink')


    nameContainer.innerText = certificate.name
    descriptionContainer.innerText = certificate.description
    priceContainer.innerText = "$" + certificate.price
    inputCertificateId.value = certificate.id
    expirationContainer.innerText = getExpiredText()

    for (const element of link) {
        element.href = "details.html?id="+certificate.id
    }
    // link.href = "details.html?id="+certificate.id

    addToCartBtn.addEventListener("click", addToCartHandler)

    function getExpiredText() {
        let dateExpired = new Date(certificate.createDate);
        dateExpired.setHours(certificate.duration * 24)

        if (dateExpired > Date.now())
            return `Expires in ${certificate.duration} days`
        else
            return `Deal is expired`
    }

    return certificateTemplate
}

function createElementTag(tag) {
    let template = document.querySelector("#tag-tpl-main");
    let tagTemplate = template.content.cloneNode(true);

    let nameContainer = tagTemplate.querySelector("#tag-name-tpl");
    nameContainer.innerText = tag.name

    return tagTemplate
}