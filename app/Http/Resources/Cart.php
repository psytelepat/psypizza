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
            'original_cost' => number_format($this->original_cost, 2, ",", " "),
            'discount' => number_format($this->discount, 2, ",", " "),
            'cost' => number_format($this->cost, 2, ",", " "),
            'products' => $this->products,
        ];
    }
}
