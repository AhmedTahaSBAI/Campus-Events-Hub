document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('http://localhost:5000/api/events');
  const events = await response.json();
  
  const container = document.getElementById('events-container');
  events.forEach(event => {
    container.innerHTML += `
      <div class="event-card">
        <h3>${event.title}</h3>
        <p>${event.date} à ${event.time}</p>
        <p>Lieu: ${event.location}</p>
      </div>
    `;
  });
});