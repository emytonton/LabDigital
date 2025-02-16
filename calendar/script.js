document.getElementById('activityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    addActivity(date, description);
    this.reset(); // Limpa o formulário
});

function addActivity(date, description) {
    const activityList = document.getElementById('activityList');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${date}</td>
        <td>${description}</td>
        <td class="status"><span>Não Concluída</span></td>
        <td><button onclick="toggleStatus(this)">Concluir</button></td>
    `;

    activityList.appendChild(row);
}

function toggleStatus(button) {
    const row = button.parentElement.parentElement;
    const statusCell = row.querySelector('.status span');

    if (statusCell.textContent === 'Não Concluída') {
        statusCell.textContent = 'Concluída';
        row.classList.add('completed');
    } else {
        statusCell.textContent = 'Não Concluída';
        row.classList.remove('completed');
    }
}




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
