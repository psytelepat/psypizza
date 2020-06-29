<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use \App\Http\Resources\CartProductCollection;
use \App\Http\Resources\Promocode;
use \App\Http\Resources\DeliveryMethod;

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

            'currency' => $this->currency,
            'exchange_rate' => $this->exchange_rate,
            
            'promocode_id' => $this->promocode_id,
            'promocode' => new Promocode($this->promocode),
            
            'delivery_method_id' => $this->delivery_method_id,
            'delivery_price' => $this->delivery_price,
            'delivery_method' => new DeliveryMethod($this->deliveryMethod),

            'original_products_cost' => $this->original_products_cost,
            'products_discount' => $this->products_discount,
            'products_cost' => $this->products_cost,

            'original_cost' => $this->original_cost,
            'discount' => $this->discount,
            'cost' => $this->cost,
            
            'products' => new CartProductCollection($this->products),
        ];
    }
}
