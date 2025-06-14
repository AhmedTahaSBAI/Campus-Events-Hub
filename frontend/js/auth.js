// Gestion de la connexion
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // ✅ Stocke le token JWT dans localStorage
            localStorage.setItem('token', data.token);

            // Redirige l'utilisateur connecté
            window.location.href = 'index.html';
        } else {
            alert(data.message || 'Email ou mot de passe incorrect');
        }
    } catch (err) {
        console.error('Erreur:', err);
        alert('Erreur lors de la communication avec le serveur');
    }
});
// Afficher un message de redirection s'il existe
document.addEventListener('DOMContentLoaded', () => {
  const message = localStorage.getItem('redirectMessage');
  if (message) {
    const alertBox = document.getElementById('alert-message');
    if (alertBox) {
      alertBox.textContent = message;
      alertBox.style.color = 'red'; // Ou classe CSS stylée
    }
    localStorage.removeItem('redirectMessage');
  }
});
