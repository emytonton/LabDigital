
document.getElementById("formdoLogin").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='senha']").value;

    try {
        
        const response = await fetch("http://localhost:1337/api/auth/local", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identifier: email, 
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login realizado com sucesso!");

            
            localStorage.setItem("jwt", data.jwt);

            
            localStorage.setItem("loggedUser", email);

            
            window.location.href = "../pagprincipal/teste.html";
        } else {
            alert("Falha no login: " + data.error.message);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao tentar fazer login.");
    }
});
