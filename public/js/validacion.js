function validarLogin() {
    let email = document.getElementById('correo_usuario').value;
    let pass = document.getElementById('password_usuario').value;

    if (email == '' || pass == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        swal.fire({
            title: "Error",
            text: "Introduce un email correcto",
            icon: "error",
        });
        return false;
    }else if(email.length > 100){
        swal.fire({
            title: "Error",
            text: "El email no puede ser mas largo de 100 caracteres",
            icon: "error",
        });
        return false;
    }else if(pass.length < 8){
        swal.fire({
            title: "Error",
            text: "La contraseña debe ser mas larga de 8 caracteres",
            icon: "error",
        });
        return false;
    }else if(pass.length > 50){
        swal.fire({
            title: "Error",
            text: "La contraseña no puede ser mas largo de 50 caracteres",
            icon: "error",
        });
        return false;
    } else {
        return true;
    }
}

function validarRegistro() {
    let nombre = document.getElementById('nombre_usuario').value;
    let apellido = document.getElementById('apellido_usuario').value;
    let email = document.getElementById('correo_usuario').value;
    let pass = document.getElementById('password_usuario').value;
    let passwordvalidar = document.getElementById('password_usuario_validar').value;
        
    /*Por mucho que intenten quitar la validacion, irá al srv y se validará*/
    if (nombre == '' || apellido == '' || email == '' || pass == '' || passwordvalidar == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        swal.fire({
            title: "Error",
            text: "Introduce un email correcto",
            icon: "error",
        });
        return false;
    } else if (pass != passwordvalidar) {
        swal.fire({
            title: "Error",
            text: "Las contraseñas tienen que coincidir",
            icon: "error",
        });
        return false;
    }else if(nombre.length > 40){
        swal.fire({
            title: "Error",
            text: "El nombre no puede tener mas de 40 caracteres",
            icon: "error",
        });
        return false;
    }else if(apellido.length > 40){
        swal.fire({
            title: "Error",
            text: "El apellido no puede tener mas de 40 caracteres",
            icon: "error",
        });
        return false;
    }else if(pass.length < 8){
        swal.fire({
            title: "Error",
            text: "La contraseña debe tener mas de 8 caracteres",
            icon: "error",
        });
        return false;
    }else if(pass.length > 100){
        swal.fire({
            title: "Error",
            text: "La contraseña debe tener menos de 100 caracteres",
            icon: "error",
        });
        return false;
    }else {
        return true;
    }
}

function validarCorreo() {
    if (document.getElementById("error").value == "errormio") {
        swal.fire({
            title: "Error",
            icon: "error",
            html:
                'Este correo ya ha sido utilizado.'+
                ' Vuelve al <a href="./">inicio de sesión</a> ',
        });
        return false;
    }
}

function validarCorreoNoCreado() {
    if (document.getElementById("error").value == "error") {
        swal.fire({
            title: "Error",
            icon: "error",
            html:
                'Esta cuenta de correo no existe.'+
                ' Si no te has dado de alta <a href="./registro">regístrate</a> ',
        });
        return false;
    }else {
        return true;
    }
}
function validarCorreoPassword() {
    if (document.getElementById("errorpassword").value == "errorpassword") {
        swal.fire({
            title: "Error",
            icon: "error",
            html:
                'La contraseña es erronea.',
        });
        return false;
    }else {
        return true;
    }
}

function validarCrearEquipo() {
    let nombre = document.getElementById('nombre_equipo').value;
    let codigo = document.getElementById('codigo_equipo').value;
    let correo1 = document.getElementById('correo_usuario1').value;
    let correo2 = document.getElementById('correo_usuario2').value;
    let correo3 = document.getElementById('correo_usuario3').value;

    if (document.getElementById("error").value == "errormio") {
        swal.fire({
            title: "Error",
            icon: "error",
            html:
                'Este equipo ya existe.',
        });
        return false;
    }else if (nombre == '' || codigo == '' || correo1 == '' || correo2 == '' || correo3 == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;
    }else if (correo2==correo3) {
        swal.fire({
            title: "Error",
            text: "No pueden jugar 2 mismos jugadores",
            icon: "error",
        });
        return false;
    }else if (nombre.length > 50) {
        swal.fire({
            title: "Error",
            text: "El nombre no puede tener mas de 50 caracteres",
            icon: "error",
        });
        return false;
    }else if (codigo.length > 50) {
        swal.fire({
            title: "Error",
            text: "El codigo no puede tener mas de 50 caracteres",
            icon: "error",
        });
        return false;
    }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo2) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo3) ) {
        swal.fire({
            title: "Error",
            text: "Introduce un email correcto",
            icon: "error",
        });
        return false;
    }else {
        return true;
    }
}
function validarMismosJugador() {
    if (document.getElementById("errormismojugador").value == "errormismojugador") {
        swal.fire({
            title: "Error",
            icon: "error",
            html:
                'No puedes jugar contigo mismo.',
        });
        return false;
    }else {
        return true;
    }
}
function validarMismosJugadores() {
    if (document.getElementById("errorjugadoresiguales").value == "errorjugadoresiguales") {
        swal.fire({
            title: "Error",
            icon: "error",
            html:
                'No puedes hacer un equipo con los mismos jugadores 1 y 2.',
        });
        return false;
    }else {
        return true;
    }
}
function validarJugador2() {
    if (document.getElementById("errorjugador2").value == "errorjugador2") {
        swal.fire({
            title: "Error",
            icon: "error",
            html:
                'El jugador 2 no existe.',
        });
        return false;
    }else {
        return true;
    }
}
function validarJugador3() {
    if (document.getElementById("errorjugador3").value == "errorjugador3") {
        swal.fire({
            title: "Error",
            icon: "error",
            html:
                'El jugador 3 no existe.',
        });
        return false;
    }else {
        return true;
    }
}


function validarUnirEquipo() {
    let nombre = document.getElementById('nombreequipo').value;
    let codigo = document.getElementById('codigo').value;

    if (document.getElementById("error").value == "errormio") {
        swal.fire({
            title: "Error",
            icon: "error",
            html:
                'Este equipo ya existe.',
        });
        return false;
    }else if(document.getElementById("errorcodigo").value == "errorcodigo"){
        swal.fire({
            title: "Error",
            icon: "error",
            html:
                'El código es incorrecto.',
        });
        return false;
    }else if (nombre == '' || codigo == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;
    }else {
        return true;
    }
}

function validarModificar() {
    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;
    let descripcion = document.getElementById('descripcion').value;
    let nacionalidad = document.getElementById('nacionalidad').value;
    let tipo = document.getElementById('tipo').value;

    if (nombre == '' || precio == '' || descripcion == '' || nacionalidad == '' || tipo == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;
    } else {
        return true;
    }
}