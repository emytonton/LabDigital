const API_URL = "http://localhost:1337/api/atividades"; // URL da API do Strapi

// Ao submeter o formulário, adiciona a atividade ao Strapi e atualiza a lista
document.getElementById('activityForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    await addActivity(date, description);
    this.reset(); // Limpa o formulário
    await fetchActivities(); // Atualiza a lista de atividades
});

// Função para adicionar atividade no Strapi
async function addActivity(date, description) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    data: date,
                    descricao: description,
                    concluida: false
                }
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao adicionar a atividade.");
        }

        console.log("Atividade adicionada com sucesso.");
    } catch (error) {
        console.error("Erro ao adicionar atividade:", error);
    }
}

// Função para buscar e exibir as atividades salvas no Strapi
async function fetchActivities() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Erro ao buscar as atividades.");
        }

        const data = await response.json();
        console.log("Atividades carregadas:", data); // Log para verificar os dados recebidos

        const activityList = document.getElementById('activityList');
        activityList.innerHTML = ""; // Limpa a tabela antes de renderizar

        // Verifica se o usuário é estudante
        const loggedUser = localStorage.getItem("loggedUser");
        const isStudent = loggedUser && loggedUser !== "ericapaivas@gmail.com";

        if (isStudent) {
            document.getElementById("acoes-header").style.display = "none";
        } else {
            document.getElementById("acoes-header").style.display = "table-cell";
        }

        data.data.forEach(activity => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${activity.data}</td>
                <td>${activity.descricao}</td>
                <td class="status"><span>${activity.concluida ? "Concluída" : "Não Concluída"}</span></td>
                ${!isStudent ? `
                    <td>
                        <button class="complete-button" onclick="toggleStatus('${activity.documentId}', ${activity.concluida}, '${activity.data}', '${activity.descricao}')">Concluir</button>

                        <button class="delete-button" onclick="deleteActivity('${activity.documentId}')">Excluir</button>
                    </td>` 
                : ''}
            `;
            activityList.appendChild(row);
        });

        setCalendarPermissions(); // Reaplica permissões
    } catch (error) {
        console.error("Erro ao buscar atividades:", error);
    }
}

// Função para alternar o status da atividade no Strapi
async function toggleStatus(id, currentStatus, date, descricao) {
    try {
        // Recupera o token JWT do localStorage, se existir
        const token = localStorage.getItem("jwt");

        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
                data: {
                    data: date,
                    descricao: descricao,
                    concluida: !currentStatus
                }
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar o status da atividade.");
        }

        console.log(`Status da atividade ${id} atualizado.`);
        await fetchActivities(); // Atualiza a lista de atividades
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
    }
}

// Função para excluir atividade no Strapi
async function deleteActivity(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir a atividade.");
        }

        console.log(`Atividade ${id} excluída com sucesso.`);
        await fetchActivities(); // Atualiza a lista de atividades
    } catch (error) {
        console.error("Erro ao excluir atividade:", error);
    }
}

// Funções de gerenciamento de perfil e permissões
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

// Função para aplicar permissões com base no tipo de usuário
function setCalendarPermissions() {
    const loggedUser = localStorage.getItem("loggedUser");

    if (!loggedUser) {
        document.querySelector('.container').innerHTML = "<p>Por favor, faça login para acessar o calendário.</p>";
    } else if (loggedUser !== "ericapaivas@gmail.com") {
        // Ocultar o formulário de adicionar atividades
        document.getElementById("activityForm").style.display = "none";

        // Ocultar botões de concluir e excluir em todas as atividades
        document.querySelectorAll(".complete-button, .delete-button").forEach(button => button.style.display = "none");
    }
}

setCalendarPermissions(); // Chamada inicial
fetchActivities(); // Carrega as atividades ao abrir a página