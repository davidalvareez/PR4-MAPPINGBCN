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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CRUD USUARIOS</title>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="{!! asset('css/styles.css') !!}">
    <script src="js/ajaxuser.js"></script>
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <form action="" id="formulario" onsubmit="editarJS(); return false">
          <input class="input_filtro" type="text" name="modnombreuser" id="modnombreuser">
          <input class="input_filtro" type="text" name="modapellido" id="modapellido">
          <input class="input_filtro" type="text" name="modcorreo" id="modcorreo">
          <input class="input_filtro" type="text" name="modpassword" id="modpassword">
          <input type="hidden" name="id" id="idModificar" value="">
          <input class="boton_modificar" type="submit" value="modificar">
      </form>
    </div>
  </div>
  <div class="menuder">
    <button class="boton_atras_admin" OnClick="location.href='./cPanelAdmin'">Panel admin</button>
    <button class="boton_logout_admin" OnClick="location.href='./logout'">Logout</button>
  </div>
  <div class="contenido_admin">
    <h2>Lista de usuarios</h2>
    <input class="input_filtro" type="text" onkeyup="leerJS()" id="filtro" placeholder="Filtrar por nombre de usuario">
    <table class="table table-bordered table-striped" id="main"></table>
  </div>
  <center>
  <div class="cuadro_admin">
    <br>
    <h2>Creación de usuario</h2>
    <form onsubmit="insertarJS(); return false;">
        <input class="input_login" type="text" id="nombre_usuario" placeholder="Introduce un nombre">
        <input class="input_login" type="text" id="apellido_usuario" placeholder="Introduce un apellido">
        <input class="input_login" type="text" id="correo_usuario" placeholder="Introduce un correo">
        <input class="input_login" type="password" id="password_usuario" placeholder="Introduce una contraseña">
        <select class="input_login" id="nombre_rol" placeholder="Introduce un rol de usuario">
        </select>
        <input class="boton_crear_user" type="submit">
    </form>
    <p style="color:green;" id="mensaje"></p>
  </div>
    <style>        
      /* The Modal (background) */
      .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      }
      
      /* Modal Content */
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
      }
      
      /* The Close Button */
      .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }
      
      .close:hover,
      .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
      </style>
</body>
</html>