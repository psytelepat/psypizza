<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
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
        switch ($request->getMethod()) {
            case 'POST':
                return [
                    'user_id' => 'exists:user,id',
                    'email' => 'required|email',
                    'phone' => 'required|phone',
                    'address' => 'required|string',
                    'promocode_id' => 'exists:promocodes,id',
                    'original_cost' => 'numeric',
                    'discount' => 'numeric',
                    'cost' => 'numeric',
                ];
                break;
            case 'PUT':
                return [
                    'user_id' => 'exists:user,id',
                    'email' => 'required|email',
                    'phone' => 'required|phone',
                    'address' => 'required|string',
                    'promocode_id' => 'exists:promocodes,id',
                    'original_cost' => 'numeric',
                    'discount' => 'numeric',
                    'cost' => 'numeric',
                ];
        }
    }
}
