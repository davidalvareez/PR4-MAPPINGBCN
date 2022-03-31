var tipos

function obtenerTagsBBDD() {
    //console.log("te voy a mostrar las categorias de las ubicaciones de la BBDD")

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));

    var div_tags = document.getElementById('tags');

    var ajax = objetoAjax();
    ajax.open("get", "mostrar_tags_ubicaciones", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            for (let i = 0; i < respuesta.length; i++) {
                tipos = respuesta
                    //div_tags.innerHTML += '<div class="btn" id="tag_' + respuesta[i]['nombre_tipo'] + '" onclick="mostrarUbicacion(\'' + respuesta[i]['nombre_tipo'] + '\');"> ' + respuesta[i]['nombre_tipo'] + '</div>';
            }
        }
    }
    ajax.send(formData);
}