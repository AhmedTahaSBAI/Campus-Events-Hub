document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  const loginLink = document.getElementById('login-link');
  const logoutButton = document.getElementById('logout-button');
  const profileLink = document.getElementById('profile-link');

  if (token) {
    // Utilisateur connecté
    loginLink.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    profileLink.style.display = 'inline-block';

    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });

  } else {
    // Utilisateur non connecté
    loginLink.style.display = 'inline-block';
    logoutButton.style.display = 'none';
    profileLink.style.display = 'none';
  }
});
