

const socketController = socket => {

    console.log("usuario conectado")

    socket.on('disconnect', () => {
        console.log('Cliente desconectado')
    })

    socket.on('enviar-mensaje', (payload, callback) => {
        
        
        const id= 123456
        console.log(payload, callback)
        callback( id )
        socket.broadcast.emit('enviar-mensaje', payload)
    })
}


module.exports = {
  socketController   
}