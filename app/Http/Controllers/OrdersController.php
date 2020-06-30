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
        if (auth('api')->user()->is_admin) {
            $models = Order::all();
        } else {
            $models = Order::where('user_id', auth('api')->user()->id)->get();
        }

        return new ModelCollection($models);
    }

    public function show(OrderRequest $request, int $id) : object
    {
        $model = Order::findOrFail($id);
        if (!auth()->user()->is_admin && $model->user_id != auth()->user()->id) {
            abort('403');
        }

        return new ModelResource($model);
    }

    public function update(OrderRequest $request, int $id) : object
    {
        $model = Order::findOrFail($id);
        if (!auth()->user()->is_admin && $model->user_id != auth()->user()->id) {
            abort('403');
        }

        $model->update($request->validated());

        return new ModelResource($model);
    }

    public function destroy(OrderRequest $request, int $id) : object
    {
        $model = Order::findOrFail($id);
        if (!auth('api')->user()->is_admin && $model->user_id != auth('api')->user()->id) {
            abort('403');
        }

        if ($model->delete()) {
            return new ModelResource($model);
        } else {
            return new HttpResponseException($model, 500);
        }
    }
}

// fsK9PLKsb1QHH2KlTjR0IdLhuEwyxpKzfkYCDwcWPLq55AFCwyvTXWZAnqs3
