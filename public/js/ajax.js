window.onload = function() {
    leerJS();
    leertipo();
    document.getElementById("nombre_ubicacion").focus();
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

function abrirModal(id_ubicacion, nombre_ubicacion, descripcion_ubicacion, direccion_ubicacion, foto_ubicacion) {
    modal.style.display = "block";
    document.getElementById('idModificar').value = id_ubicacion;
    document.getElementById('modnombre').value = nombre_ubicacion;
    document.getElementById('moddescripcion').value = descripcion_ubicacion;
    document.getElementById('moddireccion').value = direccion_ubicacion;
    document.getElementById('modfoto').value = foto_ubicacion;
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

    ajax.open("POST", "leer", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var recarga = '';
            recarga += '<tr><td><b>ID</b></td><td><b>NOMBRE</b></td><td><b>DESCRIPCION</b></td><td><b>DIRECCION</b></td><td><b>FOTO</b></td><td><b>TIPO</b></td><td><b>MODIFICAR</b></td><td><b>ELIMINAR</b></td></tr>';
            /* Leerá la respuesta que es devuelta por el controlador: */
            for (let i = 0; i < respuesta.length; i++) {
                recarga += '<tr>';
                recarga += '<td>' + respuesta[i].id_ubicacion + '</td>'
                recarga += '<td>' + respuesta[i].nombre_ubicacion + '</td>'
                recarga += '<td>' + respuesta[i].descripcion_ubicacion + '</td>'
                recarga += '<td>' + respuesta[i].direccion_ubicacion + '</td>'
                recarga += '<td><img src="storage/' + respuesta[i].foto_ubicacion + '" style="width:15px;"></td>'
                recarga += '<td>' + respuesta[i].nombre_tipo + '</td>'
                recarga += '<td><button class="boton_modificar" type="submit" value="Modificar" onclick="abrirModal(' + respuesta[i].id_ubicacion + ',\'' + respuesta[i].nombre_ubicacion + '\',\'' + respuesta[i].descripcion_ubicacion + '\',\'' + respuesta[i].direccion_ubicacion + '\',\'' + respuesta[i].foto_ubicacion + '\');return false;">Modificar</button></td>'
                recarga += '<td><button class="boton_eliminar" onclick="eliminarJS(' + respuesta[i].id_ubicacion + ')">Eliminar</button></td>'
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

    ajax.open("POST", "leertipo", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
                /* Leerá la respuesta que es devuelta por el controlador: */
            for (let i = 0; i < respuesta.length; i++) {
                console.log(respuesta[i]['nombre_tipo'])
                document.getElementById('nombre_tipo').innerHTML += "<option value='" + respuesta[i]['nombre_tipo'] + "'>" + respuesta[i]['nombre_tipo'] + "</option>"

            }
        }
    }

    ajax.send(formData);
}
/* Función implementada con AJAX que inserta un archivo */
function insertarJS() {
    let nombre = document.getElementById('nombre_ubicacion').value;
    let descripcion = document.getElementById('descripcion_ubicacion').value;
    let direccion = document.getElementById('direccion_ubicacion').value;
    let foto = document.getElementById('foto_ubicacion').value;

    
    if (nombre == '' || descripcion == '' || direccion == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;
    }else if (foto=="") {
        swal.fire({
            title: "Error",
            text: "Debes meter una foto",
            icon: "error",
        });
        return false;
    }else if (nombre.length > 50) {
        swal.fire({
            title: "Error",
            text: "El nombre no puede ser mas grande de 50 caracteres",
            icon: "error",
        });
        return false;
    }else if (descripcion.length > 50) {
        swal.fire({
            title: "Error",
            text: "La descripcion no puede tener mas de 50 caracteres",
            icon: "error",
        });
        return false;
    }else if (direccion.length > 500) {
        swal.fire({
            title: "Error",
            text: "El apellido no puede tener mas de 500 caracteres",
            icon: "error",
        });
        return false;
    }
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('nombre_ubicacion', document.getElementById('nombre_ubicacion').value);
    formData.append('descripcion_ubicacion', document.getElementById('descripcion_ubicacion').value);
    formData.append('direccion_ubicacion', document.getElementById('direccion_ubicacion').value);
    formData.append('foto_ubicacion', document.getElementById('foto_ubicacion').files[0]);
    formData.append('nombre_tipo', document.getElementById('nombre_tipo').value);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "crear", true);
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
            document.getElementById('nombre_ubicacion').value = '';
            document.getElementById('nombre_tipo').value = '';
            document.getElementById('descripcion_ubicacion').value = '';
            document.getElementById('direccion_ubicacion').value = '';
            document.getElementById("nombre_ubicacion").focus();
            document.getElementById('foto_ubicacion').value="";
        }
    }

    ajax.send(formData);
}

//BORRAR
function eliminarJS(id) {
    /* Si hace falta obtenemos el elemento HTML donde introduciremos la recarga (datos o mensajes) */
    /* Usar el objeto FormData para guardar los parámetros que se enviarán:
       formData.append('clave', valor);
       valor = elemento/s que se pasarán como parámetros: token, method, inputs... */
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'DELETE');
    formData.append('id_ubicacion', id);
    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "eliminar/" + id, true);
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
    let nombre = document.getElementById('modnombre').value;
    let descripcion = document.getElementById('moddescripcion').value;
    let direccion = document.getElementById('moddireccion').value;
    let foto = document.getElementById('modfoto').value;

    
    if (nombre == '' || descripcion == '' || direccion == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;
    }else if (nombre.length > 50) {
        swal.fire({
            title: "Error",
            text: "El nombre no puede ser mas grande de 50 caracteres",
            icon: "error",
        });
        return false;
    }else if (descripcion.length > 50) {
        swal.fire({
            title: "Error",
            text: "La descripcion no puede tener mas de 50 caracteres",
            icon: "error",
        });
        return false;
    }else if (direccion.length > 500) {
        swal.fire({
            title: "Error",
            text: "El apellido no puede tener mas de 500 caracteres",
            icon: "error",
        });
        return false;
    }
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', "PUT");
    formData.append('id_ubicacion', document.getElementById('idModificar').value);
    formData.append('nombre_ubicacion', document.getElementById('modnombre').value);
    formData.append('descripcion_ubicacion', document.getElementById('moddescripcion').value);
    formData.append('direccion_ubicacion', document.getElementById('moddireccion').value);
    formData.append('foto_ubicacion', document.getElementById('modfoto').files[0]);
    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "modificar", true);
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