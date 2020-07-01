<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index(Request $request)
    {
        return view('index');
    }

    public function order(Request $request, int $id, string $order_token = null)
    {
        $model = \App\Psypizza\Order::findOrFail($id);
        if ((!auth()->check() || (auth()->user()->id != $model->user_id) ) && ( $model->token != $order_token )) {
            abort('403');
        }

        return view('index');
    }
}
