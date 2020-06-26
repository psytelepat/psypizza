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
    public function index(Request $request) : object
    {
        return new ModelCollection(Promocode::all());
    }

    public function show(Request $request, int $id) : object
    {
        return new ModelResource(Promocode::findOrFail($id));
    }

    public function store(PromocodeRequest $request) : object
    {
        return Promocode::create($request->validated());
    }

    public function update(PromocodeRequest $request, int $id) : object
    {
        $model = Promocode::findOrFail($id);
        $model->update($request->validated());
        return $model;
    }

    public function destroy(Request $request, int $id) : object
    {
        $model = Promocode::findOrFail($id);
        if ($model->delete()) {
            return $model;
        } else {
            return new HttpResponseException($model, 500);
        }
    }
}
