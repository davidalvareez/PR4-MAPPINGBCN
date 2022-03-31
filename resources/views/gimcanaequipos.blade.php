<!DOCTYPE HTML>
<html>
<head>
  <title>Sala gimcana por equipos</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="{!! asset('css/styles.css') !!}">
  <script src="{!! asset('js/validacion.js') !!}"></script>
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <link rel="icon" type="image/x-icon" href="{{asset('storage/uploads/logoblanco.png')}}">
</head>
<body class="login">
  <div class="row flex-cv all-view">
    <div class="cuadro_index_gimcana">
        <h1>¡Sala de juego por equipos!</h1>
        <button class="boton_jugar_solo" OnClick="location.href='./registroequipo'">Ser el anfitrión del equipo</button>
        <button class="boton_jugar_equipo" OnClick="location.href='./unirequipo'">Unirme a un equipo</button>
        <button class="boton_registro" OnClick="location.href='./indexgimcana'">Volver atras</button>
    </div>
  </div>
</body>
</html>
