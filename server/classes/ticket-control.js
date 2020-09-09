const fs = require('fs');

// "tickest": [{ "numero": 1, "escritorio": null }, { "numero": 2, "escritorio": null }, { "numero": 3, "escritorio": null }, { "numero": 4, "escritorio": null }, { "numero": 5, "escritorio": null }, { "numero": 6, "escritorio": null }, { "numero": 7, "escritorio": null }, { "numero": 8, "escritorio": null }, { "numero": 9, "escritorio": null }, { "numero": 10, "escritorio": null }, { "numero": 11, "escritorio": null }]
class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${ this.ultimo}`;
    }
    getUltimoTicket() {
        return `Ticket ${ this.ultimo}`;
    }
    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length == 0) {
            return "No hay tickets";
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borrar el ultimo}
        }
        console.log("Ultimos 4");
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log("Se inicializo");
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            'ultimo': this.ultimo,
            'hoy': this.hoy,
            'tickets': this.tickets,
            'ultimos4': this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}

module.exports = {
    TicketControl
}