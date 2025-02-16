document.getElementById("formdoCadastro").addEventListener("submit", async function (event) {
    event.preventDefault(); 


    const nome = document.querySelector('input[name="nome"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const senha = document.querySelector('input[name="senha"]').value;

    
    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

  
    try {
        const response = await fetch("http://localhost:1337/api/auth/local/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: nome,
                email: email,
                password: senha,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert("Erro ao cadastrar: " + (errorData.error.message || "Erro desconhecido"));
            return;
        }

        const data = await response.json();
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "../pagprincipal/teste.html";




        
        document.getElementById("formdoCadastro").reset();
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
        alert("Ocorreu um erro ao enviar os dados.");
    }
});

