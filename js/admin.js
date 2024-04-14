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
        <td id="popup-link"><i class="fa-solid fa-eye"></i><a/></td>
        <td id="checked">
            <input type="checkbox" name="blockUser" id="blockUser${index}" ${user.blocked ? 'checked' : ''}>
        </td>
        <td></td>
        <td><i class="fa-regular fa-comments"></i></td>
    `;
    tbodyEla.appendChild(trEl);

    // Add click event listener to the row
    const popupLink = trEl.querySelector("#popup-link");
    popupLink.addEventListener('click', () => showPopup(user));

    // Add change event listener to the checkbox
    const checkbox = trEl.querySelector(`#blockUser${index}`);
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            // If checkbox is checked, perform action
            // For example: Call a function to block the user
            blockUser(user);
        } else {
            // If checkbox is unchecked, perform action
            // For example: Call a function to unblock the user
            unblockUser(user);
        }
    });
});

function blockUser(user) {
    // Code to block the user
    console.log(`Blocking user: ${user.username}`);
}

function unblockUser(user) {
    // Code to unblock the user
    console.log(`Unblocking user: ${user.username}`);
}

// ${blocages[index].deficulterRencontre}



// show difficulty popup


function showPopup(user) {
    var blocages = user.blocages.map(b => ({ deficulterRencontre: b.deficulterRencontre }));
    var deficulterRencontre = blocages.map((blocage) => blocage.deficulterRencontre);

    const popupWindow = document.getElementById("popup-window");
    popupWindow.classList.toggle('show');
    popupWindow.innerHTML = ''; // Clear the popup window content
    blocages.forEach((blocage, index) => {
        popupWindow.innerHTML += `<div id="modifyd" class="popup-box-admin">
    <div class="close-btn"><a class="close-btn fas fa-times" onclick="closePopup()"></a></div>
    <h2 style="color: #CE0033;">Difficulté</h2>
    <textarea style= "width:100%; height:50px;" id="popup-content" class="popup-content" placeholder="Difficulté rencontrée">
    ${blocages[index].deficulterRencontre}
    </textarea>
    </div>
    </div>`
    });
}

function closePopup() {
    const popupWindow = document.getElementById("popup-window");
    popupWindow.classList.remove('show');
}




// logout function
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}




