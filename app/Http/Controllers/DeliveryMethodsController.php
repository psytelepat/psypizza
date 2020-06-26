<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

use \App\Psypizza\DeliveryMethod;
use \App\Http\Requests\DeliveryMethodRequest;
use \App\Http\Resources\DeliveryMethod as ModelResource;
use \App\Http\Resources\DeliveryMethodCollection as ModelCollection;

class DeliveryMethodsController extends Controller
{
    public function index(Request $request) : object
    {
        return new ModelCollection(DeliveryMethod::all());
    }

    public function show(Request $request, int $id) : object
    {
        return new ModelResource(DeliveryMethod::findOrFail($id));
    }

    public function store(DeliveryMethodRequest $request) : object
    {
        return DeliveryMethod::create($request->validated());
    }

    public function update(DeliveryMethodRequest $request, int $id) : object
    {
        $model = DeliveryMethod::findOrFail($id);
        $model->update($request->validated());
        return $model;
    }

    public function destroy(Request $request, int $id) : object
    {
        $model = DeliveryMethod::findOrFail($id);
        if ($model->delete()) {
            return $model;
        } else {
            return new HttpResponseException($model, 500);
        }
    }
}
