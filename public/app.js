const loginButton = document.getElementById("loginButton");
const message = document.getElementById("message");

loginButton.addEventListener("click", async () => {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
        message.textContent = "Remplis tous les champs.";
        return;
    }

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        message.textContent = data.message;

    } catch (error) {
        message.textContent = "Erreur de connexion au serveur.";
    }
});
