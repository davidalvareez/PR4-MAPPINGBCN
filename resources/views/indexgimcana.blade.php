<!DOCTYPE HTML>
<html>
<head>
  <title>Login</title>
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
        <h1>¡Bienvenido/a al juego de la Gymkhana!</h1>
        <button class="boton_jugar_solo" OnClick="location.href='./gimcana'">Juego individual (1 persona)</button>
        <button class="boton_jugar_equipo" OnClick="location.href='./gimcanaequipos'">Juego en equipo (3 personas)</button>
        <button class="boton_registro" OnClick="location.href='./mapa'">Volver atras</button>
    </div>
  </div>
</body>
</html>
