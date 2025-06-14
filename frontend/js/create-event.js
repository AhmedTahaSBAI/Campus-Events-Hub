document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  // 🚫 Si aucun token, rediriger vers login
  if (!token) {
    alert("Vous devez être connecté pour créer un événement.");
    window.location.href = 'login.html';
    return;
  }

  const form = document.getElementById('create-event-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 🧾 Récupération des données du formulaire
    const title = document.getElementById('event-title').value;
    const category = document.getElementById('event-category').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const location = document.getElementById('event-location').value;
    const description = document.getElementById('event-description').value;

    const eventData = { title, category, date, time, location, description };

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 🛡️ Token envoyé au backend
        },
        body: JSON.stringify(eventData)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Événement créé avec succès !");
        window.location.href = 'index.html';
      } else {
        alert(result.message || "Erreur lors de la création de l'événement.");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      alert("Erreur de connexion au serveur.");
    }
  });
});
