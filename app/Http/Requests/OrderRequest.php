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
        return auth()->check() && auth()->user()->is_admin;
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
                    'name' => 'required|string',
                    'surname' => 'string',
                    'email' => 'required|email',
                    'phone' => 'required|phone',
                    'address' => 'required|string',
                ];
                break;
            case 'PUT':
                return [
                    'name' => 'string',
                    'surname' => 'string',
                    'email' => 'email',
                    'phone' => 'phone',
                    'address' => 'string',
                ];
            default:
                return [];
        }
    }
}
