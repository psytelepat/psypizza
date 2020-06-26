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
            'original_cost' => $this->original_cost,
            'discount' => $this->discount,
            'cost' => $this->cost,
            'products' => $this->products,
        ];
    }
}
