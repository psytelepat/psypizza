<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function start(Request $request)
    {
        return [
            'user' => auth('api')->check() ? auth('api')->user() : false,
            'categories' => new \App\Http\Resources\ProductCategoryCollection(\App\Psypizza\ProductCategory::all()),
            'delivery_methods' => new \App\Http\Resources\DeliveryMethodCollection(\App\Psypizza\DeliveryMethod::all()),
            'cart' => new \App\Http\Resources\Cart(\App\Psypizza\Cart::instance()),
        ];
    }
}
