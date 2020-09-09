let socket = io();
let label = $('#lblNuevoTicket');
//On = escuchar
socket.on('connect', () => {
    console.log("Conectado al servidor");
});

socket.on('disconnect', () => {
    console.log("Perdimos conexión con el servidor");
});

socket.on('estadoActual', (estadoActual) => {
    label.text(estadoActual.actual);
});


$('button').on('click', function() {
    console.log("click");

    // //Emit = enviar información

    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });

});


// //Escuchar información

// socket.on('enviarMensaje', (mensaje) => {
//     console.log('Servidor:', mensaje);
// });