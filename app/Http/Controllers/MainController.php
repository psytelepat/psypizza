<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use \App\Psypizza\Cart;
use \App\Psypizza\Order;
use \App\Psypizza\Product;
use \App\Psypizza\ProductCategory;
use \App\User;

class MainController extends Controller
{
    public function start(Request $request)
    {
        $start = [
            'user' => auth()->check() ? auth()->user() : false,
            'categories' => new \App\Http\Resources\ProductCategoryCollection(\App\Psypizza\ProductCategory::all()),
            'delivery_methods' => new \App\Http\Resources\DeliveryMethodCollection(\App\Psypizza\DeliveryMethod::all()),
            'cart' => new \App\Http\Resources\Cart(\App\Psypizza\Cart::instance()),
        ];

        return response()->json($start, 200);
    }

    public function index(Request $request)
    {
        return view('index');
    }

    public function orders(Request $request)
    {
        if (!auth()->check()) {
            abort('403', 'Access denied');
        }

        if ($request->ajax() || $request->header('Content-Type') == 'application/json') {
            $models = Order::orderBy('created_at', 'desc')->where('user_id', auth()->user()->id)->get();
            return response()->json(new \App\Http\Resources\OrderCollection($models), 200);
        } else {
            return view('index');
        }
    }

    public function order(Request $request, int $id, string $order_token = null)
    {
        $model = \App\Psypizza\Order::findOrFail($id);
        if ((!auth()->check() || (auth()->user()->id != $model->user_id) ) && ( $model->token != $order_token )) {
            abort('403', 'Access denied');
        }

        if ($request->ajax() || $request->header('Content-Type') == 'application/json') {
            return response()->json(new \App\Http\Resources\Order($model), 200);
        } else {
            return view('index');
        }
    }
}
