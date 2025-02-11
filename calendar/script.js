document.getElementById('activityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    addActivity(date, description);
    this.reset(); // Limpa o formulário
});

function addActivity(date, description) {
    const activityList = document.getElementById('activityList');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${date}</td>
        <td>${description}</td>
        <td class="status"><span>Não Concluída</span></td>
        <td><button onclick="toggleStatus(this)">Concluir</button></td>
    `;

    activityList.appendChild(row);
}

function toggleStatus(button) {
    const row = button.parentElement.parentElement;
    const statusCell = row.querySelector('.status span');

    if (statusCell.textContent === 'Não Concluída') {
        statusCell.textContent = 'Concluída';
        row.classList.add('completed');
    } else {
        statusCell.textContent = 'Não Concluída';
        row.classList.remove('completed');
    }
}




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
        