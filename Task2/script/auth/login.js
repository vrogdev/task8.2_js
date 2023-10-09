const form = document.getElementById("loginForm");

form.addEventListener("submit", (event) => {
    event.preventDefault()

    let formData = event.target;

    formData.elements.namedItem("login").value;
    formData.elements.namedItem("password").value;

    let user = {}
    user.username = formData.elements.namedItem("login").value
    user.password = formData.elements.namedItem("password").value;

    fetch("http://localhost:8080/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(async response => {
            if (response.ok) {
                let body = await response.json();

                localStorage.setItem("user", body.user)
                localStorage.setItem("token", body.token)

                window.location.href = 'main.html'
            } else
                alert('user or password is not valid')
        }
    )
})