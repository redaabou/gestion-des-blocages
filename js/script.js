
// popup function
function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
}

function openModifyPopup() {
    const overlay = document.getElementById('modifyPopupOverlay');
    overlay.classList.toggle('show');
}

function defficultePopup() {
    const overlay = document.getElementById('defficultePopupOverlay');
    overlay.classList.toggle('show');
}

// logout function
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}


