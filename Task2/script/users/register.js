// const form = document.forms.registerForm;
const form = document.getElementById("registerForm");


form.addEventListener("submit", handleSubmit)

async function handleSubmit(event) {
    event.preventDefault()

    let formData = event.target;

    let login = formData.elements.namedItem("login").value;
    let name = formData.elements.namedItem("name").value;
    let password = formData.elements.namedItem("psw").value;
    let password2 = formData.elements.namedItem("psw2").value;

    if (password !== password2) {
        alert('given values of password are not match')
        return
    }

    let user = {};
    user.username = login;
    user.name = name;
    user.password = password

    let response = await fetch("http://localhost:8080/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    if (response.ok)
        window.location.href = 'main.html'
    else {
        alert('Error: ' + response.status)
    }
}