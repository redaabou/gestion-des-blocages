
// popup function
function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
}

// Modify the openModifyPopup function to accept an index parameter
function openModifyPopup(index) {
    const overlay = document.getElementById('modifyPopupOverlay');
    overlay.classList.toggle('show');

    // Get the current user and the blocage to be modified
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var blocage = currentUser.blocages[index];

    // Populate the form fields with the current values
    document.getElementById('modiFormateur').value = blocage.formateur;
    document.getElementById('modiBrief').value = blocage.brif;
    document.getElementById('modiDifi').value = blocage.deficulterRencontre;
    document.getElementById('modiDate').value = blocage.date;

    // Add an event listener to the form
    document.querySelector('#modifyPopupOverlay form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get the new values from the form
        var formateur = document.getElementById('modiFormateur').value;
        var brif = document.getElementById('modiBrief').value;
        var deficulterRencontre = document.getElementById('modiDifi').value;
        var date = document.getElementById('modiDate').value;

        // Update the blocage
        currentUser.blocages[index] = {
            formateur: formateur,
            brif: brif,
            deficulterRencontre: deficulterRencontre,
            date: date,
        };

        // Save the updated user to local storage
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        // Update the table rows and close the popup
        populateTableRows();
        overlay.classList.toggle('show');
    });
}


// show difficulty popup
function defficultePopup(brief, difficulty) {
    const overlay = document.getElementById('defficultePopupOverlay');
    overlay.classList.toggle('show');
    overlay.innerHTML = `<div id="modifyd" class="popup-box">
    <div class="close-btn"><a class="close-btn fas fa-times" onclick="defficultePopup()"></a></div>
    <h2 style="color: #CE0033;">Difficulté</h2>
    <div class="popup-content">
    <h3>Brief</h3>
    <p> ${brief}</p>
    <h3>Difficulté rencontrée</h3>
    <p> ${difficulty}</p>
    </div>
    </div>`


}



// add row in table
// Retrieve the correct tbody element by its ID
const tbodyEl = document.getElementById("tableBody");

// Update the populateTableRows function to pass the index to openModifyPopup
function populateTableRows() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (tbodyEl) {
        tbodyEl.innerHTML = ""; // Clear existing rows
        currentUser.blocages.forEach((blocage, index) => {
            tbodyEl.innerHTML += `
                <tr>
                    <td>${blocage.formateur}</td>
                    <td>${blocage.date}</td>
                    <td><i class="fa-solid fa-eye" onclick="defficultePopup('${blocage.brif}', '${blocage.deficulterRencontre}')"></i></td>
                    <td class="validated"><i class="fa-solid fa-square-check"></i></td>
                    <td><i class="fa-regular fa-pen-to-square" onclick="openModifyPopup(${index})"></i></td>
                    <td id="delete" onClick="deleteRow(${index})"><i class="fa-solid fa-trash-can"></i></a></td>
                </tr>
            `;
        });
    }
}

// Call populateTableRows() on page load
window.addEventListener("load", function () {
    populateTableRows();
});

// Function to add row to table and local storage
function addRow(e) {
    e.preventDefault();
    var brif = document.getElementById("brief").value;
    var date = document.getElementById("date").value;
    var formateur = document.getElementById("formateur").value;
    var deficulterRencontre = document.getElementById("deficulterRencontre").value;
    console.log('deficulterRencontre', deficulterRencontre);

    var blocageEl = {
        brif: brif,
        date: date,
        formateur: formateur,
        deficulterRencontre: deficulterRencontre,
    };


    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.blocages.push(blocageEl);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    var users = JSON.parse(localStorage.getItem("users"));
    var userIndex = users.findIndex((user) => user.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));
    }


    populateTableRows(); // Update table rows


    // Clear form fields after adding row
    formEl.reset();
}

// Retrieve the form element by its ID
const formEl = document.getElementById("addRowToTable");

if (formEl) {
    formEl.addEventListener("submit", addRow);
}


// Function to delete row from table and storage
function deleteRow(index) {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.blocages.splice(index, 1); // Remove the blocage at the specified index
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Get the users array from local storage
    var users = JSON.parse(localStorage.getItem("users"));

    // Find the index of the current user in the users array
    var userIndex = users.findIndex(user => user.username === currentUser.username);

    // Update the user in the users array
    users[userIndex] = currentUser;

    // Save the updated users array back to local storage
    localStorage.setItem("users", JSON.stringify(users));

    populateTableRows(); // Update table rows
}






//  make the user name dynamic

var nameUsers = document.getElementById("user-name");
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser && currentUser.username) {
    nameUsers.innerHTML = `<p> Welcome Back, ${currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}</p>`;
}
