const TicketController = require("../models/tickets")

const Ticket = new TicketController();

const socketController = socket => {

    socket.emit('ultimo-ticket', Ticket.ultimo)
    socket.emit('estado-actual', Ticket.ultimos4)
    socket.emit('tickets-pendientes', Ticket.tickets.length)
    socket.broadcast.emit('tickets-pendientes', Ticket.tickets.length)

    socket.on('siguiente-ticket', (payload, callback) => {
        
      const siguiente = Ticket.siguiente();
      callback(siguiente)
      socket.broadcast.emit('tickets-pendientes', Ticket.tickets.length)
    })

    socket.on("atender-ticket", ({escritorio}, callback) => {
      if( !escritorio ){
        return callback({
          ok: false,
          msg: "El escritorio es obligatorio"
        })
      }

      const ticket = Ticket.atenderTicket(escritorio)

      socket.broadcast.emit('estado-actual', Ticket.ultimos4)
      socket.emit('tickets-pendientes', Ticket.tickets.length)
      socket.broadcast.emit('tickets-pendientes', Ticket.tickets.length)

      if(!ticket){
        return callback({
          ok: false,
          msg: "No quedan tickets pendientes"
        })
      } else {
        return callback({
          ok: true,
          ticket
        })
      }
    })
}


module.exports = {
  socketController   
}