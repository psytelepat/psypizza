<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() : array
    {
        switch ($this->getMethod()) {
            case 'POST':
                return [
                    'category_id' => 'required|integer|exists:product_categories,id',
                    'slug' => 'required|string|unique:products,slug',
                    'sku' => 'string',
                    'ean13' => 'integer',
                    'name' => 'required|string|unique:products,name',
                    'description' => 'string',
                    'price' => 'required|numeric',
                    'in_stock' => 'boolean',
                    'is_published' => 'boolean',
                ];
            case 'PUT':
                return [
                    'category_id' => 'integer|exists:product_categories,id',
                    'slug' => [
                        Rule::unique('products')->ignore($this->slug, 'slug'),
                    ],
                    'sku' => 'string',
                    'ean13' => 'integer',
                    'name' => [
                        Rule::unique('products')->ignore($this->name, 'name'),
                    ],
                    'description' => 'string',
                    'price' => 'numeric',
                    'in_stock' => 'boolean',
                    'is_published' => 'boolean',
                ];
        }
    }
}
