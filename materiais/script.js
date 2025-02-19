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






async function loadMaterials() {
    try {
        const response = await fetch('http://localhost:1337/api/materiais');
        const data = await response.json();
        const materialsList = document.querySelector('.materiais');
        const loggedUser = localStorage.getItem("loggedUser");

        materialsList.innerHTML = ''; // limpando  a lista antes de adicionar novos itens

        data.data.forEach(material => {
            const listItem = document.createElement('li');
            listItem.className = 'materiaislista';

            // link do material
            const link = document.createElement('a');
            link.href = material.link;
            link.textContent = material.titulomaterial;

            // adiciona o link ao item da lista
            listItem.appendChild(link);

            // botão de exclusão (apenas para a professora)
            if (loggedUser === "ericapaivas@gmail.com") {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.className = 'delete-button';
                deleteButton.setAttribute('onclick', `deleteMaterial('${material.documentId}')`);
                listItem.appendChild(deleteButton);
            }

            // adiciona o item à lista de materiais
            materialsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao carregar materiais:', error);
    }
}
async function addMaterial(titulo, link) {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser === "ericapaivas@gmail.com") {
        try {
            const response = await fetch('http://localhost:1337/api/materiais', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                },
                body: JSON.stringify({
                    data: {
                        titulomaterial: titulo,
                        link: link
                    }
                })
            });

            if (response.ok) {
                alert('Material adicionado com sucesso!');
                loadMaterials(); // recarrega a lista de materiais
            } else {
                alert('Erro ao adicionar material.');
            }
        } catch (error) {
            console.error('Erro ao adicionar material:', error);
        }
    } else {
        alert('Apenas professores podem adicionar materiais.');
    }
}


async function deleteMaterial(documentId) {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser === "ericapaivas@gmail.com") {
        try {
            const response = await fetch(`http://localhost:1337/api/materiais/${documentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
            });

            if (response.ok) {
                alert('Material excluído com sucesso!');
                loadMaterials(); // recarrega a lista de materiais
            } else {
                alert('Erro ao excluir material.');
            }
        } catch (error) {
            console.error('Erro ao excluir material:', error);
        }
    } else {
        alert('Apenas professores podem excluir materiais.');
    }
}

document.getElementById('adicionarForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const link = document.getElementById('link').value;
    addMaterial(titulo, link);
});



function setUserType() {
    const loggedUser = localStorage.getItem("loggedUser");
    const addMaterialForm = document.getElementById('adicionarForm');
    const deleteButtons = document.querySelectorAll('.delete-button');

    if (!loggedUser) {
        // usuário não logado
        userTypeElement.textContent = "Não logado";
        logoutButton.textContent = "Entrar";
        logoutButton.addEventListener("click", function () {
            window.location.href = "../login/index.html";
        });
        addMaterialForm.style.display = 'none'; // Oculta o formulário
        deleteButtons.forEach(button => button.style.display = 'none'); // Oculta os botões de exclusão
    } else if (loggedUser === "ericapaivas@gmail.com") {
        // Usuário é a professora
        userTypeElement.textContent = "Professor";
        logoutButton.textContent = "Logout";
        logoutButton.addEventListener("click", handleLogout);
        addMaterialForm.style.display = 'block'; // Mostra o formulário
        deleteButtons.forEach(button => button.style.display = 'inline-block'); // Mostra os botões de exclusão
    } else {
        // Usuário é um estudante
        userTypeElement.textContent = "Estudante";
        logoutButton.textContent = "Logout";
        logoutButton.addEventListener("click", handleLogout);
        addMaterialForm.style.display = 'none'; // Oculta o formulário
        deleteButtons.forEach(button => button.style.display = 'none'); // Oculta os botões de exclusão
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadMaterials();
    setUserType();
});