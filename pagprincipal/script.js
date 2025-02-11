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
        


     