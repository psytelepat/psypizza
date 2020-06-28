<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Cart extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'user_id' => $this->user_id,
            
            'promocode_id' => $this->promocode_id,
            'promocode' => $this->promocode,
            
            'delivery_method_id' => $this->delivery_method_id,
            'delivery_method' => $this->delivery_method,

            'original_products_cost' => number_format($this->original_products_cost, 2, ",", " "),
            'products_discount' => number_format($this->products_discount, 2, ",", " "),
            'products_cost' => number_format($this->products_cost, 2, ",", " "),

            'original_cost' => number_format($this->original_cost, 2, ",", " "),
            'discount' => number_format($this->discount, 2, ",", " "),
            'cost' => number_format($this->cost, 2, ",", " "),
            
            'products' => $this->products,
        ];
    }
}
