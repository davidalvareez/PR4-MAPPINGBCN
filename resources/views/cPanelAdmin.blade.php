@if (!Session::get('nombre_admin'))
    <?php
        //Si la session no esta definida te redirige al login.
        return redirect()->to('/')->send();
    ?>
@endif
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control Panel Administrador</title>
    <link rel="stylesheet" href="{!! asset('css/styles.css') !!}">
    <script src="js/iconos_g.js"></script>
</head>
<body class="login">
    <div class="row flex-cv all-view">
        <div class="cuadro_registro">
            <h1>Panel de control del administrador</h1>
            <form action="{{url('usuarios')}}" method="GET">
                <div class="form-group">
                    <span><i class="fas fa-user"></i></span>
                    <button type="submit" value="Enviar" class="boton_control_panel">CRUD DE USUARIOS</button><br><br>
                </div>
            </form>
            <form action="{{url('principal')}}" method="GET">
                <div class="form-group">
                    <span><i class="fas fa-utensils"></i></span>
                    <button type="submit" value="Enviar" class="boton_jugar_equipo">CRUD DE UBICACIONES</button><br><br>
                </div>
            </form>
            <form action="{{url('logout')}}" method="GET">
                <div class="form-group">
                    <span><i class="fas fa-sign-out-alt"></i></span>
                    <button type="submit" value="logout" class="boton_registro">LOGOUT</button><br><br>
                </div>
            </form>
        </div>
    </div>
</body>
</html>