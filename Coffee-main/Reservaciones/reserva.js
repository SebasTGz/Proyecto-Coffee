document.getElementById("reservationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario
    const successMessage = document.getElementById("successMessage");
    successMessage.classList.remove("hidden");
    successMessage.textContent = "¡Reserva guardada con éxito!";
    
    //limpiar los campos del formulario
    this.reset();
  });
  