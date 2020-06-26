<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PromocodeRequest extends FormRequest
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
                    'name' => 'required|string|unique:products,name',
                    'code' => 'required|string|unique:products,code',
                    'description' => 'string',
                    'discount' => 'required|integer',
                ];
            case 'PUT':
                return [
                    'name' => [
                        Rule::unique('promocodes')->ignore($this->name, 'name'),
                    ],
                    'code' => [
                        Rule::unique('promocodes')->ignore($this->slug, 'code'),
                    ],
                    'description' => 'string',
                    'discount' => 'integer',
                ];
        }
    }
}
