// Gestion de l'inscription
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }
    
    // Envoyer les données au backend
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        
        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            const error = await response.json();
            alert(error.message || 'Erreur lors de l\'inscription');
        }
    } catch (err) {
        console.error('Erreur:', err);
        alert('Erreur lors de la communication avec le serveur');
    }
});

// Gestion de la connexion
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            const error = await response.json();
            alert(error.message || 'Email ou mot de passe incorrect');
        }
    } catch (err) {
        console.error('Erreur:', err);
        alert('Erreur lors de la communication avec le serveur');
    }
});