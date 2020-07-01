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
        switch ($this->getMethod()) {
            case 'GET':
                return true;
                break;
            default:
                return auth('api')->check() && auth('api')->user()->is_admin;
                break;
        }
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
                    'sku' => '',
                    'ean13' => '',
                    'upload_image' => 'file|image',
                    'name' => 'required|string|unique:products,name',
                    'description' => '',
                    'price' => 'required|numeric',
                    'in_stock' => 'integer',
                    'is_published' => 'integer',
                ];
            case 'PUT':
                return [
                    'category_id' => 'integer|exists:product_categories,id',
                    'slug' => [
                        'string',
                        Rule::unique('products', 'slug')->ignore($this->id),
                    ],
                    'sku' => '',
                    'ean13' => '',
                    'name' => [
                        'string',
                        Rule::unique('products', 'name')->ignore($this->id),
                    ],
                    'upload_image' => 'file|image',
                    'description' => '',
                    'price' => 'numeric',
                    'in_stock' => 'integer',
                    'is_published' => 'integer',
                ];
            default:
                return [];
        }
    }
}
