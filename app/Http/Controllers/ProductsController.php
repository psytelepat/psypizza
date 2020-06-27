<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

use \App\Psypizza\Product;
use \App\Http\Requests\ProductRequest;
use \App\Http\Resources\Product as ModelResource;
use \App\Http\Resources\ProductCollection as ModelCollection;

class ProductsController extends Controller
{
    public function index(Request $request) : object
    {
        $query = Product::select();

        $validatedData = $request->validate([
            'category_id' => 'integer|exists:product_categories,id',
            'search' => 'string',
            'page' => 'integer',
            'per_page' => 'integer',
        ]);

        if ($search = Arr::get($validatedData, 'search', null)) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%');
                $query->orWhere('name', 'like', '%'.$search.'%');
            });
        }

        if ($category_id = Arr::get($validatedData, 'category_id', null)) {
            $query->whereHas('category', function ($query) use ($category_id) {
                $query->where('id', $category_id);
            });
        }

        if ($page = Arr::get($validatedData, 'page')) {
            $collection = $query->paginate(Arr::get($validatedData, 'per_page', 15));
        } else {
            $collection = $query->get();
        }

        return new ModelCollection($collection);
    }

    public function show(Request $request, int $id) : object
    {
        return new ModelResource(Product::findOrFail($id));
    }

    public function store(ProductRequest $request) : object
    {
        return Product::create($request->validated());
    }

    public function update(ProductRequest $request, int $id) : object
    {
        $model = Product::findOrFail($id);
        $model->update($request->validated());
        return $model;
    }

    public function destroy(Request $request, int $id) : object
    {
        $model = Product::findOrFail($id);
        if ($model->delete()) {
            return $model;
        } else {
            return new HttpResponseException($model, 500);
        }
    }
}