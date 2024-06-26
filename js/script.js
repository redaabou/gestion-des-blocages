

// popup function
function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
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
    var difiUser = JSON.parse(localStorage.getItem("dificultie"));
    if (difiUser) {
        difiUser = difiUser.filter((blocage) => blocage.email === currentUser.email);
        console.log(difiUser);
    }

    if (difiUser) {
        tbodyEl.innerHTML = ""; // Clear existing rows
        difiUser.forEach((blocage, index) => {
            tbodyEl.innerHTML += `
                <tr>
                    <td>${blocage.formateur}</td>
                    <td>${blocage.date}</td>
                    <td><i class="fa-solid fa-eye" onclick="defficultePopup('${blocage.brif}', '${blocage.deficulterRencontre}')"></i></td>
  
                    <td class="validated">
                    <i ${blocage.isValide == false ? `class="fa-solid fa-square-xmark"` : `class= "fa-solid fa-square-check"`}  style="color: #ff0000;"></i>
                    <i ${blocage.isValide == true ? `class="fa-regular fa-lightbulb" style="color: #f0bd05; margin-left: 15px;"` : ``} onClick= "solution('${blocage.id}')" </i>
                    
                    </td>
                    <td><i id= "modi" ${blocage.isDisabled == false ? `class="fa-regular fa-pen-to-square" style="color: #3431dd;"` : `class="fa-regular fa-pen-to-square disabledIcon"`}  onClick="fct(${blocage.id})"></i></td>
                    <td><i id="delete" ${blocage.isDisabled == false ? `class="fa-solid fa-trash-can" style="color: #f00505;"` : `class="fa-solid fa-trash-can disabledIcon"`} onClick="deleteRow(${blocage.id})"></i></td>
                </tr>
            `;
        });
    }
}



// function to show solution
function solution(id) {
    console.log("id is:", id);
    let dificulties = JSON.parse(localStorage.getItem("dificultie"));
    let dificultie = dificulties.find((dificultie) => dificultie.id == id);
    console.log(dificulties);
    console.log(dificultie);

    const popupWindow = document.getElementById("popup-window");
    popupWindow.classList.toggle('show');
    popupWindow.innerHTML = ''; // Clear the popup window content

    popupWindow.innerHTML += `<div id="modifyd" class="popup-box-admin">
    <div class="close-btn"><a class="close-btn fas fa-times" onclick="closePopup()"></a></div>
    <h2 style="color: #CE0033;">Solution</h2>
    <h3 id= "alginModal">Methodologie:</h3>
    <p style= "width:100%; height:50px;" id="popup-content" class="popup-content solution2" placeholder="Difficulté rencontrée">
    ${dificultie.typeModel}
    </p>
    <h3 id= "alginModal">Guide:</h3>
    <p style= "width:100%; height:50px;" id="popup-content" class="popup-content solution2" placeholder="Difficulté rencontrée">
    ${dificultie.modal}
    </p>

    </div>
    </div>`


}

// function to close the popup
function closePopup() {
    const popupWindow = document.getElementById("popup-window");
    popupWindow.classList.remove('show');
}

// function to modify the row
function fct(id) {
    var difiUser = JSON.parse(localStorage.getItem("dificultie"));
    let getOne = difiUser.find((blocage) => blocage.id === id);

    // Populate the form fields with the current values
    document.getElementById('modiFormateur').value = getOne.formateur;
    document.getElementById('modiBrief').value = getOne.brif;
    document.getElementById('modiDifi').value = getOne.deficulterRencontre;
    document.getElementById('modiDate').value = getOne.date;

    const overlay = document.getElementById('modifyPopupOverlay');
    overlay.classList.toggle('show');

    // Add an event listener to the form
    document.querySelector('#change').addEventListener('click', function (e) {
        e.preventDefault();
        getOne.formateur = document.getElementById('modiFormateur').value;
        getOne.brif = document.getElementById('modiBrief').value;
        getOne.deficulterRencontre = document.getElementById('modiDifi').value;
        getOne.date = document.getElementById('modiDate').value;
        localStorage.setItem("dificultie", JSON.stringify(difiUser));
        console.log(getOne);
        window.location.href = "dashboard.html";
    })




}

// add close button to the popup
const closeBtn = document.getElementById("close");
closeBtn.addEventListener("click", function () {
    const overlay = document.getElementById('modifyPopupOverlay');
    overlay.classList.remove('show');

});






// Call populateTableRows() on page load
window.addEventListener("load", function () {
    populateTableRows();
});

// Function to add row to table and local storage
const dificultie = JSON.parse(localStorage.getItem("dificultie")) || [];

let i = dificultie.length;
function addRow(e) {
    e.preventDefault();
    console.log(dificultie);
    if (dificultie && dificultie.length > 0) {
        console.log(dificultie);
        i++;
    } else {
        i++;
    }
    var brif = document.getElementById("brief").value;
    var date = document.getElementById("date").value;
    var formateur = document.getElementById("formateur").value;
    var deficulterRencontre = document.getElementById("deficulterRencontre").value;

    var blocageEl = {
        id: i,
        brif: brif,
        date: date,
        email: currentUser.email,
        formateur: formateur,
        deficulterRencontre: deficulterRencontre,
        isValide: false,
        username: currentUser.username,
        formateurIsValide: false,
        modal: "",
        typeModal: "",
        isDisabled: false
    };

    let allDificulties = [];


    // var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // currentUser.blocages.push(blocageEl);


    let allDifi = JSON.parse(localStorage.getItem("dificultie"));
    if (allDifi) {
        allDificulties = [...allDifi, blocageEl];
    } else {
        allDificulties.push(blocageEl);
        localStorage.setItem("dificultie", JSON.stringify(allDificulties));

    }
    localStorage.setItem("dificultie", JSON.stringify(allDificulties));

    togglePopup(); // Close the popup

    populateTableRows(); // Update table rows

    // Clear form fields after adding row
    formEl.reset();
}

// Retrieve the form element by its ID
const formEl = document.getElementById("addRowToTable");

if (formEl) {
    formEl.addEventListener("submit", addRow);
    window.addEventListener("load", populateTableRows);


}


// Function to delete row from table and storage
function deleteRow(index) {

    let allDifi = JSON.parse(localStorage.getItem("dificultie"));
    const difRemove = allDifi.filter((blocage) => blocage.id !== index);
    localStorage.setItem("dificultie", JSON.stringify(difRemove));
    populateTableRows(); // Update table rows
}






//  make the user name dynamic

var nameUsers = document.getElementById("user-name");
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser && currentUser.username) {
    nameUsers.innerHTML = `<p > Welcome Back, ${currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}</p>`;
}
