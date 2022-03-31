<?php

namespace App\Http\Controllers;

use App\Models\Mapa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MapaController extends Controller
{
    /*public function login(){
        return view ('login');
    }
    */
    
    // public function loginPost(Request $request){
    //     $datos= $request->except('_token','_method','register');
    //     /*validación de login*/
    //     $request->validate([
    //         'email'=>'required|email',
    //         'password'=>'required|string|max:50'
    //     ]);
    //     try {
    //     $email=$datos['email'];
    //     $password=md5($datos['password']);
    //     DB::beginTransaction();
    //     $users = DB::table("tbl_usuario")->where('correo_usuario','=',$email)->where('password_usuario','=',$password)->count();
    //     $user = DB::table("tbl_usuario")->join('tbl_rol', 'tbl_usuario.id_rol', '=', 'tbl_rol.id_rol')->where('correo_usuario','=',$email)->where('password_usuario','=',$password)->first();
    //     DB::commit();
    //     if($users == 1){
    //         //Establecer la sesion
    //         $request->session()->put('email',$request->email);
    //         $request->session()->put('id_rol',$user->id_rol);
    //         return redirect('/');
    //     }else{
    //         //Redirigir al login
    //         return redirect('/login');
    //     }
    //         }catch(\Exception $e){
    //         DB::rollBack();
    //         return $e->getMessage();
    //         }
    // }

    /*public function logout(Request $request){
        //Olvidar una sesion en especifico
            //$request->session()->forget('email');
        //Eliminar todas las variables de sesion
        $request->session()->flush();
        return redirect('login');
    }
    */
    public function registro()
    {
        return view('register');
    }

    public function registroPost(Request $request){
        $datos = $request->except('_token');
        /*validación registro de usuarios*/
        $request->validate([
            'nombre_usuario'=>'required|unique:tbl_usuario,correo_usuario|string|max:40',
            'apellido_usuario'=>'required|unique:tbl_usuario,correo_usuario|string|max:40',
            'correo_usuario'=>'required|unique:tbl_usuario,correo_usuario|email',
            'password_usuario'=>'required|string|min:8|max:100',
            'password_usuario_validar'=>'required|same:password_usuario'
        ]);
        try{
            DB::beginTransaction();
            /*insertar datos en la base de datos*/
            DB::table('tbl_usuario')->insertGetId(["nombre_usuario"=>$datos['nombre_usuario'],"apellido_usuario"=>$datos['apellido_usuario'],"correo_usuario"=>$datos['correo_usuario'],"password_usuario"=>md5($datos['password_usuario']),"id_rol"=>$datos['id_rol']]);
            DB::commit();
            return redirect('/');
        }catch(\Exception $e){
            DB::rollBack();
            return $e->getMessage();
        }
    }
    
    public function mapa(){
        return view('mapa');
    }

    public function indexgimcana(){
        return view('indexgimcana');
    }
    // public function gimcana(){
    //     return view('gimcana');
    // }

    public function gimcanaequipos(){
        return view('gimcanaequipos');
    }

    public function crearequipo(){
        return view('crearequipo');
    }

    public function crearequipoPOST(Request $request){
        $datos= $request->except('_token','_method','register');
        /*validación de login*/
        $request->validate([
            'nombreequipo'=>'required|unique:tbl_equipo,nombre_equipo|string|max:100',
            'codigo'=>'required',
            'correo1'=>'required',
            'correo1'=>'required'
        ]);
        try {
            $nombre=$datos['nombreequipo'];
            DB::beginTransaction();
            $nombreescogido = DB::table("tbl_equipo")->where('nombre_equipo','=',$nombre)->count();
            DB::commit();
            if($nombreescogido == 1){
                return view('crearequipo');
            }else{
                //parte del dave
            }
        }catch(\Exception $e){
            DB::rollBack();
            return $e->getMessage();
        }
    }
    public function unirequipo(){
        return view('unirequipo');
    }
    
    public function unirequipoPOST(Request $request){
        $datos= $request->except('_token','_method','register');
        $request->validate([
            'nombreequipo'=>'required|string|max:100',
            'codigo'=>'required'
        ]);
        try {
            $error=0;
            $errorcodigo=0;
            $nombre=$datos['nombreequipo'];
            $codigo=$datos['codigo'];
            DB::beginTransaction();
            $nombreescogido = DB::table("tbl_equipo")->where('nombre_equipo','=',$nombre)->count();
            $codigoescogido = DB::table("tbl_equipo")->select("codigo_equipo")->where('nombre_equipo','=',$nombre)->get();
            DB::commit();
            if($nombreescogido == 0){
               return view('unirequipo',compact("error"));
            }else if ($codigoescogido[0]->codigo_equipo != $codigo){
                return view('unirequipo',compact("errorcodigo"));
            }else{
                //codigo david
            }
        }catch(\Exception $e){
            DB::rollBack();
            return $e->getMessage();
        }
    }

    public function jugargimcana(){
        return view('jugargimcana');
    }

    public function jugargimcana2(){
        return view('jugargimcana');
    }

    
















    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Http\Response
     */
    public function show(Mapa $mapa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Http\Response
     */
    public function edit(Mapa $mapa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Mapa $mapa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Mapa  $mapa
     * @return \Illuminate\Http\Response
     */
    public function destroy(Mapa $mapa)
    {
        //
    }
}
