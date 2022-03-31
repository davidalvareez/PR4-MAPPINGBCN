<?php

namespace App\Http\Controllers;

use App\Models\Gimcana;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\storage;
use Illuminate\Support\Facades\DB;


class GimcanaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function cogergimcana()
    {
        try {
            DB::beginTransaction();
            //en esta variable recogemos la gimcana y el punto de control
            $recogergimcana=DB::table("tbl_puntocontrol")->join('tbl_gimcana', 'tbl_puntocontrol.id_gimcana', '=', 'tbl_gimcana.id_gimcana')->select('*')->get();
            $recogerpregunta= DB::table('tbl_pregunta')->select('*')->get();
            $recogerubicacion=DB::table("tbl_puntocontrol")->join('tbl_ubicacion', 'tbl_puntocontrol.id_ubicacion', '=', 'tbl_ubicacion.id_ubicacion')->select('nombre_ubicacion', 'descripcion_ubicacion', 'direccion_ubicacion', 'foto_ubicacion')->get();
            
            DB::commit();
            return array( $recogerpregunta, $recogergimcana, $recogerubicacion);
        } catch (\Exception $error) {
            DB::rollback();
            return $error -> getMessage();
        }
    }
    public function recogerpista()
    {
        try {
            DB::beginTransaction();
            //en esta variable recogemos la gimcana y el punto de control
            $respuestacorrecta= DB::table('tbl_pregunta')->select('respuestacorrecta_pregunta', 'question_pregunta')->get();
            
            DB::commit();
            return $respuestacorrecta;
            //return array( $recogerpregunta, $recogergimcana, $recogerubicacion);
        } catch (\Exception $error) {
            DB::rollback();
            return $error -> getMessage();
        }
    }
}
