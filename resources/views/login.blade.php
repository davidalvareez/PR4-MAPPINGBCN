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
    <div class="cuadro_login">
        <form action="{{url('login')}}" method="POST" onsubmit="return validarLogin();">
            @csrf
            <?php 
                if (isset($error)) {?>
                    <input type="hidden" id="error" name="tipo" value="error">
                    <script>
                        window.onload = function(){
                            validarCorreoNoCreado();
                        }
                    </script>
            <?php
                }
            ?>
            <?php 
                if (isset($errorpassword)) {?>
                    <input type="hidden" id="errorpassword" name="tipo" value="errorpassword">
                    <script>
                        window.onload = function(){
                            validarCorreoPassword();
                        }
                    </script>
            <?php
                }
            ?>
            <h1 class="h1_login">INICIO DE SESIÓN</h1>
            <input class="input_login" type="text" name="correo_usuario" id="correo_usuario" placeholder="Introduce tu correo...">
            <input class="input_login" type="password" name="password_usuario" id="password_usuario" placeholder="Introduce tu contraseña...">
            <button class="boton_login" type="submit" value="register">Iniciar sesión</button>
        </form>
        <p class="msgregistrarse">¿No estás registrado en nuestra web? ¡Regístrate aquí mismo!</p>
        <button class="boton_registro" OnClick="location.href='./registro'">Regístrate</button>
    </div>
  </div>
</body>
</html>