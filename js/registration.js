// register function
function register(event) {
    event.preventDefault();

    var users = JSON.parse(localStorage.getItem("users")) || [];

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var newStudent = {
        ID: users.length + 1,
        username: username,
        email: email,
        password: password,
        blocages: [],
        role: "student",
    };

    // users.push(newStudent);

    // localStorage.setItem("users", JSON.stringify(users));

    if (users.some((v) => {
        return v.email === email;
    })) {
        alert("Email already exists");
        return;
    } else {
        users.push(newStudent);
        localStorage.setItem("users", JSON.stringify(users));
    }

    alert("Hello " + username + " your registration is successful!");

    window.location.href = "login.html";
}

document.getElementById("registerForm").addEventListener("submit", register);



// logout function
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

document.getElementById("logout").addEventListener("click", logout);
