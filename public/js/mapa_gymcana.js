// Cmabiar iconos de mapa, poner un poco mejor los botones, css general y poner iconos de fontsawesome
/* Objetode Ajaz*/
map = L.map('map').setView([41.38126114705645, 2.173033795865501], 25);
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
var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 16,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
}).addTo(map);

var florentino = L.icon({
    iconUrl: 'http://assets.stickpng.com/images/5c41d5a7e39d5d01c21da92a.png',
    iconSize: [40, 40]
});

var marker = L.marker({ draggable: false, autoPan: false, icon: florentino }).setLatLng([41.38126114705645, 2.173033795865501]).addTo(map);


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

/* Obtener posicion en coordeandas delsuaurio mediante navegador*/

id_pregunta = document.getElementById('id_pregunta').value
    /* Mostrar en el mapa la posición del usuario */
function iniciarPosition(position) {
    myPosition = position;


    coordenadas_usuario = [position.coords.latitude, position.coords.longitude]

    //Llamar a la comprobacion
    var id_gimcana = 1
    empezargimcana(id_gimcana, coordenadas_usuario, id_pregunta)

    //var marker = L.marker({ draggable: false, autoPan: false, icon: florentino }).setLatLng([position.coords.latitude, position.coords.longitude]).addTo(map);
    marker.setLatLng([position.coords.latitude, position.coords.longitude]);
}

function empezargimcana(id_gimcana, coords_user, punto_control) {
    //console.log(id_gimcana + " ID giMCANA")

    resultado_actual = document.getElementById('resultado_actual')
    boton_pasar_nivel = document.getElementById('pasar_punto_control')


    console.log(id_gimcana + " ID giMCANA")

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_gimcana', id_gimcana)
        /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("post", "inicializargimcana", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            //console.log(respuesta)

            var direcciones_ptos_Control = localizarpuntoscontrol(respuesta[2])

            var geocoder = L.esri.Geocoding.geocodeService();
            console.log(direcciones_ptos_Control)
            console.log(punto_control)

            if (punto_control == 3) {
                alert("Ya has acabo la gimcana, prueba la siguiente")
                window.location.replace("http://localhost:8000/indexgimcana");
            }

            for (let i = 0; i < direcciones_ptos_Control.length; i++) {

                geocoder.geocode().text(direcciones_ptos_Control[punto_control]).run(function(error, response) {

                    console.log(response.results[0].latlng)
                        //console.log(coords_user)

                    var distancia = map.distance(coords_user, response.results[0].latlng);
                    //console.log(distancia + " metros hasta el objetivo")
                    if (distancia < 70) {
                        console.log("estoy dentro")
                        resultado_actual.innerHTML = "Estas dentro del punto de control Nº " + (punto_control + 1)
                        boton_pasar_nivel.removeAttribute("hidden");
                        boton_pasar_nivel.onclick = function() {
                            id_pregunta++;
                            pillarpista(id_pregunta)
                            document.getElementById('solucion').innerHTML = ("")
                        };

                    } else {
                        console.log("estoy fuera")
                        resultado_actual.innerHTML = "Estas fuera del punto de control Nº " + (punto_control + 1)
                        boton_pasar_nivel.setAttribute("hidden", true);
                    }
                });
            }

        }
    }
    ajax.send(formData);
}
//empezamos gimcana


function localizarpuntoscontrol(direccionesgimcana) {
    //hacer tres nuevas variables con arrays
    var ptos_control = [];


    ptos_control.push(direccionesgimcana[0].direccion_ubicacion)
    ptos_control.push(direccionesgimcana[1].direccion_ubicacion)
    ptos_control.push(direccionesgimcana[2].direccion_ubicacion)

    return ptos_control;
}

function posicionactualusuario() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(iniciarPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}


function pillarpista(id_pregunta) {
    var pista = document.getElementById("pista")
        // console.log(pista)
        // console.log(id_pregunta + " ID pregunta")
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_pregunta', id_pregunta)
        /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("post", "pillamosrespuesta", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            //console.log(respuesta[0])
            // console.log(localizarpuntoscontrol(respuesta[2]))
            // console.log(coordenadas_ptos_Control[0])
            pista.innerHTML = respuesta[id_pregunta].question_pregunta
                //console.log(respuesta[id_pregunta].question_pregunta)



        }
    }
    ajax.send(formData);
}
pillarpista(id_pregunta)

function mostrarsolucion(id_pregunta) {
    var solucion = document.getElementById("solucion")
        // console.log(pista)
        // console.log(id_pregunta + " ID pregunta")
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_pregunta', id_pregunta)
        /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("post", "pillamosrespuesta", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            //console.log(respuesta[0])
            //console.log(localizarpuntoscontrol(respuesta[2]))
            //console.log(coordenadas_ptos_Control[0])
            solucion.innerHTML = respuesta[id_pregunta].respuestacorrecta_pregunta
                //console.log(respuesta[id_pregunta].question_pregunta)



        }
    }
    ajax.send(formData);
}

llamarintervalo = setInterval(posicionactualusuario, 5000);
llamarpista = setInterval(pillarpista(id_pregunta), 1000);