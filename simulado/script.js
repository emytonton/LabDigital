const API_URL = "http://localhost:1337/api/questoes";
const SIMULADO_URL = "http://localhost:1337/api/simulados";
const loggedUser = localStorage.getItem("loggedUser");

let questoes = [];
let questaoAtual = 0;
let acertos = 0;
let quantidadeQuestoes = 0;


async function carregarQuestoes() {
    try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        if (!dados.data || dados.data.length === 0) {
            alert("Nenhuma questão disponível.");
            return;
        }
        questoes = dados.data;
        iniciarSimulado();
    } catch (error) {
        console.error("Erro ao carregar questões:", error);
    }
}


function verificarUsuario() {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser === "ericapaivas@gmail.com") {
        // Se for o professor, exibe apenas a seção de resultados
        document.getElementById("simulado-container").style.display = "none";
        document.getElementById("resultado-final-professor").style.display = "block";
        carregarResultadosProfessores(); // Função para carregar os resultados dos alunos
    } else {
        // Se for um aluno, exibe a interface do simulado
        document.getElementById("simulado-container").style.display = "block";
        document.getElementById("resultado-final-professor").style.display = "none";
    }
}


async function carregarResultadosProfessores() {
    try {
        const resposta = await fetch(SIMULADO_URL);
        const dados = await resposta.json();

        if (!dados.data || dados.data.length === 0) {
            document.getElementById("resultados-alunos").innerText = "Nenhum resultado disponível.";
            return;
        }

        const resultadosDiv = document.getElementById("resultados-alunos");
        resultadosDiv.innerHTML = ""; 

        
        dados.data.forEach((simulado) => {
            const resultadoAluno = document.createElement("div");
            resultadoAluno.className = "resultado-aluno";
            resultadoAluno.innerHTML = `
                <p><strong>Usuário:</strong> ${simulado.usuario}</p>
                <p><strong>Quantidade de questões:</strong> ${simulado.quantidade_questoes}</p>
                <p><strong>Acertos:</strong> ${simulado.acertos}</p>
                <p><strong>Data:</strong> ${new Date(simulado.data).toLocaleDateString()}</p>
                <hr>
            `;
            resultadosDiv.appendChild(resultadoAluno);
        });
    } catch (error) {
        console.error("Erro ao carregar resultados:", error);
        document.getElementById("resultados-alunos").innerText = "Erro ao carregar resultados.";
    }
}

verificarUsuario();

function iniciarSimulado() {
    quantidadeQuestoes = parseInt(document.getElementById("quantidadeQuestoes").value);
    if (quantidadeQuestoes > questoes.length) {
        alert(`Só há ${questoes.length} questões disponíveis.`);
        return;
    }

    
    questoes = questoes.sort(() => Math.random() - 0.5).slice(0, quantidadeQuestoes);

    
    document.getElementById("configuracoes").style.display = "none";
    document.getElementById("question-container").style.display = "block";

    
    mostrarQuestao();
}


function mostrarQuestao() {
    const questao = questoes[questaoAtual];
    if (!questao) {
        console.error("Questão inválida:", questao);
        return;
    }

    
    document.getElementById("question").innerText = questao.titulo;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    if (questao.opcoes && questao.opcoes.data && questao.opcoes.data.opc_org) {
        questao.opcoes.data.opc_org.forEach((opcao, index) => {
            const button = document.createElement("button");
            button.innerText = opcao;
            button.onclick = () => verificarResposta(index, questao.resposta_correta);
            optionsDiv.appendChild(button);
        });
    } else {
        console.error("Opções inválidas para a questão:", questao);
    }
}


function verificarResposta(escolha, respostaCorreta) {
    const resultDiv = document.getElementById("result");
    if (escolha === respostaCorreta) {
        resultDiv.innerText = "Resposta correta!";
        resultDiv.style.color = "green";
        acertos++;
    } else {
        resultDiv.innerText = "Resposta errada!";
        resultDiv.style.color = "red";
    }

   
    document.getElementById("next-button").style.display = "block";
}


function proximaQuestao() {
    questaoAtual++;
    if (questaoAtual < quantidadeQuestoes) {
        mostrarQuestao();
        document.getElementById("result").innerText = "";
        document.getElementById("next-button").style.display = "none";
    } else {
        finalizarSimulado();
    }
}



async function finalizarSimulado() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("resultado-final-aluno").style.display = "block";
    document.getElementById("total-acertos").innerText = acertos;
    document.getElementById("total-questoes").innerText = quantidadeQuestoes;

    
    const resultadoFinalDiv = document.getElementById("resultado-final-aluno");
    const concluidoButton = document.createElement("button");
    concluidoButton.innerText = "Concluído";
    concluidoButton.id = "concluido-button";
    concluidoButton.addEventListener("click", async () => {
        
        if (loggedUser && loggedUser !== "ericapaivas@gmail.com") {
            try {
                const token = localStorage.getItem("jwt"); 

                const payload = {
                    data: {
                        usuario: loggedUser,
                        quantidade_questoes: quantidadeQuestoes,
                        acertos: acertos.toString(), 
                        data: new Date().toISOString(),
                    },
                };

                console.log("Payload enviado:", payload); 

                const resposta = await fetch(SIMULADO_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, 
                    },
                    body: JSON.stringify(payload),
                });

                if (!resposta.ok) {
                    const erroResposta = await resposta.json(); 
                    console.error("Resposta de erro do servidor:", erroResposta);
                    throw new Error("Erro ao salvar simulado.");
                }

                const dadosResposta = await resposta.json();
                console.log("Simulado salvo com sucesso:", dadosResposta);

                
                window.location.href = "../simulado/index.html";
            } catch (error) {
                console.error("Erro ao salvar simulado:", error);
                alert("Erro ao salvar simulado. Tente novamente.");
            }
        } else {
            
            window.location.href = "../simulado/index.html";
        }
    });
    resultadoFinalDiv.appendChild(concluidoButton);
}

document.getElementById("iniciarSimulado").addEventListener("click", carregarQuestoes);
document.getElementById("next-button").addEventListener("click", proximaQuestao);


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

profileNav.addEventListener("click", function (event) {
    event.stopPropagation();
    profileDropdown.classList.toggle("show");
});

window.addEventListener("click", function () {
    if (profileDropdown.classList.contains("show")) {
        profileDropdown.classList.remove("show");
    }
});

setUserType();