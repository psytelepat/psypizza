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
        return true;
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
                    'slug' => 'required|string|unique:products,slug',
                    'name' => 'required|string|unique:products,name',
                    'description' => '',
                    'is_published' => '',
                ];
            case 'PUT':
                return [
                    'slug' => [
                        Rule::unique('product_categories')->ignore($this->slug, 'slug'),
                    ],
                    'name' => [
                        Rule::unique('product_categories')->ignore($this->name, 'name'),
                    ],
                    'description' => '',
                    'is_published' => '',
                ];
        }
    }
}
