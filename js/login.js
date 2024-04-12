// login function
// Define the admin user object
var adminUser = {
    name: "Abdleaaziz",
    email: "admin@gmail.com",
    password: "1234",
};

// Store the admin user object in local storage
localStorage.setItem("adminUser", JSON.stringify(adminUser));

// Modify your login function to check for the admin user as well
function login(event) {
    event.preventDefault();

    var users = JSON.parse(localStorage.getItem("users")) || [];
    var adminUser = JSON.parse(localStorage.getItem("adminUser"));

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var user = users.find((user) => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else if (email === adminUser.email && password === adminUser.password) {
        // Redirect to admin page if the provided credentials match the admin user
        window.location.href = "admin.html";
    } else {
        alert("Email ou mot de passe incorrect");
    }
}

// Add event listener to the login form
var loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", login);
}


// logout function
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
