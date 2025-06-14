// frontend/js/register.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const alertMessage = document.getElementById('alert-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form['confirm-password'].value;

    alertMessage.textContent = '';
    alertMessage.className = '';

    if (password !== confirmPassword) {
      alertMessage.textContent = 'Les mots de passe ne correspondent pas.';
      alertMessage.className = 'error-message';
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alertMessage.textContent = data.error || 'Erreur lors de l’inscription.';
        alertMessage.className = 'error-message';
        return;
      }

      alertMessage.textContent = 'Inscription réussie. Redirection...';
      alertMessage.className = 'success-message';

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);

    } catch (err) {
      console.error('Erreur:', err);
      alertMessage.textContent = 'Erreur réseau. Veuillez réessayer.';
      alertMessage.className = 'error-message';
    }
  });
});
