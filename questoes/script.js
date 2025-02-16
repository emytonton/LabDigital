const questions = [
    {
        question: "Qual é a fórmula química da água?",
        options: ["A) H2O", "B) CO2", "C) O2", "D) H2SO4", "E) NaCl"],
        answer: "A"
    },
    {
        question: "Qual é o elemento químico com símbolo 'Fe'?",
        options: ["A) Ouro", "B) Ferro", "C) Prata", "D) Cobre", "E) Zinco"],
        answer: "B"
    },
    {
        question: "Qual é a fórmula química do ácido sulfúrico?",
        options: ["A) HCl", "B) H2SO4", "C) HNO3", "D) CH3COOH", "E) NaOH"],
        answer: "B"
    },
    {
        question: "Qual gás é produzido durante a respiração celular?",
        options: ["A) O2", "B) CO2", "C) N2", "D) H2", "E) He"],
        answer: "B"
    },
    {
        question: "Qual é o pH da água pura?",
        options: ["A) 0", "B) 7", "C) 14", "D) 4", "E) 10"],
        answer: "B"
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => checkAnswer(String.fromCharCode(65 + index)); 
        optionsContainer.appendChild(button);
    });

    document.getElementById('result').textContent = '';
    document.getElementById('next-button').style.display = 'none';
}

function checkAnswer(selected) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const resultDiv = document.getElementById('result');

    if (selected === correctAnswer) {
        resultDiv.textContent = "Correto!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.textContent = "Incorreto! A resposta correta é " + correctAnswer + ".";
        resultDiv.style.color = "red";
    }
    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('question-container').innerHTML = "<h2>Quiz concluído!</h2><p>Obrigado por participar!</p>";
    }
}


loadQuestion();





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
