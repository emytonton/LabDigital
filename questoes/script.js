const API_URL = "http://localhost:1337/api/questoes";

// Função para carregar questões do Strapi
async function carregarQuestoes() {
    try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();

        if (!dados.data || dados.data.length === 0) {
            document.getElementById("question-container").innerHTML = "<p>Nenhuma questão disponível.</p>";
            return;
        }

        const questionContainer = document.getElementById("question-container");
        questionContainer.innerHTML = ""; // Limpa o container antes de adicionar as questões

        dados.data.forEach((questao, questaoIndex) => {
            const titulo = questao.titulo || "Pergunta sem título"; // Verifica se 'titulo' existe
            const opcoes = questao.opcoes?.data?.opc_org || []; // Verifica se 'opcoes' existe
            const respostaCorreta = questao.resposta_correta;

            const questaoDiv = document.createElement("div");
            questaoDiv.classList.add("questao");

            const tituloElement = document.createElement("h3");
            tituloElement.innerText = `Questão ${questaoIndex + 1}: ${titulo}`;
            questaoDiv.appendChild(tituloElement);

            if (opcoes.length === 0) {
                questaoDiv.innerHTML += "<p>Questão sem opções.</p>";
            } else {
                const optionsDiv = document.createElement("div");
                optionsDiv.classList.add("options");

                opcoes.forEach((opcao, index) => {
                    const button = document.createElement("button");
                    button.innerText = opcao;
                    button.onclick = () => verificarResposta(index, respostaCorreta, questaoDiv);
                    optionsDiv.appendChild(button);
                });

                questaoDiv.appendChild(optionsDiv);
            }

            const resultDiv = document.createElement("div");
            resultDiv.id = `result-${questaoIndex}`;
            questaoDiv.appendChild(resultDiv);

            questionContainer.appendChild(questaoDiv);
        });

    } catch (error) {
        console.error("Erro ao carregar questões:", error);
    }
}

// Função para verificar a resposta
function verificarResposta(escolha, respostaCorreta, questaoDiv) {
    const resultDiv = questaoDiv.querySelector("div[id^='result-']");
    if (escolha === respostaCorreta) {
        resultDiv.innerText = "Resposta correta!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.innerText = "Resposta errada!";
        resultDiv.style.color = "red";
    }
}

// Função para adicionar nova questão via formulário
async function adicionarQuestao(event) {
    event.preventDefault();

    const titulo = document.getElementById("tituloQuestao").value;
    const opcoes = [
        document.getElementById("opcao1").value,
        document.getElementById("opcao2").value,
        document.getElementById("opcao3").value,
        document.getElementById("opcao4").value,
        document.getElementById("opcao5").value,
    ];
    const respostaCorreta = parseInt(document.getElementById("respostaCorreta").value);

    const novaQuestao = {
        data: {
            titulo: titulo,
            opcoes: { data: { titulo, opc_org: opcoes, responds_contra: respostaCorreta } },
            resposta_correta: respostaCorreta
        }
    };

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(novaQuestao),
        });

        if (!resposta.ok) throw new Error("Erro ao adicionar questão.");

        document.getElementById("adicionarQuestaoForm").reset();
        carregarQuestoes(); // Atualiza a lista de questões
    } catch (error) {
        console.error("Erro ao enviar questão:", error);
    }
}

// Evento para capturar o envio do formulário
document.getElementById("adicionarQuestaoForm").addEventListener("submit", adicionarQuestao);

// Lógica do perfil e logout
const profileNav = document.getElementById("profilenav");
const profileDropdown = document.getElementById("profileDropdown");
const userTypeElement = document.getElementById("userType");
const logoutButton = document.getElementById("logout");

// Função para mostrar/ocultar o botão "Adicionar Questão" com base no usuário logado
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

        // Mostrar o botão "Adicionar Questão" apenas para a professora
        document.getElementById("btnAdicionarQuestao").style.display = "block";
    } else {
        userTypeElement.textContent = "Estudante";
        logoutButton.textContent = "Logout";
        logoutButton.addEventListener("click", handleLogout);
    }
}

// Função para lidar com o logout
function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("loggedUser"); 
    alert("Logout realizado com sucesso.");
    window.location.href = "../login/index.html"; 
}

// Lógica do modal
const modal = document.getElementById("modalAdicionarQuestao");
const btnAdicionarQuestao = document.getElementById("btnAdicionarQuestao");
const spanClose = document.getElementsByClassName("close")[0];

// Abrir o modal ao clicar no botão "Adicionar Questão"
if (btnAdicionarQuestao) {
    btnAdicionarQuestao.onclick = function () {
        modal.style.display = "block";
    };
}

// Fechar o modal ao clicar no "X"
if (spanClose) {
    spanClose.onclick = function () {
        modal.style.display = "none";
    };
}

// Fechar o modal ao clicar fora dele
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Inicialização da página
document.addEventListener("DOMContentLoaded", function () {
    carregarQuestoes(); // Carrega as questões ao iniciar a página
    setUserType(); // Configura o tipo de usuário (professor ou estudante)
    profileNav.addEventListener("click", function () {
        profileDropdown.classList.toggle("show");
    });
});