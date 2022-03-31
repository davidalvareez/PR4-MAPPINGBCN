<?php

namespace App\Http\Controllers;

use App\Models\Ubicacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UbicacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function mapa_filtro_todo()
    {
        try {
            DB::beginTransaction();
            $lista_ubicaciones = DB::table('tbl_ubicacion')->select('*')->get();
            $lista_favoritos = DB::table('tbl_favorito')->select('*')->get();
            $lista_comentarios = DB::table('tbl_tags')->select('*')->get();
            DB::commit();
            return array( $lista_ubicaciones, $lista_favoritos, $lista_comentarios );
        } catch (\Exception $error) {
            DB::rollback();
            return $error -> getMessage();
        }
    }
    public function mapa_filtros_favoritos(Request $request)
    {
        $id_usuario=$request['user'];
        $id_ubicaciones_favoritas=DB::table('tbl_favorito')->select('id_ubicacion')->where('id_usuario','=',$id_usuario)->get();
        $array_ids=array();
        for ($i=0; $i < $id_ubicaciones_favoritas->count(); $i++) { 
            array_push($array_ids, $id_ubicaciones_favoritas[$i]->id_ubicacion);
        }
        //$lista_ubicaciones_favoritas = DB::table('tbl_ubicacion')->select('*')->where('id_ubicacion','=',$id_ubicaciones_favoritas[0]->id_ubicacion)->get();
        $lista_ubicaciones_favoritas = DB::table('tbl_ubicacion')->select('*')->whereIn('id_ubicacion', $array_ids)->get();
        return $lista_ubicaciones_favoritas;
    }

    public function mostrar_tags_ubicaciones(){
        $lista_tags=DB::table('tbl_tipo')->get();
        return $lista_tags;
    }

    public function mapa_filtro_tag($tipo){
        try {
            DB::beginTransaction();
            $id_tipo = DB::table('tbl_tipo')->select('id_tipo')->where('nombre_tipo','=',$tipo)->first();
            //return $id_tipo;
            $lista_ubicaciones_tag = DB::table('tbl_ubicacion')->select('*')->where('id_tipo','=',$id_tipo->id_tipo)->get();
            DB::commit();
            return $lista_ubicaciones_tag;
        } catch (\Exception $error) {
            DB::rollback();
            return $error -> getMessage();
        }
    }
    public function anadir_favoritos(Request $request){
        $datos = $request->except('_token');
        $id_user=$datos['id_user'];
        $id_ubicacion=$datos['id_ubicacion'];
        try {
            DB::beginTransaction();

                DB::table('tbl_favorito')->insert([
                    'id_usuario' => $id_user,
                    'id_ubicacion' => $id_ubicacion
                ]);
            //return $id_tipo;
            DB::commit();
            $resultado = array("Resultado"=>"OK");
            echo json_encode($resultado);
            
        } catch (\Exception $error) {
            DB::rollback();
            $resultado = array("Resultado"=>"NOK");
            echo json_encode($error);
        }
    }
    public function quitar_favoritos(Request $request){
        $datos = $request->except('_token');
        $id_user=$datos['id_user'];
        $id_ubicacion=$datos['id_ubicacion'];
        try {
            DB::beginTransaction();

            DB::table('tbl_favorito')->where('id_ubicacion','=',$id_ubicacion)->where('id_usuario','=',$id_user)->delete();
            //return $id_tipo;
            DB::commit();
            $resultado = array("Resultado"=>"OK");
            echo json_encode($resultado);
            
        } catch (\Exception $error) {
            DB::rollback();
            $resultado = array("Resultado"=>"NOK");
            echo json_encode($resultado);
            //return $error -> getMessage();
        }
    }
    public function insertar_tag(Request $request){
        $datos = $request->except('_token');
        $id_user=$datos['user'];
        $id_ubicacion=$datos['ubicacion'];
        $tag=$datos['tag'];

        try {
            DB::beginTransaction();

                DB::table('tbl_tags')->insert([
                    'id_usuario' => $id_user,
                    'id_ubicacion' => $id_ubicacion,
                    'nombre_tags' => $tag
                ]);
            //return $id_tipo;
            DB::commit();
            $resultado = array("Resultado"=>"OK");
            echo json_encode($resultado);
            
        } catch (\Exception $error) {
            DB::rollback();
            return $error -> getMessage();
        }
    }

    public function eliminar_tag(Request $request){
        $datos = $request->except('_token');
        $id_user=$datos['user'];
        $id_ubicacion=$datos['ubicacion'];
        $tag=$datos['tag'];

        try {
            DB::beginTransaction();

            DB::table('tbl_tags')->where('id_tags','=',$tag)->delete();
            //return $id_tipo;
            DB::commit();
            $resultado = array("Resultado"=>"OK");
            echo json_encode($resultado);
            
        } catch (\Exception $error) {
            DB::rollback();
            $resultado = array("Resultado"=>"NOK");
            echo json_encode($resultado);
            //return $error -> getMessage();
        }
    }

}
