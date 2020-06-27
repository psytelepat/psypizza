<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

use \App\Psypizza\Cart;
use \App\Psypizza\Promocode;

use \App\Http\Resources\Cart as CartResource;

class CartController extends Controller
{
    public function index()
    {
        return new CartResource(Cart::instance());
    }
    
    public function recalc()
    {
        return new CartResource(Cart::recalc());
    }

    public function setProduct(Request $request): object
    {
        $validatedData = $request->validate([
            'id' => 'required|integer|exists:products,id',
            'amount' => 'required|integer',
        ]);

        return new CartResource(Cart::setProduct(Arr::get($validatedData, 'id'), Arr::get($validatedData, 'amount')));
    }

    public function removeProduct(Request $request): object
    {
        $validatedData = $request->validate([
            'id' => 'required|integer|exists:products,id',
        ]);

        return new CartResource(Cart::removeProduct(Arr::get($validatedData, 'id')));
    }

    public function setPromocode(Request $request): object
    {
        $validatedData = $request->validate([
            'code' => 'required|string|exists:promocodes,code',
        ]);

        $promocode = Promocode::where('code', Arr::get($validatedData, 'code'))->where('is_available', true)->firstOrFail();
        return new CartResource(Cart::setPromocode($promocode));
    }

    public function flush(): object
    {
        return new CartResource(Cart::instance(true));
    }
}