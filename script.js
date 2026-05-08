const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby-lifCPubNRywoDWVK3QU8eLBEnnBZzzhmFfH6jlUFDr29LdGO7kaNSp4wMwv-0Tjr/exec";

const form = document.querySelector("#contact-form");
const statusMessage = document.querySelector("#form-status");
const header = document.querySelector(".site-header");

const syncHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 80);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusMessage.textContent = "Envoi en cours...";

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;

  const payload = Object.fromEntries(new FormData(form).entries());
  payload.createdAt = new Date().toISOString();

  if (!GOOGLE_SCRIPT_URL) {
    localStorage.setItem("peugeot308-last-lead", JSON.stringify(payload));
    statusMessage.textContent = "Demande enregistree localement. Ajoute l'URL Apps Script pour activer Google Sheets.";
    submitButton.disabled = false;
    return;
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    form.reset();
    statusMessage.textContent = "Merci, ta demande a bien ete envoyee.";
  } catch (error) {
    statusMessage.textContent = "L'envoi a echoue. Reessaie dans un instant.";
  } finally {
    submitButton.disabled = false;
  }
});
