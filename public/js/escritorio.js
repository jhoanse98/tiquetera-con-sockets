//REFERENCIAS HTML
const lblEscritorio = document.querySelector("h1");
const btnAtender    = document.querySelector("button")
const lblTicket     = document.querySelector("small")
const divAlert      = document.querySelector(".alert")

const urlSearchParams = new URLSearchParams(window.location.search)

if(!urlSearchParams.has('escritorio')) {
    window.location = "index.html"
    throw new Error("El escritorio es obligatorio")
}

const escritorio = urlSearchParams.get("escritorio");
divAlert.style.display = "none"

const socket = io();
socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

/*socket.on('ultimo-ticket', ultimo => {
    lblNuevoTicket.innerHTML = `Ticket: ${ultimo}`
})
*/

btnAtender.addEventListener( 'click', () => {

    socket.emit("atender-ticket", {escritorio}, ({ok, msg, ticket}) => {
        if( !ok ){
            lblTicket.innerHTML = 'Nadie'
            return divAlert.style.display = ''
        }
        lblTicket.innerHTML = 'Ticket ' + ticket.numero
    })


});