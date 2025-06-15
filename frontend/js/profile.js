document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Veuillez vous connecter pour accéder à votre profil.');
        window.location.href = 'login.html';
        return;
    }

    try {
        console.log('🔐 Token trouvé dans localStorage:', token);

        // ➤ Requête profil utilisateur
        const userResponse = await fetch('http://localhost:5000/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!userResponse.ok) {
            const errText = await userResponse.text();
            console.error('❌ Erreur réponse /me:', userResponse.status, errText);
            throw new Error('Erreur de chargement du profil');
        }

        console.log('✅ Réponse /me OK');
        const data = await userResponse.json();
        console.log('📦 Données reçues de /me:', data);

        const user = data.user || data;
        console.log('👤 Utilisateur extrait:', user);

        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-email').textContent = user.email;

        // ➤ Requête événements utilisateur
        const eventsUrl = `http://localhost:5000/api/events/user/${user.id}`;
        console.log('📡 Appel des événements via:', eventsUrl);

        const eventsResponse = await fetch(eventsUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!eventsResponse.ok) {
            const errText = await eventsResponse.text();
            console.error('❌ Erreur réponse /events:', eventsResponse.status, errText);
            throw new Error('Erreur lors du chargement des événements');
        }

        console.log('✅ Réponse /events OK');
        const events = await eventsResponse.json();
        console.log('📅 Événements reçus:', events);

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

        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });

    } catch (error) {
        console.error('🚨 Erreur attrapée dans catch :', error.message || error);
        console.trace();
        alert('Session expirée. Veuillez vous reconnecter.');
        window.location.href = 'login.html';
    }
});
// profile.js
function deleteEvent(eventId) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5000/api/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur lors de la suppression");
      }
      // Recharger les événements ou supprimer l'élément du DOM
      window.location.reload();
    })
    .catch((error) => {
      console.error("❌ Erreur suppression:", error);
    });
}
