
const profileNav = document.getElementById("profilenav");
const profileDropdown = document.getElementById("profileDropdown");
const userTypeElement = document.getElementById("userType");
const logoutButton = document.getElementById("logout");


function setUserType() {
    const loggedUser = localStorage.getItem("loggedUser");

    if (!loggedUser) {
        
        userTypeElement.textContent = "Não logado";
        logoutButton.textContent = "Entrar";
        logoutButton.addEventListener("click", function () {
            window.location.href = "../login/index.html"; 
        });
    } else if (loggedUser === "ericapaivas@gmail.com") {
        
        userTypeElement.textContent = "Professor";
        logoutButton.textContent = "Logout";
        logoutButton.addEventListener("click", handleLogout);
    } else {
        
        userTypeElement.textContent = "Estudante";
        logoutButton.textContent = "Logout";
        logoutButton.addEventListener("click", handleLogout);
    }
}


function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("loggedUser"); 
    alert("Logout realizado com sucesso.");
    window.location.href = "../login/index.html"; 
}


profileNav.addEventListener("click", function () {
    profileDropdown.classList.toggle("show");
    setUserType(); 
});
