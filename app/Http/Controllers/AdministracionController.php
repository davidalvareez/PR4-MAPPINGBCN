<?php

namespace App\Http\Controllers;

use App\Models\Administracion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\storage;
use Illuminate\Http\Request;

class AdministracionController extends Controller
{
    /*----------------------------------------LOGIN Y LOGOUT------------------------------------------------------------------------*/
    public function loginP(Request $request){
        $request->validate([
            'correo_usuario'=>'required|email',
            'password_usuario'=>'required|string|min:8|max:100'
        ]);
        $error=0;
        $errorpassword=0;
        $datos= $request->except('_token','_method');
        $correo=$datos['correo_usuario'];
        $pass=$datos['password_usuario'];
        $pass=md5($pass);
        DB::beginTransaction();
            $existecorreo = DB::table("tbl_usuario")->where('correo_usuario','=',$correo)->count();
            $passequivocada= DB::select("SELECT * FROM `tbl_usuario` WHERE `correo_usuario` = '$correo' AND `password_usuario` = '$pass'; ");
        DB::commit();
        if($existecorreo == 0){
            return view('login',compact("error"));
        }else if($passequivocada == []){
            return view('login',compact("errorpassword"));
        }

        $user=DB::table("tbl_rol")->join('tbl_usuario', 'tbl_rol.id_rol', '=', 'tbl_usuario.id_rol')->where('correo_usuario','=',$datos['correo_usuario'])->where('password_usuario','=',md5($datos['password_usuario']))->first();
        
        if($user->nombre_rol=='administrador'){
           $request->session()->put('nombre_admin',$request->correo_usuario);
           return redirect('cPanelAdmin');
        }if($user->nombre_rol=='usuario'){
            $request->session()->put('nombre_user',$request->correo_usuario);
            $request->session()->put('id_user',$user->id_usuario);
            return redirect('mapa');
        }
        return redirect('/');
    }
    public function logout(Request $request){
        $request->session()->forget('nombre_admin');
        $request->session()->forget('nombre_user');
        $request->session()->flush();
        return redirect('');
    }
    /*----------------------------------------FIN LOGIN Y LOGOUT------------------------------------------------------------------------*/
    /*-----------------------------------------REGISTRO EQUIPO--------------------------------------------------------------------------*/
    public function registroequipo()
    {
        return view('registroequipo');
    }

    public function registroPostequipo(Request $request){
        $errormismojugador=0;
        $errorjugadoresiguales=0;
        $errorjugador2=0;
        $errorjugador3=0;
        $datos = $request->except('_token');
        $request->validate([
            'nombre_equipo'=>'required|unique:tbl_equipo,nombre_equipo|string|max:50',
            'codigo_equipo'=>'required|string|max:50',
            'correo_usuario1'=>'required|email',
            'correo_usuario2'=>'required|email',
            'correo_usuario3'=>'required|email'
        ]);
        $selectusuario1 = DB::table('tbl_usuario')->select('id_usuario')->where('correo_usuario','=',$datos['correo_usuario1'])->first();
        $selectusuario2 = DB::table('tbl_usuario')->select('id_usuario')->where('correo_usuario','=',$datos['correo_usuario2'])->first();
        $selectusuario3 = DB::table('tbl_usuario')->select('id_usuario')->where('correo_usuario','=',$datos['correo_usuario3'])->first();
        //return $selectusuario3;

        if($selectusuario1==$selectusuario2 || $selectusuario1==$selectusuario3){
            return view('registroequipo',compact("errormismojugador"));
        }else if($selectusuario2==$selectusuario3){
            return view('registroequipo',compact("errorjugadoresiguales"));
        }else if($selectusuario2 = 0){
            return view('registroequipo',compact("errorjugador2"));
        }else if($selectusuario3 = 0){
            return view('registroequipo',compact("errorjugador3"));
        }


        try{
            DB::beginTransaction();
            /*insertar datos en la base de datos*/
            $idequipo=DB::table('tbl_equipo')->insertGetId(["nombre_equipo"=>$datos['nombre_equipo'],"codigo_equipo"=>$datos['codigo_equipo']]);
            $selectusuario1 = DB::table('tbl_usuario')->select('id_usuario')->where('correo_usuario','=',$datos['correo_usuario1'])->first();
            $selectusuario1=$selectusuario1->id_usuario;
            $selectusuario2 = DB::table('tbl_usuario')->select('id_usuario')->where('correo_usuario','=',$datos['correo_usuario2'])->first();
            $selectusuario2=$selectusuario2->id_usuario;
            $selectusuario3 = DB::table('tbl_usuario')->select('id_usuario')->where('correo_usuario','=',$datos['correo_usuario3'])->first();
            $selectusuario3=$selectusuario3->id_usuario;
            DB::table('tbl_usuario_equipo')->insert(["id_equipo"=>$idequipo,"id_usuario"=>$selectusuario1]);
            DB::table('tbl_usuario_equipo')->insert(["id_equipo"=>$idequipo,"id_usuario"=>$selectusuario2]);
            DB::table('tbl_usuario_equipo')->insert(["id_equipo"=>$idequipo,"id_usuario"=>$selectusuario3]);
            DB::commit();
            return redirect('registroequipo');
        }catch(\Exception $e){
            DB::rollBack();
            return $e->getMessage();
        }
    }
    /*-----------------------------------------FIN REGISTRO EQUIPO--------------------------------------------------------------------------*/

    /*-----------------------------------------UNIRSE A EQUIPO--------------------------------------------------------------------------------*/
    public function unirseequipo()
    {
        return view('unirseequipo');
    }

    public function unirsePostequipo(Request $request){
        $datos = $request->except('_token');
        /*validación registro de usuarios*/
        // $request->validate([
        //     'correo_usuario'=>'required|unique:tbl_usuario,correo_usuario|string|max:100',
        //     'password_usuario'=>'required|string|min:8|max:100',
        //     'password_usuario_validar'=>'required|same:password'
        // ]);
        try{
            DB::beginTransaction();
            /*insertar datos en la base de datos*/
            $selectusuario1 = DB::table('tbl_usuario')->select('id_usuario')->where('correo_usuario','=',$datos['correo_usuario1'])->first();
            $selectusuario1=$selectusuario1->id_usuario;
            $selectnombreequipo = DB::table('tbl_equipo')->select('id_equipo')->where('codigo_equipo','=',$datos['codigo_equipo'])->first();
            $selectnombreequipo=$selectnombreequipo->id_equipo;
            DB::table('tbl_usuario_equipo')->insert(["id_equipo"=>$selectnombreequipo,"id_usuario"=>$selectusuario1]);
            DB::commit();
            return redirect('login');
        }catch(\Exception $e){
            DB::rollBack();
            return $e->getMessage();
        }
    }
    /*-----------------------------------------FIN UNIRSE A  EQUIPO---------------------------------------------------------------------------*/
    //---------------------------------------------AJAX DE UBICACION--------------------------------------------------------------------------
    public function leerController(Request $request){
        $datos=DB::select('SELECT * FROM `tbl_ubicacion` INNER JOIN `tbl_tipo` ON tbl_ubicacion.id_tipo = tbl_tipo.id_tipo where nombre_ubicacion like ?',['%'.$request->input('filtro').'%']);
        return response()->json($datos);
    }
    public function crearController(Request $request){
        $datos = $request->except('_token');
        
        try{
            DB::beginTransaction();
            $path=$request->file('foto_ubicacion')->store('uploads','public');
            $selectid = DB::table('tbl_tipo')->select('id_tipo')->where('nombre_tipo','=',$datos['nombre_tipo'])->first();
            $selectid=$selectid->id_tipo;
            // $id = DB::table('tbl_tipo')->insertGetId(["nombre_tipo"=>$datos['nombre_tipo']]);
            DB::table('tbl_ubicacion')->insertGetId(["nombre_ubicacion"=>$datos['nombre_ubicacion'],"descripcion_ubicacion"=>$datos['descripcion_ubicacion'],"direccion_ubicacion"=>$datos['direccion_ubicacion'],"foto_ubicacion"=>$path,"id_tipo"=>$selectid]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK'));            
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
    }
    public function lecturatipoubicacion(){
        $listaTipo = DB::table('tbl_tipo')->select('nombre_tipo')->get();
        // return view('principal', compact('listaTipo'));
        return response()->json($listaTipo);;
    }
    public function modificarController(Request $request){
        $datos=$request->except('_token','_method');
        if ($request->hasFile('foto_ubicacion')) {
            $foto = DB::table('tbl_ubicacion')->select('foto_ubicacion')->where('id_ubicacion','=',$request['id_ubicacion'])->first();
            if ($foto->foto_ubicacion != null) {
                Storage::delete('public/'.$foto->foto_ubicacion);
            }
            $datos['foto_ubicacion'] = $request->file('foto_ubicacion')->store('uploads','public');
        }else{
            $foto = DB::table('tbl_ubicacion')->select('foto_ubicacion')->where('id_ubicacion','=',$request['id_ubicacion'])->first();
            $datos['foto_ubicacion'] = $foto->foto_ubicacion;
        }
        try {
            DB::beginTransaction();
            $path=$request->file('foto_ubicacion')->store('uploads','public');
            DB::update('update tbl_ubicacion set nombre_ubicacion = ?, descripcion_ubicacion = ?, direccion_ubicacion = ?, foto_ubicacion = ? where id_ubicacion = ?', [$request->input('nombre_ubicacion'),$request->input('descripcion_ubicacion'),$request->input('direccion_ubicacion'),$path,$request->input('id_ubicacion')]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK')); 
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        } 
    }   
    public function eliminarController($id){
        try {
            $id = DB::table('tbl_ubicacion')->where('id_ubicacion','=',$id)->delete();
            return response()->json(array('resultado'=> 'OK')); 
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        } 
    }
        //------------------------------------------FIN AJAX DE UBICACION------------------------------------------------------------
        
        //------------------------------------------AJAX USUARIOS----------------------------------------------------------------------
    public function leerControlleruser(Request $request){
        $datos=DB::select('SELECT * FROM `tbl_usuario` INNER JOIN `tbl_rol` ON tbl_usuario.id_rol = tbl_rol.id_rol where nombre_usuario like ?',['%'.$request->input('filtro').'%']);
        return response()->json($datos);
    }
    public function crearControlleruser(Request $request){
        $datos = $request->except('_token');
        
        try{
            DB::beginTransaction();
            $selectid = DB::table('tbl_rol')->select('id_rol')->where('nombre_rol','=',$datos['nombre_rol'])->first();
            $selectid=$selectid->id_rol;
            // $id = DB::table('tbl_tipo')->insertGetId(["nombre_tipo"=>$datos['nombre_tipo']]);
            DB::table('tbl_usuario')->insertGetId(["nombre_usuario"=>$datos['nombre_usuario'],"apellido_usuario"=>$datos['apellido_usuario'],"correo_usuario"=>$datos['correo_usuario'],"password_usuario"=>md5($datos['password_usuario']),"id_rol"=>$selectid]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK'));            
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
    }
    public function lecturatipoubicacionuser(){
        $listaTipo = DB::table('tbl_rol')->select('nombre_rol')->get();
        // return view('principal', compact('listaTipo'));
        return response()->json($listaTipo);;
    }
    public function eliminarControlleruser($id){
        try {
            $id = DB::table('tbl_usuario')->where('id_usuario','=',$id)->delete();
            return response()->json(array('resultado'=> 'OK')); 
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        } 
    }
    public function modificarControlleruser(Request $request){
        try {
            DB::beginTransaction();
            $passwordmd5=md5($request->input('password_usuario'));
            DB::update('update tbl_usuario set nombre_usuario = ?, apellido_usuario = ?, correo_usuario = ?, password_usuario = ? where id_usuario = ?', [$request->input('nombre_usuario'),$request->input('apellido_usuario'),$request->input('correo_usuario'),$passwordmd5,$request->input('id_usuario')]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK')); 
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        } 
    }   
}
