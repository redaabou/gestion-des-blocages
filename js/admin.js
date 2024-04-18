// make admin name dynamic
var adminName = document.getElementById("admin-name");
var adminUser = JSON.parse(localStorage.getItem("adminUser"));
if (adminUser && adminUser.name) {
    adminName.innerHTML = `<p> Welcome Back, ${adminUser.name.charAt(0).toUpperCase() + adminUser.name.slice(1)}</p>`;
}


// Get the dificulties from local storage
var allDificulties = JSON.parse(localStorage.getItem("dificultie")) || [];




var tbodyEla = document.getElementById("tableBodyA");
tbodyEla.innerHTML = "";
allDificulties.forEach((dificultie, index) => {
    var trEl = document.createElement("tr");
    trEl.innerHTML = `
        <td>${dificultie.username}</td>
        <td>${dificultie.date}</td>
        <td id="popup-link"><i onClick="showPopup(${dificultie.id})" class="fa-solid fa-eye"></i><a/></td>
        <td id="checked">
        <i ${dificultie.formateurIsValide == false ? `class="fa-solid fa-square-xmark"` : `class= "fa-solid fa-square-check"`}"></i>
        </td>
        <td></td>
        <td id= "comment"><i onClick="openPopupModel(${dificultie.id})" id="openPopupModel" class="fa-regular fa-comments"></i></td>
    `;
    tbodyEla.appendChild(trEl);


});





background = document.querySelector(".background")
// Function to open the popup
function openPopupModel(x) {

    background.style.display = "block";
    document.querySelector(".btnModel").addEventListener("click", () => addModol(x))
    document.getElementById("popupModel").style.display = "block";


}

// Function to close the popup
function closePopupModel() {
    document.getElementById("popupModel").style.display = "none";

}

// Event listener for closing the popup
document.getElementById("closePopupModel").addEventListener("click", closePopupModel);


// get radio value
let radio = document.querySelectorAll('#radio');
let valueRadio
radio.forEach((item) => item.addEventListener('change', function (e) {

    valueRadio = e.target.value;
}));

let input = document.querySelector('.solution');

input.addEventListener('change', inputChange);
let valueInput = "";
function inputChange(e) {

    valueInput = e.target.value;

}

function addModol(x) {

    let studentModelBrief = allDificulties.find(item => item.id == x)
    studentModelBrief.id = studentModelBrief.id
    studentModelBrief.typeModel = valueRadio
    studentModelBrief.modal = valueInput
    studentModelBrief.formateurIsValide = true
    studentModelBrief.isValide = true
    studentModelBrief.isDisabled = true
    localStorage.setItem("dificultie", JSON.stringify(allDificulties))
    document.querySelector(".errSolution").style.display = "none"

    window.location.reload()

}






// show difficulty popup
function showPopup(id) {

    let dificulties = JSON.parse(localStorage.getItem("dificultie"));
    let dificultie = dificulties.find((dificultie) => dificultie.id === id);

    const popupWindow = document.getElementById("popup-window");
    popupWindow.classList.toggle('show');
    popupWindow.innerHTML = ''; // Clear the popup window content


    popupWindow.innerHTML += `<div id="modifyd" class="popup-box-admin">
    <div class="close-btn"><a class="close-btn fas fa-times" onclick="closePopup()"></a></div>
    <h2 style="color: #CE0033;">Difficulté</h2>
    <h3 id:"alignTitre" style="
    display: flex;"> Difficulté rencontrée:</h3>
    <p style= "width:100%; height:50px;" id="popup-content" class="popup-content" placeholder="Difficulté rencontrée">
    ${dificultie.deficulterRencontre}
    </p>

    <div id="aficherSolution" ${dificultie.formateurIsValide == true ? `style= "display:block;"` : ""}>
    <h3 id:"alignTitre" style="display: flex;"> Modalité de formation:</h3>
    <p style= "width:100%; height:50px;" id="popup-content" class="popup-content" placeholder="Difficulté rencontrée">
    ${dificultie.typeModel}
    </p>

    <h3 id:"alignTitre" style="display: flex;"> Solution proposée:</h3>
    <p style= "width:100%; height:50px;" id="popup-content" class="popup-content" placeholder="Difficulté rencontrée">
    ${dificultie.modal}
    </p>
    </div>
    
    </div>
    </div>`

}

function closePopup() {
    const popupWindow = document.getElementById("popup-window");
    popupWindow.classList.remove('show');
}

function closePopupSolution() {
    document.getElementById("popupModel").style.display = "none";
    background.style.display = "none";
}




// logout function
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
