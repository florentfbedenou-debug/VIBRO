const loginButton = document.getElementById("loginButton");
const showRegisterButton = document.getElementById("showRegister");
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
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("vibroUser", JSON.stringify(data.user));
            window.location.href = "/chat.html";
        } else {
            message.textContent = data.message;
        }

    } catch (error) {
        message.textContent = "Erreur de connexion au serveur.";
    }
});

showRegisterButton.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
        message.textContent = "Entre un nom d'utilisateur et un mot de passe.";
        return;
    }

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem(
                "vibroUser",
                JSON.stringify({
                    username: username
                })
            );

            window.location.href = "/chat.html";
        } else {
            message.textContent = data.message;
        }

    } catch (error) {
        message.textContent = "Erreur de connexion au serveur.";
    }
});
```

});
