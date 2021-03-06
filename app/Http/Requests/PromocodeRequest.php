<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PromocodeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth('api')->check() && auth('api')->user()->is_admin;
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
                    'name' => 'required|string|unique:promocodes,name',
                    'code' => 'required|string|unique:promocodes,code',
                    'description' => '',
                    'discount' => 'required|integer',
                ];
            case 'PUT':
                return [
                    'name' => [
                        Rule::unique('promocodes', 'name')->ignore($this->id),
                    ],
                    'code' => [
                        Rule::unique('promocodes', 'code')->ignore($this->id),
                    ],
                    'description' => '',
                    'discount' => 'integer',
                ];
            default:
                return [];
        }
    }
}
