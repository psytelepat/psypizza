<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductCategoryRequest extends FormRequest
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
    public function rules(): array
    {
        switch ($this->getMethod()) {
            case 'POST':
                return [
                    'slug' => 'required|string|unique:product_categories,slug',
                    'name' => 'required|string|unique:product_categories,name',
                    'description' => '',
                    'is_published' => '',
                ];
            case 'PUT':
                return [
                    'slug' => [
                        Rule::unique('product_categories', 'slug')->ignore($this->id),
                    ],
                    'name' => [
                        Rule::unique('product_categories', 'name')->ignore($this->id),
                    ],
                    'description' => '',
                    'is_published' => '',
                ];
            default:
                return [];
        }
    }
}
