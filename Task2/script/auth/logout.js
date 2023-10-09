let loginLink = document.querySelector('#loginLink');

if(localStorage.hasOwnProperty("user") && localStorage.hasOwnProperty("token")) {
    loginLink.href = '#'
    loginLink.innerText = `LogOut [ ${localStorage.getItem("user")} ]`

    loginLink.addEventListener('click', handleLogOut)
}

function handleLogOut(event) {
    event.preventDefault()

    localStorage.removeItem("user")
    localStorage.removeItem("userId")
    localStorage.removeItem("token")

    loginLink.removeEventListener("click", handleLogOut)
    loginLink.href = 'login.html'
    loginLink.innerText = 'Login'
}