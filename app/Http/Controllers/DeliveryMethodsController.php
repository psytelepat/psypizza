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
    public function index(DeliveryMethodRequest $request) : object
    {
        return new ModelCollection(DeliveryMethod::all());
    }

    public function show(DeliveryMethodRequest $request, int $id) : object
    {
        return new ModelResource(DeliveryMethod::findOrFail($id));
    }

    public function store(DeliveryMethodRequest $request) : object
    {
        $model = DeliveryMethod::create($request->validated());
        return new ModelResource($model);
    }

    public function update(DeliveryMethodRequest $request, int $id) : object
    {
        $model = DeliveryMethod::findOrFail($id);
        $model->update($request->validated());
        return new ModelResource($model);
    }

    public function destroy(DeliveryMethodRequest $request, int $id) : object
    {
        $model = DeliveryMethod::findOrFail($id);
        if ($model->delete()) {
            return new ModelResource($model);
        } else {
            return new HttpResponseException($model, 500);
        }
    }
}
