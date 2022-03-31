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
    <title>CRUD UBICACIONES</title>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="{!! asset('css/styles.css') !!}">
    <script src="js/ajax.js"></script>
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <form action="" id="formulario" onsubmit="editarJS(); return false">
          <input class="input_filtro" type="text" name="modnombre" id="modnombre">
          <input class="input_filtro" type="text" name="moddescripcion" id="moddescripcion">
          <input class="input_filtro" type="text" name="moddireccion" id="moddireccion">
          <input class="input_filtro" type="file" name="modfoto" id="modfoto">
          <input type="hidden" name="id" id="idModificar" value="">
          <input class="boton_modificar" type="submit" value="Modificar">
      </form>
    </div>
  </div>
  <div class="menuder">
    <button class="boton_atras_admin" OnClick="location.href='./cPanelAdmin'">Panel admin</button>
    <button class="boton_logout_admin" OnClick="location.href='./logout'">Logout</button>
  </div>
  <div class="contenido_admin">
    <h2>Lista de Ubicaciones</h2>
    <input class="input_filtro" type="text" onkeyup="leerJS()" id="filtro" placeholder="Filtrar por ubicación">
    <table class="table table-bordered table-striped" id="main"></table>
  </div>
  <center>
  <div class="cuadro_admin">
    <br>
    <h2>Creación de usuario</h2>
    <form onsubmit="insertarJS(); return false;">
      <input class="input_login" type="text" id="nombre_ubicacion" placeholder="Introduce un nombre de ubicación">
      <textarea class="input_login" style="resize:none" id="descripcion_ubicacion" placeholder="Introduce una descripción de la ubicación"></textarea>
      <input class="input_login" type="text" id="direccion_ubicacion" placeholder="Introduce una dirección">
      <input class="input_login" type="file" id="foto_ubicacion">
      <select class="input_login" id="nombre_tipo">
      </select>
      <input class="boton_crear_user" type="submit">
  </form>
  <p id="mensaje"></p>
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