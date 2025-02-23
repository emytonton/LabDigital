
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







const API_URL = "http://localhost:1337/api/materiais"; // URL da API

// Função para buscar materiais da API
async function buscarMateriais() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
            throw new Error("Erro ao carregar materiais.");
        }
        const dados = await resposta.json();
        return dados.data; // Retorna os dados da API
    } catch (error) {
        console.error("Erro ao buscar materiais:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

// Função para exibir os resultados da pesquisa
function exibirResultados(resultados) {
    const resultadosDiv = document.getElementById("resultados-pesquisa");
    resultadosDiv.innerHTML = ""; // Limpa os resultados anteriores

    if (resultados.length === 0) {
        resultadosDiv.innerHTML = "<div class='material'>Nenhum material encontrado.</div>";
    } else {
        resultados.forEach(material => {
            const materialDiv = document.createElement("div");
            materialDiv.className = "material";
            materialDiv.innerHTML = `
                <h3>${material.titulomaterial}</h3>
                <a href="${material.link}" target="_blank">Acessar material</a>
            `;
            resultadosDiv.appendChild(materialDiv);
        });
    }

    // Exibe a lista de resultados
    resultadosDiv.classList.add("visivel");
}

// Função para pesquisar materiais
function pesquisarMateriais(materiais, termo) {
    const resultados = materiais.filter(material =>
        material.titulomaterial.toLowerCase().includes(termo.toLowerCase())
    );
    exibirResultados(resultados);
}

// Evento de input para pesquisar ao digitar
document.getElementById("input1").addEventListener("input", async function (e) {
    const termo = e.target.value.trim(); // Obtém o valor do input

    if (termo === "") {
        // Esconde a lista se o input estiver vazio
        document.getElementById("resultados-pesquisa").classList.remove("visivel");
        return;
    }

    const materiais = await buscarMateriais(); // Busca os materiais da API
    pesquisarMateriais(materiais, termo); // Realiza a pesquisa
});

// Esconde a lista ao clicar fora
document.addEventListener("click", function (e) {
    const resultadosDiv = document.getElementById("resultados-pesquisa");
    const input = document.getElementById("input1");

    if (e.target !== input && !resultadosDiv.contains(e.target)) {
        resultadosDiv.classList.remove("visivel");
    }
});