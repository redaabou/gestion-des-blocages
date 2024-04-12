// register function
function register(event) {
    event.preventDefault();

    var users = JSON.parse(localStorage.getItem("users")) || [];

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var newUser = {
        ID: users.length + 1,
        username: username,
        email: email,
        password: password,
        blocages: [],
        role: "student",
    };

    // Check if email already exists for another user
    if (users.some((user) => user.email === email)) {
        alert("Email already exists");
        return;
    }

    users.push(newUser);

    // Save the user's data individually
    localStorage.setItem("user_" + newUser.ID, JSON.stringify(newUser));

    alert("Hello " + username + ", your registration is successful!");

    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    var registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", register);
    }
});

var currentUserId = getCurrentUserId();

function getCurrentUserId() {
    // Get the logged in user's email from local storage
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
        // Find the user based on the logged in user's email
        var userKeys = Object.keys(localStorage);
        for (var i = 0; i < userKeys.length; i++) {
            if (userKeys[i].startsWith("user_")) {
                var userData = JSON.parse(localStorage.getItem(userKeys[i]));
                if (userData.email === loggedInUserEmail) {
                    return userData.ID;
                }
            }
        }
    }

    return null;
}
