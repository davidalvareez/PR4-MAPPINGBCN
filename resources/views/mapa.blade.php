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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mapa</title>
</head>
<body>
    <h1>Mapa</h1>
    <button class="boton_login" OnClick="location.href='./indexgimcana'">Jugar a la Gymcana</button>
    <button class="boton_login" OnClick="location.href='./logout'">Logout</button>

</body>
</html>