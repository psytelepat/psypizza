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
    public function index(ProductCategoryRequest $request) : object
    {
        $query = ProductCategory::select()

        if (!auth('api')->check() || !auth('api')->user()->is_admin) {
            $query->where('is_published', true);
        }

        return new ModelCollection($query->get());
    }

    public function show(ProductCategoryRequest $request, int $id) : object
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

    public function destroy(ProductCategoryRequest $request, int $id) : object
    {
        $model = ProductCategory::findOrFail($id);
        if ($model->delete()) {
            return new ModelResource($model);
        } else {
            return new HttpResponseException($model, 500);
        }
    }
}
