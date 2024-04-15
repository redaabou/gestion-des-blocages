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
    console.log(dificultie);
    trEl.innerHTML = `
        <td>${dificultie.username}</td>
        <td>${dificultie.date}</td>
        <td id="popup-link"><i onClick="showPopup(${dificultie.id})" class="fa-solid fa-eye"></i><a/></td>
        <td id="checked">
        <i ${dificultie.formateurIsValide == false ? `class="fa-solid fa-square-xmark"` : `class= "fa-solid fa-square-check"`}"></i>
        </td>
        <td></td>
        <td id= "comment"><i onClick="showCommentPopup(${dificultie.id})" class="fa-regular fa-comments"></i></td>
    `;
    tbodyEla.appendChild(trEl);

    // // Add click event listener to the row
    // const popupLink = trEl.querySelector("#popup-link");
    // popupLink.addEventListener('click', () => showPopup());


});



// show comment popup
function showCommentPopup(id) {
    const popupWindow = document.getElementById("popup-window");
    popupWindow.classList.toggle('show');
    popupWindow.innerHTML = ''; // Clear the popup window content
    popupWindow.innerHTML = `<div id="modifyd" class="popup-box-admin">
    <div class="close-btn"><a class="close-btn fas fa-times" onclick="closePopup()"></a></div>
    <h2 style="color: #CE0033; margin-bottom: 50px;">Modal</h2>
    <div class="secInput">
            <div>
                <input type="radio" checked name="radio1" id="radio" value="Encadré dans leurs recherches de solutions"> <label for="radio1" id="radio1">Encadré dans leurs recherches de solutions</label>
             </div>
             <div>
                 <input type="radio" name="radio1" id="radio" value="Aidé par leurs pairs"> <label for="radio1" id="radio1">Aidé par leurs pairs</label>
             </div>
             <div>
                 <input type="radio" name="radio1" id="radio" value="Intervention directe de formateur"> <label for="radio1" id="radio1">Intervention directe de formateur</label>
             </div>
              <div>
                 <textarea type="text" class="solution" placeholder="Solution"></textarea>
                 <p class="errSolution"></p>
              </div>

              <div class="btn" id="btnValide">
              <button class="btnModel " id="validePopupModel" onClick="valide(${id})">valide</button>
           
          </div>
      </div>
              
</div>
</div>`
}

// get radio value
let radio = document.querySelectorAll('#radio');
let valueRadio
radio.forEach((item) => item.addEventListener('change', function (e) {

    valueRadio = e.target.value;
    console.log(valueRadio);
}));

let input = document.querySelector('.solution');

input.addEventListener('change', inputChange);
let valueInput = "";
function inputChange(e) {

    valueInput = e.target.value;
    return valueInput;
}



function valide(id) {

    console.log(inputChange());
    let dificulties = JSON.parse(localStorage.getItem("dificultie"));
    let dificultie = dificulties.find((dificultie) => dificultie.id === id);

    console.log(valueRadio);
    document.querySelector('.fa-square-xmark').classList = "fa-solid fa-square-check";
    dificultie.deficulterRencontre = valueRadio;

    dificultie.isValide = true;
    dificultie.formateurIsValide = true;
    localStorage.setItem("dificultie", JSON.stringify(dificulties));


}




// show difficulty popup
function showPopup(id) {

    let dificulties = JSON.parse(localStorage.getItem("dificultie"));
    let dificultie = dificulties.find((dificultie) => dificultie.id === id);
    console.log(dificulties);

    const popupWindow = document.getElementById("popup-window");
    popupWindow.classList.toggle('show');
    popupWindow.innerHTML = ''; // Clear the popup window content


    popupWindow.innerHTML += `<div id="modifyd" class="popup-box-admin">
    <div class="close-btn"><a class="close-btn fas fa-times" onclick="closePopup()"></a></div>
    <h2 style="color: #CE0033;">Difficulté</h2>
    <textarea style= "width:100%; height:50px;" id="popup-content" class="popup-content" placeholder="Difficulté rencontrée">
    ${dificultie.deficulterRencontre}
    </textarea>
    </div>
    </div>`

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

