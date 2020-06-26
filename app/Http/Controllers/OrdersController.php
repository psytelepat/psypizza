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
    public function index(Request $request) : object
    {
        return new ModelCollection(Order::all());
    }

    public function show(Request $request, int $id) : object
    {
        return new ModelResource(Order::findOrFail($id));
    }

    public function update(OrderRequest $request, int $id) : object
    {
        $model = Order::findOrFail($id);
        $model->update($request->validated());
        return $model;
    }

    public function destroy(Request $request, int $id) : object
    {
        $model = Order::findOrFail($id);
        if ($model->delete()) {
            return $model;
        } else {
            return new HttpResponseException($model, 500);
        }
    }
}
