/**
 * Claves de acceso para proyeto firebase.
 */

const firebaseConfig = {  

    apiKey: "AIzaSyBdrGcF8pvWfRaR9bIHPbzeceLZx7cg-oA",
    authDomain: "sealcoffee-9e6b5.firebaseapp.com",
    projectId: "sealcoffee-9e6b5",
    storageBucket: "sealcoffee-9e6b5.appspot.com",
    messagingSenderId: "181581822809",
    appId: "1:181581822809:web:ef1823fed0550f1f142a48"

}
firebase.initializeApp(firebaseConfig);

/**
 * Funcion que me da firebase para mantener la sesión iniciada del usuario localmente.
 */

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        console.log("Persistencia de sesión configurada.");
    })
    .catch((error) => {
        console.error("Error en la configuración de persistencia:", error.message);
    });

/**
 * Funcion para registrar usuario nuevo y redirigirlo a la sección de login.
 */

function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

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
                    email.value = "";
                    password.value = ""
            });
        })

        .catch((error) => {

            Swal.fire({
                icon: 'error',
                title: '¡Error al registrarse, vuelva a intentarlo!',
                text: `${error.message}`,
                confirmButtonText: 'Continuar'
            })
            email.value = "";
            password.value = "";
        });

}

/**
 * Funcion para iniciar sesión, después de registrar las credenciales redirigiendo a la página principal.
 */

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

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
                window.location.href = "../dashboard/index.html"
                email.value = "";
                password.value = "";
            })

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

}

/**
 * Verificar el estado de autenticación.
 */

firebase.auth().onAuthStateChanged((user) => {
    const btnLogin = document.getElementById("btn-login");
    const btnLogout = document.getElementById("btn-logout");

    if (user) {
        // Usuario logueado
        if (btnLogin) btnLogin.style.display = "none";
        if (btnLogout) btnLogout.style.display = "block";
        console.log("Usuario logueado:", user.email);
    } else {
        // Usuario no logueado
        if (btnLogin) btnLogin.style.display = "block";
        if (btnLogout) btnLogout.style.display = "none";
        console.log("Ningún usuario está logueado");
    }
});

/**
 * Función para cerrar sesión.
 */

function logout() {

        firebase.auth().signOut()
        .then(() => {
            
        Swal.fire({
            icon: 'success',
            title: 'Sesión Cerrada!',
            text: "Se ha cerrado la sesión correctamente",
            confirmButtonText: 'Continuar'  
        })
        .then(() => {
            window.location.href = "../login/login.html"
        })

    })
        .catch((error) => {
            alert("Error al cerrar sesión: " + error.message);
    });
}

/**
 * Funcion para alternar entre formularios, esta se encarga de esconder el formulario de inicio de sesion,
 * al mismo tiempo que deja visible el formulario de registro.
 */

function showRegisterForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

/**
 * Esta funcion básicamente hace lo opuesto a la anterior.
 */

function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}

/**
 * Mensaje cómico de error de contraseña.
 */

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
