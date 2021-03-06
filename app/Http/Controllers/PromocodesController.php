<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

use \App\Psypizza\Promocode;
use \App\Http\Requests\PromocodeRequest;
use \App\Http\Resources\Promocode as ModelResource;
use \App\Http\Resources\PromocodeCollection as ModelCollection;

class PromocodesController extends Controller
{
    public function index(PromocodeRequest $request) : object
    {
        return new ModelCollection(Promocode::all());
    }

    public function show(PromocodeRequest $request, int $id) : object
    {
        return new ModelResource(Promocode::findOrFail($id));
    }

    public function store(PromocodeRequest $request) : object
    {
        $model = Promocode::create($request->validated());
        return new ModelResource($model);
    }

    public function update(PromocodeRequest $request, int $id) : object
    {
        $model = Promocode::findOrFail($id);
        $model->update($request->validated());
        return new ModelResource($model);
    }

    public function destroy(PromocodeRequest $request, int $id) : object
    {
        $model = Promocode::findOrFail($id);
        if ($model->delete()) {
            return new ModelResource($model);
        } else {
            return new HttpResponseException($model, 500);
        }
    }
}
