@if (!Session::get('nombre_user'))
    <?php
        //Si la session no esta definida te redirige al login.
        return redirect()->to('/')->send();
    ?>
@endif 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <!-- Enlace a API para hacer el CSS de los Mapas  -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
    <!-- Make sure you put this AFTER Leaflet's CSS -->
    <!-- Enlace a API para hacer la logica general de los mapas  -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>

    
    <!--INICIO POSIBLE PRESCINDIBLE -->
    <!-- Esri Leaflet Geocoder 

        CREO QUE ESTOS DOS ENLACES SON PRESCINDIBLES

    <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css" />
    <script src="https://unpkg.com/esri-leaflet-geocoder"></script>

    -->
    <!--FINAL POSIBLE PRESCINDIBLE -->


    <!-- Enlace a API para hacer el geocoding NO TOCAR  -->
    <script src="https://unpkg.com/esri-leaflet"></script>

    <!-- Enlace a API para hacer el geocidng Direcciones <-> Coordanedadas  NO TOCAR -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/leaflet.esri.geocoder/2.1.0/esri-leaflet-geocoder.css">
    <script src="https://cdn.jsdelivr.net/leaflet.esri.geocoder/2.1.0/esri-leaflet-geocoder.js"></script>
    
    <!-- Enlace a API para hacer el routing NO TOCAR -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
    <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
    
    <!-- JS PROPIOS -->
    <script src="{!! asset('js/validacion.js') !!}"></script>

    <script src="{!! asset('js/tags_mapas.js') !!}"></script>
    <script src="{!! asset('js/mapa_filtro.js') !!}"></script>
    <script src="{!! asset('js/llamada_ajax.js') !!}"></script>
    

    <link rel="stylesheet" href="{!! asset('css/styles.css') !!}">
    <meta name="csrf-token" content="{{ csrf_token() }}" id="token">
    <title>Agenda Churrerías</title>

</head>

<body class="body_mapa" onload="getLocation(); obtenerTagsBBDD();">
<?php
    $username_logged = session('id_user');
?>
<nav role="navigation">
    <div id="menuToggle">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
      <ul id="menu">
        <h2>Mapping BCN ®</h2>
        <img class="icono" src="storage/uploads/logonegro.png">
        <a href="./indexgimcana"><li>¡Juega a nuestra Gymkhana!</li></a>
        <a href="./logout"><li>Logout</li></a>
      </ul>
    </div>
  </nav>
    <input type="number" hidden id="id_user" value="<?php echo $username_logged; ?>">
    <div id="tags"></div>
    <div id="traduccion"></div>
    <div class="mapa" id="map">
      <button class="boton_filtro" id="ocultarmostrar" onclick="ocultar();">Ocultar</button>
    </div>

</body>
</html>