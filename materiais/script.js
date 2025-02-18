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


document.addEventListener("DOMContentLoaded", function () {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser === "ericapaivas@gmail.com") {
        // Exibir botões de administração
        document.querySelectorAll(".materiaislista").forEach(item => {
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.style.marginLeft = "10px";
            deleteButton.style.color = "red";
            deleteButton.style.cursor = "pointer";
            deleteButton.addEventListener("click", function () {
                // Lógica para excluir o material
                item.remove();
                alert("Material excluído com sucesso.");
            });
            item.appendChild(deleteButton);
        });

        // Botão para adicionar novo material
        const addMaterialButton = document.createElement("button");
        addMaterialButton.textContent = "Adicionar Material";
        addMaterialButton.style.display = "block";
        addMaterialButton.style.margin = "20px 0";
        document.querySelector(".container").appendChild(addMaterialButton);

        addMaterialButton.addEventListener("click", function () {
            // Lógica para adicionar novo material (você pode criar um modal ou formulário aqui)
            const sectionTitle = prompt("Digite o título da seção:");
            const materialName = prompt("Digite o nome do material:");
            const materialLink = prompt("Digite o link do material:");
            
            if (sectionTitle && materialName && materialLink) {
                alert(`Novo material adicionado: ${materialName}`);
                // Aqui você pode adicionar a lógica para salvar no banco ou API
            }
        });
    }
});
