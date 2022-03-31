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
<body class="body_login">
  <div class="row flex-cv">
    <div class="cuadro_login">
        <h1>Jugar Gymkhana</h1>
        <button class="boton_registro" OnClick="location.href='./gimcana'">Jugar</button>
        <button class="boton_registro" OnClick="location.href='./indexgimcana'">Volver a la seleccion de jugadores</button>
    </div>
  </div>
</body>
</html>