<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

use \App\Psypizza\ProductCategory;
use \App\Http\Requests\ProductCategoryRequest;
use \App\Http\Resources\ProductCategory as ModelResource;
use \App\Http\Resources\ProductCategoryCollection as ModelCollection;

class ProductCategoriesController extends Controller
{
    public function index(Request $request) : object
    {
        return new ModelCollection(ProductCategory::all());
    }

    public function show(Request $request, int $id) : object
    {
        return new ModelResource(ProductCategory::findOrFail($id));
    }

    public function store(ProductCategoryRequest $request) : object
    {
        $model = ProductCategory::create($request->validated());

        if ($image = $request->file('upload_image')) {
            $model->handleImageUpload($image);
        }

        return new ModelResource($model);
    }

    public function update(ProductCategoryRequest $request, int $id) : object
    {
        $model = ProductCategory::findOrFail($id);
        $model->update($request->validated());

        if ($image = $request->file('upload_image')) {
            $model->handleImageUpload($image);
        }

        return new ModelResource($model);
    }

    public function destroy(Request $request, int $id) : object
    {
        $model = ProductCategory::findOrFail($id);
        if ($model->delete()) {
            return new ModelResource($model);
        } else {
            return new HttpResponseException($model, 500);
        }
    }
}
