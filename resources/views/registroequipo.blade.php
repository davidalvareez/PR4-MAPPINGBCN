@if (!Session::get('nombre_user'))
    <?php
        //Si la session no esta definida te redirige al login.
        return redirect()->to('/')->send();
    ?>
@endif
<!DOCTYPE HTML>
<html>
<head>
  <title>Crear equipo</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="{!! asset('css/styles.css') !!}">
  <script src="{!! asset('js/validacion.js') !!}"></script>
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <link rel="icon" type="image/x-icon" href="{{asset('storage/uploads/logoblanco.png')}}">
</head>
<body class="login">
  <div class="row flex-cv all-view">
    <div class="cuadro_crear_equipo">
        <h1>¡Crear equipo Gymkhana!</h1>
        <form action="{{url('registroPostequipo')}}" method="POST" onsubmit="return validarCrearEquipo();">
            @csrf
            {{method_field('POST')}}
            <?php 
                if (isset($errormismojugador)) {?>
                    <input type="hidden" id="errormismojugador" name="tipo" value="errormismojugador">
                    <script>
                        window.onload = function(){
                            validarMismosJugador();
                        }
                    </script>
            <?php
                }
            ?><?php 
                if (isset($errorjugadoresiguales)) {?>
                    <input type="hidden" id="errorjugadoresiguales" name="tipo" value="errorjugadoresiguales">
                    <script>
                        window.onload = function(){
                            validarMismosJugadores();
                        }
                    </script>
            <?php
                }
            ?>
            <?php 
                if (isset($errorjugador2)) {?>
                    <input type="hidden" id="errorjugador2" name="tipo" value="errorjugador2">
                    <script>
                        window.onload = function(){
                          validarJugador2();
                        }
                    </script>
            <?php
                }
            ?>
            <?php 
                if (isset($errorjugador3)) {?>
                    <input type="hidden" id="errorjugador3" name="tipo" value="errorjugador3">
                    <script>
                        window.onload = function(){
                          validarJugador3();
                        }
                    </script>
            <?php
                }
            ?>
            <input class="input_crear_equipo" type="text" id="nombre_equipo" name="nombre_equipo" placeholder="Introduce el nombre del equipo...">
            <input class="input_crear_equipo" type="text" id="codigo_equipo" name="codigo_equipo" placeholder="Introduce el codigo del equipo...">
            <input class="input_crear_equipo" type="hidden" id="correo_usuario1" name="correo_usuario1" value={{Session::get('nombre_user')}}>
            <input class="input_crear_equipo" type="text" id="correo_usuario2" name="correo_usuario2" placeholder="Introduce el correo del segundo jugador...">
            <input class="input_crear_equipo" type="text" id="correo_usuario3" name="correo_usuario3" placeholder="Introduce el correo del tercer jugador...">
            @error('nombreequipo')
              <input type="hidden" id="error" name="tipo" value="errormio">
              <script>
                  window.onload = function(){
                      validarCrearEquipo();
                  }
              </script>
            @enderror
            <input type="hidden" id="error" name="tipo" value="noerror">
            <button class="boton_crear_equipo" type="submit" name="register" value="register">Crear equipo</button>    
        </form>
    </div>
    <button class="boton_registro" OnClick="location.href='./gimcanaequipos'">Volver atras</button>
  </div>
</body>
</html>
