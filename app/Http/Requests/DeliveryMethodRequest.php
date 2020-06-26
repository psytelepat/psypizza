<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeliveryMethodRequest extends FormRequest
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
                    'name' => 'required|string',
                    'description' => 'string',
                    'price' => 'numeric',
                ];
                break;
            case 'PUT':
                return [
                    'name' => 'string',
                    'description' => 'string',
                    'price' => 'numeric',
                ];
        }
    }
}
