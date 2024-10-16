// Referencias a los inputs
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");

// Función para registrar un nuevo usuario
function register() {
    const email = registerEmail.value;
    const password = registerPassword.value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            Swal.fire({
                icon: 'success',
                title: '¡Registro Existoso!',
                text: `Bienvenido, ${email}`,
                confirmButtonText: 'Continuar'  
            })

            .then(() => {
                window.location.href = "login.html"
                registerEmail.value = "";
                registerPassword.value = ""
            });
        })

        .catch((error) => {

            Swal.fire({
                icon: 'error',
                title: '¡Error al registrarse, vuelva a intentarlo!',
                text: `${error.message}`,
                confirmButtonText: 'Continuar'  
            })

            registerEmail.value = "";
            registerPassword.value = "";

        });
    
} ///FIN FUNCION REGISTER

// Función para iniciar sesión
function login() {
    const email = loginEmail.value;
    const password = loginPassword.value;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            const user = userCredential.user;

            Swal.fire({
                icon: 'success',
                title: '¡Login Existoso!',
                text: `Bienvenido, ${user.email}`,
                confirmButtonText: 'Continuar'  
            })
            .then(() => {
                window.location.href = "../página Uno/index.html"
                loginEmail.value = "";
                loginPassword.value = "";
            });
        })

        .catch((error) => {

            var errorCode = error.code; //manejo errores
            var errorMessage = error.message;

            Swal.fire({
                icon: 'error',
                title: '¡Error!, usuario incorrecto o no existe. Puede registrarse.',
                text: `No se pudo iniciar sesión: ${errorMessage}`,
                confirmButtonText: 'Continuar'  
            })

            loginEmail.value = "";
            loginPassword.value = "";

        });
    
} //FIN FUNCION LOGIN

// Función para cerrar sesión
function logout() {
    firebase.auth().signOut().then(() => {
        alert("Sesión cerrada");
    }).catch((error) => {
        alert("Error: " + error.message);
    });
}

// Verificar el estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("Usuario logueado: ", user.email);
    } else {
        console.log("Ningún usuario está logueado");
    }
});

function showRegisterForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}

//Mensaje Password
document.getElementById('nopassword').addEventListener('click', function(e){
    e.preventDefault();
    //alert("Buen día, lo invitamos a recordarla!");
    Swal.fire({
        icon: 'error',
        title: 'Lo sentimos',
        text: "Si olvido su contraseña, lo invitamos a recordarla!",
        confirmButtonText: 'Continuar'  
    })

});

