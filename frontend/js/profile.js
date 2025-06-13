// frontend/js/profile.js
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Veuillez vous connecter pour accéder à votre profil.');
        window.location.href = 'login.html';
        return;
    }

    // 2. Récupérer les données utilisateur
    try {
        // Récupérer le profil
        const userResponse = await fetch('http://localhost:5000/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!userResponse.ok) throw new Error('Erreur de chargement du profil');
        const user = await userResponse.json();

        // Afficher les infos
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-email').textContent = user.email;

        // Récupérer les événements de l'utilisateur
        const eventsResponse = await fetch(`http://localhost:5000/api/events/user/${user.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const events = await eventsResponse.json();

        // Afficher les événements
        const container = document.getElementById('user-events-container');
        container.innerHTML = events.length > 0 
            ? events.map(event => `
                <div class="event-card">
                    <h3>${event.title}</h3>
                    <p>${new Date(event.date).toLocaleDateString()} • ${event.location}</p>
                    <div class="actions">
                        <a href="event-details.html?id=${event.id}">Détails</a>
                        <button onclick="deleteEvent(${event.id})">Supprimer</button>
                    </div>
                </div>
            `).join('')
            : '<p>Aucun événement créé.</p>';

        // Gestion déconnexion
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });

    } catch (error) {
        console.error('Erreur:', error);
        alert('Session expirée. Veuillez vous reconnecter.');
        window.location.href = 'login.html';
    }
});

// Fonction pour supprimer un événement
async function deleteEvent(eventId) {
    if (!confirm('Supprimer cet événement ?')) return;
    
    try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        
        if (response.ok) {
            alert('Événement supprimé !');
            location.reload(); // Recharger la page
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}