document.addEventListener('DOMContentLoaded', () => {
  fetchEvents();
});

async function fetchEvents() {
  try {
    const response = await fetch('http://localhost:5000/api/events'); // adapte le port si besoin
    const events = await response.json();
    displayEvents(events);
  } catch (err) {
    console.error('Erreur lors du chargement des événements :', err);
  }
}

function displayEvents(events) {
  const container = document.getElementById('events-container');
  if (!container) return;

  if (events.length === 0) {
    container.innerHTML = '<p>Aucun événement pour le moment.</p>';
    return;
  }

  container.innerHTML = events.map(event => `
    <div class="event-card">
      <h3>${event.title}</h3>
      <p><strong>Catégorie :</strong> ${event.category}</p>
      <p><strong>Date :</strong> ${event.date} à ${event.time}</p>
      <p><strong>Lieu :</strong> ${event.location}</p>
      <p>${event.description}</p>
    </div>
  `).join('');
}
