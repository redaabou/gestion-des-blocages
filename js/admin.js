// make admin name dynamic
var adminName = document.getElementById("admin-name");
var adminUser = JSON.parse(localStorage.getItem("adminUser"));
if (adminUser && adminUser.name) {
    adminName.innerHTML = `<p> Welcome Back, ${adminUser.name.charAt(0).toUpperCase() + adminUser.name.slice(1)}</p>`;
}


function getUserData() {
    return JSON.parse(localStorage.getItem('users')) || [];
}
var users = getUserData();

var blocages = users.flatMap((user) => user.blocages.map(b => ({ date: b.date, deficulterRencontre: b.deficulterRencontre })));

var tbodyEla = document.getElementById("tableBodyA");
tbodyEla.innerHTML = "";
users.forEach((user, index) => {
    var trEl = document.createElement("tr");
    trEl.innerHTML = `
        <td>${user.username}</td>
        <td>${blocages[index].date}</td>
        <td id="popup-link" ><i  class="fa-solid fa-eye" "></i></td>
        <td >
            <input type="checkbox" name="blockUser" id="blockUser${index}" ${user.blocked ? 'checked' : ''}>
        </td>
    `;
    tbodyEla.appendChild(trEl);
});
// ${blocages[index].deficulterRencontre}


// show difficulty popup
var popup = document.getElementById("popup-window");
var popupClose = document.getElementById("popup-close");
var popupLink = document.getElementById("popup-link");

popupLink.addEventListener("click", function () {
    popup.classList.add("show");
});




// logout function
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}




