const socket = io();

const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector("#txtMensaje")
const btnEnviar = document.querySelector("#btnEnviar")

socket.on('connect', () => {
    console.log("Conectado")
    lblOffline.style.display ="none"
    lblOnline.style.display= ""
})

socket.on('disconnect', () => {
    console.log('Desconectado del servidor')
    lblOffline.style.display =""
    lblOnline.style.display= "none"
})

socket.on('enviar-mensaje', (payload) => {
    console.log("recibido desde el servidor el payload: ", payload)
})

btnEnviar.addEventListener("click", () => {
    const mensaje = txtMensaje.value
    const payload = {
        mensaje,
        id:"123ASBC",
        fecha: new Date().getTime()
    }

    
    socket.emit('enviar-mensaje', payload,  (id) => {
        console.log("DESDE EL SERVIDOR", id)
    });

})