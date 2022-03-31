// Cmabiar iconos de mapa, poner un poco mejor los botones, css general y poner iconos de fontsawesome

//const { over } = require("lodash");

/* Objetode Ajaz*/
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
var layers_puestos = 0
var layers_puestos_fav = 0
    /* Obtenemos todas las posiciones en BBDD */
function ponerLayers() {

   

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("get", "mapa_filtros_todo", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            //console.log(respuesta)
            return respuesta;
        }
    }
    ajax.send(formData);
    cargaContenido("mapa_filtros_todo", "get", positionDirection)
}

/* Obtenemos todas las posiciones favoritas en BBDD y llamamos a que nos la ponga*/
function ponerFavoritos() {



    var user = document.getElementById('id_user').value

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('user', user)

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("post", "mapa_filtros_favoritos", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            //console.log(respuesta)
            positionDirectionFavorita(respuesta)
                //return respuesta;
        }
    }
    ajax.send(formData);
}

function insertarTag() {

    var user = document.getElementById('id_user').value
    var ubicacion = document.getElementById('id_ubicacion').value
    var tag = document.getElementById('textarea_tag').value

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('user', user)
    formData.append('tag', tag)
    formData.append('ubicacion', ubicacion)

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("post", "insertar_tag", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            informacion = document.getElementById('info_insercion')
            if (respuesta['Resultado'] == 'NOK') {
                informacion.innerHTML = "Error"
            } else {
                informacion.innerHTML = "Tag añadido"
                ponerLayers();
            }
        }
    }
    ajax.send(formData);
}
//FUNCION PARA ELIMINAR TAGS DE POPUPS DE USUARIO
function eliminarTag(tag) {

    var user = document.getElementById('id_user').value
    var ubicacion = document.getElementById('id_ubicacion').value

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('user', user)
    formData.append('tag', tag)
    formData.append('ubicacion', ubicacion)

    console.log(tag + " Es el tag a eliminar")

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("post", "eliminar_tag", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
            informacion = document.getElementById('info_insercion')
            if (respuesta['Resultado'] == 'NOK') {
                informacion.innerHTML = "Error al eliminar Tag, pruebalo de nuevo más adelante"
            } else {
                informacion.innerHTML = "Tag eliminado correctamente"
                ponerLayers();
            }
        }
    }
    ajax.send(formData);
}

/* Obtener posicion en coordeandas delsuaurio mediante navegador*/
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(iniciarPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
var map

/* Mostrar en el mapa la posición del usuario */
function iniciarPosition(position) {
    myPosition = position;
    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
        map = L.map('map', { zoomControl: false }).setView([position.coords.latitude, position.coords.longitude], 25);

        new L.Control.Zoom({ position: 'bottomright' }).addTo(map);


        //Añadimos un poligono con nuetsra zona de juego
        var polygon = L.polygon([
            [41.374980592155794, 2.168069419305712],
            [41.37870230182673, 2.1630370312774074],
            [41.385554535803344, 2.1641276580851647],
            [41.385925684055444, 2.1647233874574145],
            [41.38557028059483, 2.1697256305596704],
            [41.38581837319181, 2.170128191724144],
            [41.388490777066735, 2.172788943197472],
            [41.3804088341541, 2.1835177788932114],
            [41.37675392055456, 2.184976900593031],
            [41.37432256476872, 2.18298133728499],
            [41.37515986311363, 2.1815222157264222],
            [41.37749458041587, 2.1831959139847794],
            [41.37952330119203, 2.1823376071856218],
            [41.37400052401823, 2.17798170011355],
            [41.37155296263436, 2.1830027948886213],
            [41.37039355931067, 2.182037199739569],
            [41.37363017524818, 2.1753853220460986],
            [41.374048830224076, 2.1753853220460986],
            [41.37445138054452, 2.175256576026225]
        ]).addTo(map);
    }
    var florentino = L.icon({
        iconUrl: 'http://assets.stickpng.com/images/5c41d5a7e39d5d01c21da92a.png',
        iconSize: [60, 60]
    });

    var marker = L.marker([position.coords.latitude, position.coords.longitude], { draggable: false, autoPan: false, icon: florentino }).addTo(map);
    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    }).addTo(map);
}

/* Geolocalizar posiciones mediante direcciones de layers tags */
function positionDirection(e) {
    if (peticion_http.readyState == READY_STATE_COMPLETE) {
        if (peticion_http.status == 200) {
            var datos = JSON.parse(peticion_http.responseText);
            console.log(datos)
            var geocoder = L.esri.Geocoding.geocodeService();

            //Crear un grupo por cada tipo

            var markerGroup_1 = L.layerGroup()
            var markerGroup_2 = L.layerGroup()
            var markerGroup_3 = L.layerGroup()
            var markerGroup_4 = L.layerGroup()
            var markerGroup_5 = L.layerGroup()
            var markerGroup_6 = L.layerGroup()

            //Inicializamos la posicion del grupo
            markerPosition = [];

            /*
            var array_tipos = []

            for (let i = 0; i < datos.length; i++) {
                array_tipos.push(datos[i]['id_tipo']);
            }
            let array_tipos_unicos = array_tipos.filter((item, i, ar) => ar.indexOf(item) === i);
            console.log(array_tipos_unicos);
            */

            removeRouting = false;
            for (let i = 0; i < datos[0].length; i++) {

                var tags = ""

                //FILTRAMOS UBICACION POR TIPO
                if (datos[0][i]['id_tipo'] == 1) {
                    geocoder.geocode().text(datos[0][i].direccion_ubicacion).run(function(error, response) {

                        var user = document.getElementById('id_user').value
                        tags = ""
                        for (let k = 0; k < datos[2].length; k++) {
                            if (datos[0][i]['id_ubicacion'] == datos[2][k]['id_ubicacion']) {
                                if (user == datos[2][k]['id_usuario']) {

                                    tags += "<p id=" + datos[2][k]['id_tags'] + ">" + datos[2][k]['nombre_tags'] + "<button class='boton_eliminar_mapa' onclick='eliminarTag(" + datos[2][k]['id_tags'] + "); return false;'>x</button><br>"

                                }
                            }
                        }


                        var coordenadas = response['results'][0]['latlng']

                        var markerIcon = L.icon({
                            //Fotos de la carpeta proyecto
                            //iconUrl: 'media/icon/' + respuesta[i].path_ic,
                            iconUrl: 'https://cdn-icons-png.flaticon.com/512/242/242452.png',
                            iconSize: [30, 30]

                        });
                        //nombre direccion descripcion opiinion opinion_user foto + add favorito

                        //VAMOS A INTENTAR RESOLVER SI ESTÁ AÑADIDO A FAVORITO
                        var favorito = 0

                        for (let j = 0; j < datos[1].length; j++) {
                            if (datos[1][j]['id_usuario'] == user) {
                                if (datos[1][j]['id_ubicacion'] == datos[0][i]['id_ubicacion']) {
                                    //console.log("Favorito encontrado en la ubicacion " + datos[0][i]['nombre_ubicacion'])
                                    favorito = 1
                                } else {}
                            } else {}
                        }

                        //COMPROBAMOS SI LA UBICACION ESTA EN FAVORITOS, PARA AÑADIR O NO EL BOTON DE FAVS
                        if (favorito == 1) {
                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_quitar_favorito" onclick="quitarFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Quitar de favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        } else {
                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                //Ver tags del user
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_añadir_favorito" onclick="anadirFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Añadir a favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        }

                        markerPosition.push(L.marker(response.results[0].latlng, { icon: markerIcon }).bindPopup(markerIconPopup).addTo(markerGroup_1));
                    });
                }
                if (datos[0][i]['id_tipo'] == 17) {
                    geocoder.geocode().text(datos[0][i].direccion_ubicacion).run(function(error, response) {

                        var user = document.getElementById('id_user').value
                        tags = ""
                        for (let k = 0; k < datos[2].length; k++) {
                            if (datos[0][i]['id_ubicacion'] == datos[2][k]['id_ubicacion']) {
                                if (user == datos[2][k]['id_usuario']) {

                                    tags += "<p id=" + datos[2][k]['id_tags'] + ">" + datos[2][k]['nombre_tags'] + "<button class='boton_eliminar_mapa' onclick='eliminarTag(" + datos[2][k]['id_tags'] + "); return false;'>x</button><br>"

                                }
                            }
                        }

                        var coordenadas = response['results'][0]['latlng']

                        var markerIcon = L.icon({
                            //Fotos de la carpeta proyecto
                            //iconUrl: 'media/icon/' + respuesta[i].path_ic,
                            iconUrl: 'https://cdn-icons-png.flaticon.com/512/236/236981.png',
                            iconSize: [20, 20],
                            iconAnchor: [20, 20],
                            popupAnchor: [10, 10]
                        })

                        var favorito = 0

                        for (let j = 0; j < datos[1].length; j++) {
                            if (datos[1][j]['id_usuario'] == user) {
                                if (datos[1][j]['id_ubicacion'] == datos[0][i]['id_ubicacion']) {
                                    //console.log("Favorito encontrado en la ubicacion " + datos[0][i]['nombre_ubicacion'])
                                    favorito = 1
                                } else {}
                            } else {}
                        }

                        //COMPROBAMOS SI LA UBICACION ESTA EN FAVORITOS, PARA AÑADIR O NO EL BOTON DE FAVS
                        if (favorito == 1) {
                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_quitar_favorito" onclick="quitarFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Quitar de favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        } else {
                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_añadir_favorito" onclick="anadirFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Añadir a favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        }
                        markerPosition.push(L.marker(response.results[0].latlng, { icon: markerIcon }).bindPopup(markerIconPopup).addTo(markerGroup_2));
                        //markerPosition.push(L.marker(response.results[i].latlng).on("click", muestraPopup, { icon: markerIcon }).bindPopup(markerIconPopup).addTo(markerGroup_favorito));

                    });
                }
                if (datos[0][i]['id_tipo'] == 18) {

                    geocoder.geocode().text(datos[0][i].direccion_ubicacion).run(function(error, response) {

                        var user = document.getElementById('id_user').value
                        tags = ""
                        for (let k = 0; k < datos[2].length; k++) {
                            if (datos[0][i]['id_ubicacion'] == datos[2][k]['id_ubicacion']) {
                                if (user == datos[2][k]['id_usuario']) {

                                    tags += "<p id=" + datos[2][k]['id_tags'] + ">" + datos[2][k]['nombre_tags'] + "<button class='boton_eliminar_mapa' onclick='eliminarTag(" + datos[2][k]['id_tags'] + "); return false;'>x</button><br>"

                                }
                            }
                        }

                        var coordenadas = response['results'][0]['latlng']
                        var markerIcon = L.icon({
                            //Fotos de la carpeta proyecto
                            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Statue_icon.svg/1200px-Statue_icon.svg.png',
                            iconSize: [20, 20],
                            iconAnchor: [20, 20],
                            popupAnchor: [10, 10]
                        })

                        //VAMOS A INTENTAR RESOLVER SI ESTÁ AÑADIDO A FAVORITO
                        var favorito = 0

                        for (let j = 0; j < datos[1].length; j++) {
                            if (datos[1][j]['id_usuario'] == user) {
                                if (datos[1][j]['id_ubicacion'] == datos[0][i]['id_ubicacion']) {
                                    //console.log("Favorito encontrado en la ubicacion " + datos[0][i]['nombre_ubicacion'])
                                    favorito = 1
                                } else {}
                            } else {}
                        }

                        //COMPROBAMOS SI LA UBICACION ESTA EN FAVORITOS, PARA AÑADIR O NO EL BOTON DE FAVS
                        if (favorito == 1) {

                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_quitar_favorito" onclick="quitarFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Quitar de favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        } else {

                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_añadir_favorito" onclick="anadirFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Añadir a favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        }
                        markerPosition.push(L.marker(response.results[0].latlng, { icon: markerIcon }).bindPopup(markerIconPopup).addTo(markerGroup_3));
                    });
                }
                if (datos[0][i]['id_tipo'] == 19) {

                    geocoder.geocode().text(datos[0][i].direccion_ubicacion).run(function(error, response) {

                        var user = document.getElementById('id_user').value
                        tags = ""
                        for (let k = 0; k < datos[2].length; k++) {
                            if (datos[0][i]['id_ubicacion'] == datos[2][k]['id_ubicacion']) {
                                if (user == datos[2][k]['id_usuario']) {

                                    tags += "<p id=" + datos[2][k]['id_tags'] + ">" + datos[2][k]['nombre_tags'] + "<button class='boton_eliminar_mapa' onclick='eliminarTag(" + datos[2][k]['id_tags'] + "); return false;'>x</button><br>"

                                }
                            }
                        }

                        var coordenadas = response['results'][0]['latlng']
                        var markerIcon = L.icon({
                            //Fotos de la carpeta proyecto
                            iconUrl: 'https://icons-for-free.com/iconfiles/png/512/theatre-131979040865277936.png',
                            iconSize: [20, 20],
                            iconAnchor: [20, 20],
                            popupAnchor: [10, 10]
                        })

                        //VAMOS A INTENTAR RESOLVER SI ESTÁ AÑADIDO A FAVORITO
                        var favorito = 0

                        for (let j = 0; j < datos[1].length; j++) {
                            if (datos[1][j]['id_usuario'] == user) {
                                if (datos[1][j]['id_ubicacion'] == datos[0][i]['id_ubicacion']) {
                                    //console.log("Favorito encontrado en la ubicacion " + datos[0][i]['nombre_ubicacion'])
                                    favorito = 1
                                } else {}
                            } else {}
                        }

                        //COMPROBAMOS SI LA UBICACION ESTA EN FAVORITOS, PARA AÑADIR O NO EL BOTON DE FAVS
                        if (favorito == 1) {

                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_quitar_favorito" onclick="quitarFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Quitar de favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        } else {

                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_añadir_favorito" onclick="anadirFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Añadir a favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        }
                        markerPosition.push(L.marker(response.results[0].latlng, { icon: markerIcon }).bindPopup(markerIconPopup).addTo(markerGroup_4));
                    });
                }
                if (datos[0][i]['id_tipo'] == 22) {

                    geocoder.geocode().text(datos[0][i].direccion_ubicacion).run(function(error, response) {

                        var user = document.getElementById('id_user').value
                        tags = ""
                        for (let k = 0; k < datos[2].length; k++) {
                            if (datos[0][i]['id_ubicacion'] == datos[2][k]['id_ubicacion']) {
                                if (user == datos[2][k]['id_usuario']) {

                                    tags += "<p id=" + datos[2][k]['id_tags'] + ">" + datos[2][k]['nombre_tags'] + "<button class='boton_eliminar_mapa' onclick='eliminarTag(" + datos[2][k]['id_tags'] + "); return false;'>x</button><br>"

                                }
                            }
                        }

                        var coordenadas = response['results'][0]['latlng']
                        var markerIcon = L.icon({
                            //Fotos de la carpeta proyecto
                            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Circle-icons-art.svg/1200px-Circle-icons-art.svg.png',
                            iconSize: [20, 20],
                            iconAnchor: [20, 20],
                            popupAnchor: [10, 10]
                        })

                        //VAMOS A INTENTAR RESOLVER SI ESTÁ AÑADIDO A FAVORITO
                        var favorito = 0

                        for (let j = 0; j < datos[1].length; j++) {
                            if (datos[1][j]['id_usuario'] == user) {
                                if (datos[1][j]['id_ubicacion'] == datos[0][i]['id_ubicacion']) {
                                    //console.log("Favorito encontrado en la ubicacion " + datos[0][i]['nombre_ubicacion'])
                                    favorito = 1
                                } else {}
                            } else {}
                        }

                        //COMPROBAMOS SI LA UBICACION ESTA EN FAVORITOS, PARA AÑADIR O NO EL BOTON DE FAVS
                        if (favorito == 1) {

                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_quitar_favorito" onclick="quitarFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Quitar de favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        } else {

                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_añadir_favorito" onclick="anadirFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Añadir a favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        }
                        markerPosition.push(L.marker(response.results[0].latlng, { icon: markerIcon }).bindPopup(markerIconPopup).addTo(markerGroup_5));
                    });
                }
                if (datos[0][i]['id_tipo'] == 23) {

                    geocoder.geocode().text(datos[0][i].direccion_ubicacion).run(function(error, response) {
                        var user = document.getElementById('id_user').value
                        tags = ""
                        for (let k = 0; k < datos[2].length; k++) {
                            if (datos[0][i]['id_ubicacion'] == datos[2][k]['id_ubicacion']) {
                                if (user == datos[2][k]['id_usuario']) {

                                    tags += "<p id=" + datos[2][k]['id_tags'] + ">" + datos[2][k]['nombre_tags'] + "<button class='boton_eliminar_mapa' onclick='eliminarTag(" + datos[2][k]['id_tags'] + "); return false;'>x</button><br>"

                                }
                            }
                        }

                        var coordenadas = response['results'][0]['latlng']
                        var markerIcon = L.icon({
                            //Fotos de la carpeta proyecto
                            iconUrl: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/other-1994947-1682690.png',
                            iconSize: [20, 20],
                            iconAnchor: [20, 20],
                            popupAnchor: [10, 10]
                        })

                        //VAMOS A INTENTAR RESOLVER SI ESTÁ AÑADIDO A FAVORITO
                        var favorito = 0

                        for (let j = 0; j < datos[1].length; j++) {
                            if (datos[1][j]['id_usuario'] == user) {
                                if (datos[1][j]['id_ubicacion'] == datos[0][i]['id_ubicacion']) {
                                    //console.log("Favorito encontrado en la ubicacion " + datos[0][i]['nombre_ubicacion'])
                                    favorito = 1
                                } else {}
                            } else {}
                        }

                        //COMPROBAMOS SI LA UBICACION ESTA EN FAVORITOS, PARA AÑADIR O NO EL BOTON DE FAVS
                        if (favorito == 1) {

                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_quitar_favorito" onclick="quitarFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Quitar de favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        } else {

                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value="' + user + '">' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_añadir_favorito" onclick="anadirFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Añadir a favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        }
                        markerPosition.push(L.marker(response.results[0].latlng, { icon: markerIcon }).bindPopup(markerIconPopup).addTo(markerGroup_6));
                    });
                }
                if (datos[0][i]['id_tipo'] == 6) {
                    geocoder.geocode().text(datos[0][i].direccion_ubicacion).run(function(error, response) {

                        var user = document.getElementById('id_user').value
                        tags = ""
                        for (let k = 0; k < datos[2].length; k++) {
                            if (datos[0][i]['id_ubicacion'] == datos[2][k]['id_ubicacion']) {
                                if (user == datos[2][k]['id_usuario']) {

                                    tags += "<p id=" + datos[2][k]['id_tags'] + ">" + datos[2][k]['nombre_tags'] + "<button class='boton_eliminar_mapa' onclick='eliminarTag(" + datos[2][k]['id_tags'] + "); return false;'>x</button><br>"

                                }
                            }
                        }


                        var coordenadas = response['results'][0]['latlng']

                        var markerIcon = L.icon({
                            //Fotos de la carpeta proyecto
                            //iconUrl: 'media/icon/' + respuesta[i].path_ic,
                            iconUrl: 'http://i.imgur.com/u5kEUPv.png',
                            iconSize: [30, 30]

                        });
                        //nombre direccion descripcion opiinion opinion_user foto + add favorito

                        //VAMOS A INTENTAR RESOLVER SI ESTÁ AÑADIDO A FAVORITO
                        var favorito = 0

                        for (let j = 0; j < datos[1].length; j++) {
                            if (datos[1][j]['id_usuario'] == user) {
                                if (datos[1][j]['id_ubicacion'] == datos[0][i]['id_ubicacion']) {
                                    //console.log("Favorito encontrado en la ubicacion " + datos[0][i]['nombre_ubicacion'])
                                    favorito = 1
                                } else {}
                            } else {}
                        }

                        //COMPROBAMOS SI LA UBICACION ESTA EN FAVORITOS, PARA AÑADIR O NO EL BOTON DE FAVS
                        if (favorito == 1) {
                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_quitar_favorito" onclick="quitarFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Quitar de favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        } else {
                            var markerIconPopup = L.popup().setContent(
                                '<center><h3>' + datos[0][i]['nombre_ubicacion'] + '</h3>' +
                                '<p>' + datos[0][i]['direccion_ubicacion'] + '</p>' +
                                '<p>' + datos[0][i]['descripcion_ubicacion'] + '</p>' +
                                //Ver tags del user
                                '<p>' + tags + '</p>' +
                                //Insertar comentarios de la ubi
                                '<form onsubmit="insertarTag(); return false;" action="" method="post">' +
                                '<textarea name="textarea_tag" id="textarea_tag" cols="20" rows="1"></textarea><br>' +
                                '<input type="number" hidden id="id_user" value=' + user + '>' +
                                '<input type="number" id="id_ubicacion" value=' + datos[0][i]['id_ubicacion'] + ' hidden>' +
                                '<input type="submit" value="Enviar" class="boton_enviar_mapa">' +
                                '</form>' +
                                //Acabar insertar comentarios de la ubi
                                '<img class="img_popup" src="storage/' + datos[0][i]['foto_ubicacion'] + '"></img><br>' +
                                '<button class="boton_añadir_favorito" onclick="anadirFav(' + user + ',' + datos[0][i]['id_ubicacion'] + ')">' + 'Añadir a favoritos' + '</button>' +
                                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                                '<p id="info_insercion"></p>' +
                                '</center>'

                            );
                        }

                        markerPosition.push(L.marker(response.results[0].latlng, { icon: markerIcon }).bindPopup(markerIconPopup).addTo(markerGroup_6));
                    });
                }
            }

            var overlayMaps = {};
            //id_tipo = datos[0]['id_tipo']
            nombreCapa = ""
            for (let i = 0; i < tipos.length; i++) {
                //console.log(tipos[i])
                if (tipos[i]['nombre_tipo'] == 'restaurante') {
                    nombreCapa = tipos[i]['nombre_tipo']
                    overlayMaps[nombreCapa] = markerGroup_1
                        //Añadimos por default al mapa
                    map.addLayer(markerGroup_1)
                }
                if (tipos[i]['nombre_tipo'] == 'museo') {
                    nombreCapa = tipos[i]['nombre_tipo']
                    overlayMaps[nombreCapa] = markerGroup_2
                    map.addLayer(markerGroup_2)
                }
                if (tipos[i]['nombre_tipo'] == 'monumento') {
                    nombreCapa = tipos[i]['nombre_tipo']
                    overlayMaps[nombreCapa] = markerGroup_3
                    map.addLayer(markerGroup_3)
                }
                if (tipos[i]['nombre_tipo'] == 'teatro') {
                    nombreCapa = tipos[i]['nombre_tipo']
                    overlayMaps[nombreCapa] = markerGroup_4
                    map.addLayer(markerGroup_4)
                }
                if (tipos[i]['nombre_tipo'] == 'arte') {
                    nombreCapa = tipos[i]['nombre_tipo']
                    overlayMaps[nombreCapa] = markerGroup_5
                    map.addLayer(markerGroup_5)
                }
                if (tipos[i]['nombre_tipo'] == 'otro') {
                    nombreCapa = tipos[i]['nombre_tipo']
                    overlayMaps[nombreCapa] = markerGroup_6
                    map.addLayer(markerGroup_6)
                }
            }
            //console.log(markerGroup)
            //var overlayMaps = { "Cities": markerGroup };
            //L.control.layers(null, overlayMaps).addTo(map);

            //markerGroup.clearLayers();
            //console.log(layers_puestos + " Valor layers")

            function quitar_todo() {
                console.log("Quita todo desde dentro")
                control_capas.removeLayer(markerGroup_1)
                control_capas.removeLayer(markerGroup_2)
                control_capas.removeLayer(markerGroup_3)
                control_capas.removeLayer(markerGroup_4)
                control_capas.removeLayer(markerGroup_5)
                control_capas.removeLayer(markerGroup_6)

                control_capas.remove(map);

                layers_puestos = 0
            }

            function anadir_todo() {
                console.log("Pon todo desde dentro")
                control_capas = L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);
                layers_puestos = 1
            }

            if (layers_puestos == 0) {
                console.log("Pon todo")
                anadir_todo()
            } else {
                console.log("Quita todo")
                quitar_todo()
                anadir_todo()
            }
        }
    }
}

function muestraPopup(objeto_clickado) {

    console.log(objeto_clickado)
    var id_ubicacion = objeto_clickado['sourceTarget']['_events']['click'][0]['ctx']['id_ubicacion']
    console.log("Este es mi id, me has clickado " + id_ubicacion)

}

/* Geolocalizar posiciones favoritas mediante direcciones */
function positionDirectionFavorita(datos) {

    console.log(datos)
    var geocoder = L.esri.Geocoding.geocodeService();

    var markerGroup_favorito = L.layerGroup()

    markerPosition = [];
    var markerGroup_favorito = L.layerGroup()
    removeRouting = false;
    for (let i = 0; i < datos.length; i++) {
        geocoder.geocode().text(datos[i].direccion_ubicacion).run(function(error, response) {
            //console.log(response['results'])
            var coordenadas = response['results'][0]['latlng']
                //console.log(coordenadas)
            var markerIcon = L.icon({
                    //Fotos de la carpeta proyecto
                    //iconUrl: 'media/icon/' + respuesta[i].path_ic,
                    iconSize: [30, 30],
                    //iconAnchor: [20, 20],
                    //popupAnchor: [10, 10],
                    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Circle-icons-star.svg/1200px-Circle-icons-star.svg.png'
                })
                //nombre direccion descripcion opiinion opinion_user foto + add favorito
            var user = document.getElementById('id_user').value
            var markerIconPopup = L.popup().setContent(
                '<center><h3>' + datos[i]['nombre_ubicacion'] + '</h3>' +
                '<p>' + datos[i]['direccion_ubicacion'] + '</p>' +
                '<p>' + datos[i]['descripcion_ubicacion'] + '</p>' +
                '<img class="img_popup" src="storage/' + datos[i]['foto_ubicacion'] + '"></img><br>' +
                '<button class="boton_quitar_favorito" onclick="quitarFav(' + user + ',' + datos[i]['id_ubicacion'] + ')">' + 'Quitar de favoritos' + '</button>' +
                //'<button class="boton_añadir_favorito" onclick="anadirFav(' + user + ',' + datos[i]['id_ubicacion'] + ')">' + 'Añadir a favoritos' + '</button>' +
                '<button id="golito" class="boton_crear_ruta" onclick="crearRuta(' + coordenadas['lat'] + ',' + coordenadas['lng'] + ')">' + 'Crear ruta' + '</button>' +
                '<p id="info_insercion"></p>' +
                '</center>'

            );
            markerPosition.push(L.marker(response.results[0].latlng, { icon: markerIcon }).bindPopup(markerIconPopup).addTo(markerGroup_favorito));
        });
    }
    //console.log(markerGroup_favorito)

    //var markerGroup = L.layerGroup().addTo(map);
    var overlayMaps = {};
    //id_tipo = datos[0]['id_tipo']
    nombreCapa = "Favoritos"
    overlayMaps[nombreCapa] = markerGroup_favorito
    map.addLayer(markerGroup_favorito)

    //var control_favoritos = L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);

    function quitar_favoritos() {
        console.log("Quita favoritos desde dentro")
        control_favoritos.removeLayer(markerGroup_favorito)
        control_favoritos.remove(map);

        layers_puestos_fav = 0
    }

    function anadir_favoritos() {
        console.log("Pon favoritos desde dentro")
        control_favoritos = L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);
        layers_puestos_fav = 1
    }

    if (layers_puestos_fav == 0) {
        console.log("Pon todo")
            //quitar_favoritos()
        anadir_favoritos()
    } else {
        console.log("Quita todo")
        quitar_favoritos()
        ponerFavoritos()
    }

}

//hacer ajax de unir favoritos
function anadirFav(id_user, id_ubicacion) {
    console.log(id_user, id_ubicacion)
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_user', id_user)
    formData.append('id_ubicacion', id_ubicacion)
        /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("post", "anadir_favoritos", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
            informacion = document.getElementById('info_insercion')
            if (respuesta['Resultado'] == 'NOK') {
                informacion.innerHTML = "Error al añadir ubicacion"
            } else {
                informacion.innerHTML = "Ubicación añadida a favoritos"
                ponerFavoritos();
            }
        }
    }
    ajax.send(formData);
}

//hacer ajax de eliminar de favoritos
function quitarFav(id_user, id_ubicacion) {

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_user', id_user)
    formData.append('id_ubicacion', id_ubicacion)
        /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("post", "quitar_favoritos", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(this.responseText)
            informacion = document.getElementById('info_insercion')
            if (respuesta['Resultado'] == 'NOK') {
                informacion.innerHTML = "Error en la eliminicación"
            } else {
                informacion.innerHTML = "Ubicación eliminada de favoritos"
                ponerFavoritos();
            }
        }
    }
    ajax.send(formData);
}

var routing = '';
var been_routed = false;


function crearRuta(latitud, longitud) {
    var boton_ruta = document.getElementById('golito')
    console.log(boton_ruta)
    console.log(boton_ruta)

    users_lat_coords = myPosition.coords.latitude;
    users_lng_coords = myPosition.coords.longitude;
    x = latitud;
    y = longitud;

    if (x !== '') {
        if (been_routed === true) {
            routing.spliceWaypoints(0, 1);
        }
        routing = L.Routing.control({
            waypoints: [L.latLng(users_lat_coords, users_lng_coords), L.latLng(x, y)],
            lineOptions: { addWaypoints: false },
            show: false,
            addWaypoints: false, //Quitamos opciones de desviaciones
            routeWhileDragging: false,
            draggableWaypoints: false, //Esto es tonteria, pero es quita los drags de rutas alternativas
            fitSelectedRoutes: false,
            createMarker: function() { return null; }

        });
        routing.addTo(map);
        been_routed = true;
    }
}
setTimeout(() => { ponerLayers(); }, 8000);
setTimeout(() => { ponerFavoritos(); }, 8000);

function ocultar() {
    var lc = document.getElementsByClassName('leaflet-control-layers');

    if (lc[0].style.visibility == 'hidden') {
        lc[0].style.visibility = 'visible';
        lc[1].style.visibility = 'visible';
        document.getElementById('ocultarmostrar').innerHTML = "Ocultar"
    } else {
        lc[0].style.visibility = 'hidden';
        lc[1].style.visibility = 'hidden';
        document.getElementById('ocultarmostrar').innerHTML = "Mostrar"
    }
}