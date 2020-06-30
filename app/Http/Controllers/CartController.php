<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

use Auth;
use Hash;

use \App\User;
use \App\Psypizza\Cart;
use \App\Psypizza\Promocode;
use \App\Psypizza\DeliveryMethod;
use \App\Psypizza\Currency;

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

    public function currency(Request $request): object
    {
        $validatedData = $request->validate([
            'currency' => 'required|string|in:' . implode(',', Currency::$currencies),
        ]);
        return new CartResource(Cart::setCurrency(Arr::get($validatedData, 'currency')));
    }

    public function promocode(Request $request): object
    {
        if ($request->isMethod('DELETE')) {
            return new CartResource(Cart::removePromocode());
        } else {
            $validatedData = $request->validate([
                'code' => 'required|string|exists:promocodes,code',
            ]);

            $promocode = Promocode::where('code', Arr::get($validatedData, 'code'))->where('is_available', true)->firstOrFail();
            return new CartResource(Cart::setPromocode($promocode));
        }
    }

    public function deliveryMethod(Request $request): object
    {
        $validatedData = $request->validate([
            'id' => 'required|string|exists:delivery_methods,id',
        ]);

        $deliveryMethod = DeliveryMethod::findOrFail(Arr::get($validatedData, 'id'));
        return new CartResource(Cart::setDeliveryMethod($deliveryMethod));
    }

    public function flush(): object
    {
        return new CartResource(Cart::instance(true));
    }

    public function placeOrder(Request $request): object
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'surname' => 'string',
            'email' => 'required|string|email',
            'phone' => ['required', 'string', 'regex:/^(\+|)[0-9\s\-]+$/'],
            'address' => 'required|string',
            'agreement' => 'required',
        ]);

        $user_id = null;
        $email = Arr::get($validatedData, 'email');
        if (Auth::check() && Auth::user()->email == $email) {
            $user_id = Auth::user()->id;
        } elseif (User::where('email', $email)->exists()) {
            return response()->json([
                'message' => 'Invalid e-mail address.',
                'errors' => [
                    'email' => 'User with such email already exists. Please login or use another e-mail address.',
                ],
            ], 422);
        }

        $validatedData['user_id'] = $user_id;

        try {
            $placed_order = Cart::placeOrder($validatedData);
            return response()->json([
                'order_id' => $placed_order->id,
                'message' => 'Order placed',
            ], 201);
        } catch (Eception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }
}
