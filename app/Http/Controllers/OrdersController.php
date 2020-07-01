<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

use \App\Psypizza\Order;
use \App\Http\Requests\OrderRequest;
use \App\Http\Resources\Order as ModelResource;
use \App\Http\Resources\OrderCollection as ModelCollection;

class OrdersController extends Controller
{
    public function index(OrderRequest $request) : object
    {
        if (!auth('api')->check()) {
            abort('403', 'Access denied');
        }

        if (auth('api')->user()->is_admin) {
            $models = Order::orderBy('created_at', 'desc')->get();
        } else {
            $models = Order::orderBy('created_at', 'desc')->where('user_id', auth('api')->user()->id)->get();
        }

        return new ModelCollection($models);
    }

    public function show(OrderRequest $request, int $id) : object
    {
        $model = Order::findOrFail($id);
        if (!auth('api')->check()) {
            if ($request->input('order_token') != $model->token) {
                abort('403', 'Access denied');
            }
        } elseif (!auth('api')->user()->is_admin && $model->user_id != auth('api')->user()->id) {
            abort('403', 'Access denied');
        }

        return new ModelResource($model);
    }

    public function update(OrderRequest $request, int $id) : object
    {
        $model = Order::findOrFail($id);
        if (!auth()->user()->is_admin && $model->user_id != auth()->user()->id) {
            abort('403', 'Access denied');
        }

        $model->update($request->validated());

        return new ModelResource($model);
    }

    public function destroy(OrderRequest $request, int $id) : object
    {
        $model = Order::findOrFail($id);
        if (!auth('api')->user()->is_admin && $model->user_id != auth('api')->user()->id) {
            abort('403', 'Access denied');
        }

        if ($model->delete()) {
            return new ModelResource($model);
        } else {
            return new HttpResponseException($model, 500);
        }
    }
}

// fsK9PLKsb1QHH2KlTjR0IdLhuEwyxpKzfkYCDwcWPLq55AFCwyvTXWZAnqs3
