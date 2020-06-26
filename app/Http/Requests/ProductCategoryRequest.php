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
                    'description' => 'string',
                    'is_published' => 'boolean',
                ];
            case 'PUT':
                return [
                    'slug' => [
                        Rule::unique('promocodes')->ignore($this->slug, 'slug'),
                    ],
                    'name' => [
                        Rule::unique('promocodes')->ignore($this->name, 'name'),
                    ],
                    'description' => 'string',
                    'is_published' => 'boolean',
                ];
        }
    }
}
