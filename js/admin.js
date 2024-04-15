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
        <td id="popup-link"><i class="fa-solid fa-eye"></i><a/></td>
        <td id="checked">
        <i ${dificultie.formateurIsValide == false ? `class="fa-solid fa-square-xmark"` : `class= "fa-solid fa-square-check"`}"></i>
        </td>
        <td></td>
        <td id= "comment"><i onClick="showCommentPopup(${dificultie.id})" class="fa-regular fa-comments"></i></td>
    `;
    tbodyEla.appendChild(trEl);

    // Add click event listener to the row
    const popupLink = trEl.querySelector("#popup-link");
    popupLink.addEventListener('click', () => showPopup());


    // Add change event listener to the checkbox
    // const checkbox = trEl.querySelector(`#blockUser${index}`);
    // checkbox.addEventListener('change', (event) => {
    //     if (event.target.checked) {
    //         // If checkbox is checked, perform action
    //         // For example: Call a function to block the user
    //         blockUser(user);
    //         checkbox.checked = true;
    //         // Save the user's data individually
    //         localStorage.setItem("user_" + user.ID, JSON.stringify(user));

    //         // Save the user's data in the users array
    //         users[index].blocked = true;

    //         // Save the users array to local storage
    //         localStorage.setItem("users", JSON.stringify(users));

    //     } else {
    //         // If checkbox is unchecked, perform action
    //         // For example: Call a function to unblock the user
    //         unblockUser(user);
    //         checkbox.checked = false;
    //         // Save the user's data individually
    //         localStorage.setItem("user_" + user.ID, JSON.stringify(user));

    //         // Save the user's data in the users array
    //         users[index].blocked = false;

    //         // Save the users array to local storage
    //         localStorage.setItem("users", JSON.stringify(users));
    //     }
    // });
});

// function blockUser(user) {
//     // Code to block the user
//     console.log(`Blocking user: ${user.username}`);
// }

// function unblockUser(user) {
//     // Code to unblock the user
//     console.log(`Unblocking user: ${user.username}`);
// }

// show comment popup




function showCommentPopup(id) {
    const popupWindow = document.getElementById("popup-window");
    popupWindow.classList.toggle('show');
    popupWindow.innerHTML = ''; // Clear the popup window content
    popupWindow.innerHTML = `<div id="modifyd" class="popup-box-admin">
    <div class="close-btn"><a class="close-btn fas fa-times" onclick="closePopup()"></a></div>
    <h2 style="color: #CE0033;">Commentaires</h2>
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

              <div class="btn">
              <button class="btnModel " id="validePopupModel" onClick="valide(${id})">valide</button>
           
          </div>
      </div>
              
</div>
</div>`
}

function valide(id) {
    document.querySelector('.fa-square-xmark').classList = "fa-solid fa-square-check";
    let dificulties = JSON.parse(localStorage.getItem("dificultie"));
    let dificultie = dificulties.find((dificultie) => dificultie.id === id);
    dificultie.isValide = true;
    dificultie.formateurIsValide = true;
    localStorage.setItem("dificultie", JSON.stringify(dificulties));

}


// show difficulty popup
function showPopup() {

    const popupWindow = document.getElementById("popup-window");
    popupWindow.classList.toggle('show');
    popupWindow.innerHTML = ''; // Clear the popup window content
    allDificulties.forEach((blocage, index) => {

        popupWindow.innerHTML += `<div id="modifyd" class="popup-box-admin">
    <div class="close-btn"><a class="close-btn fas fa-times" onclick="closePopup()"></a></div>
    <h2 style="color: #CE0033;">Difficulté</h2>
    <textarea style= "width:100%; height:50px;" id="popup-content" class="popup-content" placeholder="Difficulté rencontrée">
    ${blocage.deficulterRencontre}
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

