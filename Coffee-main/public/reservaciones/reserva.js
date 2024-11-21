/**
 * Función que obtiene el id  por "reservationForm" para manejar el envío de datos, y 
 * detectar el evento de envio de formulario.
 */

document.getElementById("reservationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario
    
    /**const successMessage = document.getElementById("successMessage");
    successMessage.classList.remove("hidden");
    successMessage.textContent = "¡Reserva guardada con éxito!";
    */

    Swal.fire({
        icon: 'success',
        title: '¡Reserva Existosa!',
        text: "Su reservación ha sido guardada",
        confirmButtonText: 'Continuar'  
    })
    
    //limpiar los campos del formulario
    this.reset();
});
