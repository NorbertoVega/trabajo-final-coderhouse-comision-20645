const socket = io.connect();

const texto = document.getElementById('texto');
const email = document.getElementById('email');

function addMessage() {
    if (texto.value === undefined || email.value === undefined)
        return;

    const mensaje = {
        text: texto.value,
        email: email.value
    };

    texto.value = '';
    email.value = '';
    socket.emit('add-new-message', mensaje);
}

function renderMessages(data) {
    const html = data.map((elem, index) => {
        return (`<div>
            <strong style="color:blue;">${elem.email}</strong>
            <span style="color:brown;">[${Date(elem.timestamp)}]</span>:
            <em style="color:green;">${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

socket.on('render-messages', function (data) {
    renderMessages(data);
});

socket.emit('render-all-messages');

