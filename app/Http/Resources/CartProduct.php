<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartProduct extends JsonResource
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
            'product_id' => $this->product->id,
            'name' => $this->product->name,
            'image'  => $this->product->image,
            'amount' => $this->amount,
            'original_price' => $this->original_price,
            'original_cost' => $this->original_cost,
            'discount' => $this->discount,
            'price' => $this->price,
            'cost' => $this->cost,
        ];
    }
}
