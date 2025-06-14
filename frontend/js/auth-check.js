function isAuthenticated() {
  return !!localStorage.getItem('token');
}


function redirectIfNotAuthenticated() {
  if (!localStorage.getItem('token')) {
    localStorage.setItem('redirectMessage', 'Veuillez vous connecter pour accéder à la page.');
    window.location.href = 'login.html';
  }
}


// Appliquer automatiquement la vérification si on est sur une page protégée :
const protectedPages = ['create-event.html', 'profile.html'];

protectedPages.forEach(page => {
  if (window.location.pathname.includes(page)) {
    redirectIfNotAuthenticated();
  }
});
