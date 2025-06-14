document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  const loginLink = document.getElementById('login-link');
  const logoutButton = document.getElementById('logout-button');
  const profileLink = document.getElementById('profile-link');
  const createEventLink = document.getElementById('create-Event-link');

  if (token) {
    // Utilisateur connecté
    if (loginLink) loginLink.style.display = 'none';
    if (logoutButton) {
      logoutButton.style.display = 'inline-block';
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
      });
    }
    if (profileLink) profileLink.style.display = 'inline-block';
    if (createEventLink) createEventLink.style.display = 'inline-block';

  } else {
    // Utilisateur non connecté
    if (loginLink) loginLink.style.display = 'inline-block';
    if (logoutButton) logoutButton.style.display = 'none';
    if (profileLink) profileLink.style.display = 'none';
    if (createEventLink) createEventLink.style.display = 'inline-block';
  }
});
