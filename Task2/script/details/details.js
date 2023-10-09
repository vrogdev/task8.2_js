let url = new URL(window.location.href);
let id = url.searchParams.get("id");

let certificate = getCertificate(id);

certificate.then(certificate => {
/*
    if (certificate == null) {
        window.location.href = 'error/404.html';
    }
*/

    document.getElementById('itemName').innerText = certificate.name
    document.getElementById('short-desc').innerText = certificate.description
    document.getElementById('long-desc').innerText = certificate.description
    document.getElementById('price').innerText = certificate.price
    /*document.getElementById('timer').innerText = '';*/
    document.getElementById('add-to-cart').addEventListener("click", addToCartHandler)


    setTimer(certificate);
})

function getCertificateId(event) {
    return id;
}

function setTimer(certificate) {
// Set the date we're counting down to
    let countDownDate = new Date(certificate.createDate);
    countDownDate.setHours(certificate.duration * 24)

// Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("timer").innerText = days + " days " + hours + " hours "
            + minutes + " minutes " + seconds + " seconds ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById('timer').innerHTML = "EXPIRED";
        }
    }, 1000);
}