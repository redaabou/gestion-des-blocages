// login function
function login(event) {
    event.preventDefault();

    var users = JSON.parse(localStorage.getItem("users")) || [];

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;


    var user = users.find((user) => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
        console.log("hello");
    } else {
        alert("Email ou mot de passe incorrect");
    }
}

document.getElementById("loginForm").addEventListener("submit", login);




