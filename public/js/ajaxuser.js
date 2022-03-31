window.onload = function() {
    leerJS();
    leertipo();
    document.getElementById("nombre_usuario").focus();
    /*CODIGO MODAL*/

    // Get the modal
    modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    span = document.getElementsByClassName("close")[0];



    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function abrirModal(id_usuario, nombre_usuario, apellido_usuario, correo_usuario, password_usuario) {
    modal.style.display = "block";
    document.getElementById('idModificar').value = id_usuario;
    document.getElementById('modnombreuser').value = nombre_usuario;
    document.getElementById('modapellido').value = apellido_usuario;
    document.getElementById('modcorreo').value = correo_usuario;
    document.getElementById('modpassword').value = password_usuario;
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

/* Función implementada con AJAX */
function leerJS() {
    /* Si hace falta obtenemos el elemento HTML donde introduciremos la recarga (datos o mensajes) */
    /* Usar el objeto FormData para guardar los parámetros que se enviarán:
       formData.append('clave', valor);
       valor = elemento/s que se pasarán como parámetros: token, method, inputs... */
    var tabla = document.getElementById("main");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('filtro', document.getElementById('filtro').value);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "leeruser", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var recarga = '';
            recarga += '<tr><td><b>ID</b></td><td><b>NOMBRE</b></td><td><b>APELLIDO</b></td><td><b>CORREO</b></td><td><b>PASSWORD</b></td><td><b>ROL</b></td><td><b>MODIFICAR</b></td><td><b>ELIMINAR</b></td></tr>';
            /* Leerá la respuesta que es devuelta por el controlador: */
            for (let i = 0; i < respuesta.length; i++) {
                recarga += '<tr>';
                recarga += '<td>' + respuesta[i].id_usuario + '</td>'
                recarga += '<td>' + respuesta[i].nombre_usuario + '</td>'
                recarga += '<td>' + respuesta[i].apellido_usuario + '</td>'
                recarga += '<td>' + respuesta[i].correo_usuario + '</td>'
                recarga += '<td>' + respuesta[i].password_usuario + '</td>'
                recarga += '<td>' + respuesta[i].nombre_rol + '</td>'
                recarga += '<td><button class="boton_modificar" type="submit" value="Modificar" onclick="abrirModal(' + respuesta[i].id_usuario + ',\'' + respuesta[i].nombre_usuario + '\',\'' + respuesta[i].apellido_usuario + '\',\'' + respuesta[i].correo_usuario + '\',\'' + respuesta[i].password_usuario + '\');return false;">Modificar</button></td>'
                recarga += '<td><button class="boton_eliminar" onclick="eliminarJS(' + respuesta[i].id_usuario + ')">Eliminar</button></td>'
                recarga += '</tr>';

            }
            tabla.innerHTML = recarga;
        }
    }

    ajax.send(formData);
}

function leertipo() {
    /* Si hace falta obtenemos el elemento HTML donde introduciremos la recarga (datos o mensajes) */
    /* Usar el objeto FormData para guardar los parámetros que se enviarán:
       formData.append('clave', valor);
       valor = elemento/s que se pasarán como parámetros: token, method, inputs... */
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "leertipouser", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
                /* Leerá la respuesta que es devuelta por el controlador: */
            for (let i = 0; i < respuesta.length; i++) {
                console.log(respuesta[i]['nombre_rol'])
                document.getElementById('nombre_rol').innerHTML += "<option value='" + respuesta[i]['nombre_rol'] + "'>" + respuesta[i]['nombre_rol'] + "</option>"

            }
        }
    }

    ajax.send(formData);
}
/* Función implementada con AJAX que inserta un archivo */
function insertarJS() {
    let nombre = document.getElementById('nombre_usuario').value;
    let apellido = document.getElementById('apellido_usuario').value;
    let correo = document.getElementById('correo_usuario').value;
    let pass = document.getElementById('password_usuario').value;

    
    if (nombre == '' || apellido == '' || correo == '' || pass == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;
    }else if (pass.length > 20) {
        swal.fire({
            title: "Error",
            text: "La contraseña no puede ser mas grande de 20 caracteres",
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
    }else if (apellido.length > 50) {
        swal.fire({
            title: "Error",
            text: "El apellido no puede tener mas de 50 caracteres",
            icon: "error",
        });
        return false;
    }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        swal.fire({
            title: "Error",
            text: "Introduce un email correcto",
            icon: "error",
        });
        return false;
    }
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('nombre_usuario', document.getElementById('nombre_usuario').value);
    formData.append('apellido_usuario', document.getElementById('apellido_usuario').value);
    formData.append('correo_usuario', document.getElementById('correo_usuario').value);
    formData.append('password_usuario', document.getElementById('password_usuario').value);
    formData.append('nombre_rol', document.getElementById('nombre_rol').value);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "crearuser", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            /* Leerá la respuesta que es devuelta por el controlador: */
            if (respuesta.resultado == 'OK') {
                document.getElementById('mensaje').innerHTML = "Inserción correcta."
            } else {
                document.getElementById('mensaje').innerHTML = "Fallo en la inserción: " + respuesta.resultado;
            }
            leerJS();
            document.getElementById('nombre_usuario').value = '';
            document.getElementById('apellido_usuario').value = '';
            document.getElementById('correo_usuario').value = '';
            document.getElementById('password_usuario').value = '';
            document.getElementById("nombre_usuario").focus();
        }
    }

    ajax.send(formData);
}

//BORRAR
function eliminarJS(id) {
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'DELETE');
    formData.append('id_usuario', id);
    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "eliminaruser/" + id, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            /* Leerá la respuesta que es devuelta por el controlador: */
            if (respuesta.resultado == 'OK') {
                document.getElementById('mensaje').innerHTML = "eliminado correctamente."
            } else {
                document.getElementById('mensaje').innerHTML = "Fallo eliminando " + respuesta.resultado;
            }
            leerJS();
        }
    }

    ajax.send(formData);
}
//EDITAR
function editarJS() {
    let nombre = document.getElementById('modnombreuser').value;
    let apellido = document.getElementById('modapellido').value;
    let correo = document.getElementById('modcorreo').value;
    let pass = document.getElementById('modpassword').value;

    
    if (nombre == '' || apellido == '' || correo == '' || pass == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;
    }else if (pass.length < 8) {
        swal.fire({
            title: "Error",
            text: "La contraseña no puede ser mas pequeña de 8 caracteres",
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
    }else if (apellido.length > 50) {
        swal.fire({
            title: "Error",
            text: "El apellido no puede tener mas de 50 caracteres",
            icon: "error",
        });
        return false;
    }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        swal.fire({
            title: "Error",
            text: "Introduce un email correcto",
            icon: "error",
        });
        return false;
    }
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', "PUT");
    formData.append('id_usuario', document.getElementById('idModificar').value);
    formData.append('nombre_usuario', document.getElementById('modnombreuser').value);
    formData.append('apellido_usuario', document.getElementById('modapellido').value);
    formData.append('correo_usuario', document.getElementById('modcorreo').value);
    formData.append('password_usuario', document.getElementById('modpassword').value);
    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "modificaruser", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            /* Leerá la respuesta que es devuelta por el controlador: */
            if (respuesta.resultado == 'OK') {
                document.getElementById('mensaje').innerHTML = "editado correctamente."
            } else {
                document.getElementById('mensaje').innerHTML = "Fallo editando " + respuesta.resultado;
            }
            leerJS();
        }
    }

    ajax.send(formData);
    modal.style.display = "none";
}