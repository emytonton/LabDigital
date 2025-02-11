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





const profileLink = document.getElementById('profilenav');
        const profileDropdown = document.getElementById('profileDropdown');

        profileLink.addEventListener('click', function(event) {
            event.preventDefault();
            profileDropdown.classList.toggle('show');
        });

        document.getElementById('logout').addEventListener('click', function() {
            alert('Você foi deslogado!');
            //adicionar logica para deslogar
        });

        window.onclick = function(event) {
            if (!event.target.matches('#profilenav')) {
                if (profileDropdown.classList.contains('show')) {
                    profileDropdown.classList.remove('show');
                }
            }
        }

document.getElementById("logout").addEventListener("click", function() {
            window.location.href = "../login/index.html"; 
        });
        