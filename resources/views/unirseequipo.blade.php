@if (!Session::get('nombre_admin'))
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
    <meta name="viewport" content="width=device=width, initial-scale=1.0">
    <link rel="stylesheet" href="{!! asset('css/styles.css') !!}">
    <script src="{!! asset('js/validacion.js') !!}"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="icon" type="image/x-icon" href="{{asset('storage/uploads/logoblanco.png')}}">
    <title>Unirse a un equipo</title>
</head>
<body class="login">
    <div class="row flex-cv">
        <div class="cuadro_login">
            <form action="{{url('unirsePostequipo')}}" method="POST">
                @csrf
                {{method_field('POST')}}
            <h1 class="h1_register">REGISTRO DE EQUIPO</h1>
            <input class="input_login" type="text" id="codigo_equipo" name="codigo_equipo" placeholder="Introduce el codigo del equipo...">
            <input class="input_login" type="hidden" id="correo_usuario1" name="correo_usuario1" value={{Session::get('nombre_admin')}}>
            <div>
                {{-- @error('correo_usuario')
                    <input type="hidden" id="error" name="tipo" value="errormio">
                    <script>
                        window.onload = function(){
                            validarCorreo();
                        }
                    </script>

                @enderror --}}

                <input class="input_registro" type="submit" value="Registrarme">
            </div>
            </form>
            {{-- <button class="boton_login" OnClick="location.href='./login'">Volver al inicio de sesión</button> --}}
        </div>
    </div>
</body>
</html>
