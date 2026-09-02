const socket = io();

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");

sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();

    if (message === "") return;

    socket.emit("chat message", message);
    messageInput.value = "";
});

socket.on("chat message", (message) => {
    const div = document.createElement("div");
    div.textContent = message;
    messages.appendChild(div);
});
